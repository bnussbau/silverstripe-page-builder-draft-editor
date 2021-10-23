import React from "react"
import {ExtendedRichUtils as RichUtils} from "../ExtendedRichUtils"
import {ToolbarButton} from "@zauberfisch/pagebuilder"

function InlineStyleControlsButton({styleName, setEditorState, active, color, background, activeColor, activeBackground, ...props}) {
	const onClick = React.useCallback((e) => {
		e.preventDefault()
		setEditorState(_editorState => RichUtils.toggleInlineStyle(
			_editorState,
			styleName,
		))
	}, [styleName])
	return (
		<ToolbarButton {...{...props, onClick, active}} style={{color: active ? activeColor : color, background: active ? activeBackground : background}} />
	)
}

export function InlineStyleControls({editorState, setEditorState, inlineStyles}) {
	const currentStyle = editorState.getCurrentInlineStyle()
	return (
		<React.Fragment>
			{inlineStyles.map((inlineStyle) => (
					<InlineStyleControlsButton active={currentStyle.has(inlineStyle.styleName)} {...{...inlineStyle, editorState, setEditorState}} />
				),
			)}
		</React.Fragment>
	)
}
