import React from "react"
import {ALIGNMENT_DATA_KEY, ExtendedRichUtils as RichUtils} from "../ExtendedRichUtils"
import {ToolbarButton} from "@zauberfisch/pagebuilder"

export function AlignmentControls({editorState, setEditorState}) {
	const blockData = editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getData()
	const currentAlignment = blockData && blockData.get(ALIGNMENT_DATA_KEY)
	const align = React.useCallback((e, alignment) => {
		e.preventDefault()
		setEditorState(_editorState => RichUtils.toggleAlignment(
			_editorState,
			alignment,
		))
	}, [])
	const alignLeft = React.useCallback((e) => align(e, "LEFT"), [])
	const alignCenter = React.useCallback((e) => align(e, "CENTER"), [])
	const alignRight = React.useCallback((e) => align(e, "RIGHT"), [])
	const alignJustify = React.useCallback((e) => align(e, "JUSTIFY"), [])
	return (
		<React.Fragment>
			<ToolbarButton onClick={alignLeft} active={currentAlignment === "LEFT"} iconName="mdiFormatAlignLeft" />
			<ToolbarButton onClick={alignCenter} active={currentAlignment === "CENTER"} iconName="mdiFormatAlignCenter" />
			<ToolbarButton onClick={alignRight} active={currentAlignment === "RIGHT"} iconName="mdiFormatAlignRight" />
			<ToolbarButton onClick={alignJustify} active={currentAlignment === "JUSTIFY"} iconName="mdiFormatAlignJustify" />
		</React.Fragment>
	)
}
