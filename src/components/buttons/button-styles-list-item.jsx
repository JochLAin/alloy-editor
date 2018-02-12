import ButtonActionStyle from '../base/button-action-style.js';
import ButtonStyle from '../base/button-style.js';
import React from 'react';

/**
 * The ButtonStylesListItem class provides functionality for previewing a style definition
 * inside a list and applying it to the current editor selection.
 *
 * @class ButtonStylesListItem
 * @uses ButtonActionStyle
 * @uses ButtonStyle
 */
class ButtonStylesListItem extends React.Component {
    /**
     * Lifecycle. Invoked once, both on the client and server, immediately before the initial rendering occurs.
     *
     * @instance
     * @memberof ButtonStylesListItem
     * @method componentWillMount
     */
    componentWillMount() {
        // Styles with wildcard element (*) generate an empty tag in their preview < class="custom-class" />.
        // We default to element span and remove the margins to obtain a more consistent set of previews.
        var styleCfg = {
            element: 'span',
            styles: {
                margin: 0
            }
        };

        styleCfg = CKEDITOR.tools.merge(styleCfg, this.props.style);

        this._preview = new CKEDITOR.style(styleCfg).buildPreview(this.props.name);
    }

    /**
     * Lifecycle. Renders the UI of the button.
     *
     * @instance
     * @memberof ButtonStylesListItem
     * @method render
     * @return {Object} The content which should be rendered.
     */
    render() {
        // We need to use dangerouselySetInnterHTML since we're not in control of the style
        // preview that is generated by CKEditor.
        var className = this.props.name === this.props.activeStyle ? 'ae-toolbar-element active' : 'ae-toolbar-element';

        return (
            <button className={className} dangerouslySetInnerHTML={{__html: this._preview}} onClick={this._onClick.bind(this)} tabIndex={this.props.tabIndex}></button>
        );
    }

    /**
     * Applies the item style to the editor selection.
     *
     * @instance
     * @memberof ButtonStylesListItem
     * @method _onClick
     * @protected
     */
    _onClick() {
        // Typically, we want the style to be the only one applied to the current selection, so
        // we execute the 'removeFormat' command first. Note that block styles won't be cleaned.
        // However, this is consistent with other editors implementations of this feature.
        this.props.editor.get('nativeEditor').execCommand('removeFormat');

        this.applyStyle();
    }
}

/**
 * The name which will be used as an alias of the button in the configuration.
 *
 * @default buttonStylesListItem
 * @memberof ButtonStylesListItem
 * @property {String} key
 * @static
 */
ButtonStylesListItem.key = 'buttonStylesListItem';

export default ButtonActionStyle(
    ButtonStyle(
        ButtonStylesListItem
));