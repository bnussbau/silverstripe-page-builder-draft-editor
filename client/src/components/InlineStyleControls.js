import React from "react"
import {ExtendedRichUtils as RichUtils} from "../ExtendedRichUtils"
import {ToolbarButtonComponent} from "@zauberfisch/pagebuilder"

function InlineStyleControlsButton({styleName, setEditorState, active, color, background, activeColor, activeBackground, tooltip, iconLeft, iconRight, children, ...props}) {
	const onClick = React.useCallback((e) => {
		e.preventDefault()
		setEditorState(_editorState => RichUtils.toggleInlineStyle(
			_editorState,
			styleName,
		))
	}, [styleName])
	const allProps = {onClick, active, tooltip, iconLeft, iconRight, children}
	allProps.style = {color: active ? activeColor : color, background: active ? activeBackground : background}
	return (
		<ToolbarButtonComponent {...allProps} />
	)
}

export function InlineStyleControls({editorState, setEditorState, inlineStyles}) {
	const currentStyle = editorState.getCurrentInlineStyle()
	return (
		<React.Fragment>
			{inlineStyles.map((inlineStyle, i) => {
					return (
						<InlineStyleControlsButton key={`${inlineStyle.styleName}${i}`} active={currentStyle.has(inlineStyle.styleName)} {...{...inlineStyle, editorState, setEditorState}} />
					)
				},
			)}
		</React.Fragment>
	)
}
