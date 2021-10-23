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
			<ToolbarButton onClick={alignLeft} active={currentAlignment === "LEFT"} iconName="mdiFormatAlignLeft" tooltip={ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.AlignLeft")} />
			<ToolbarButton onClick={alignCenter} active={currentAlignment === "CENTER"} iconName="mdiFormatAlignCenter" tooltip={ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.AlignCenter")} />
			<ToolbarButton onClick={alignRight} active={currentAlignment === "RIGHT"} iconName="mdiFormatAlignRight" tooltip={ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.AlignRight")} />
			<ToolbarButton onClick={alignJustify} active={currentAlignment === "JUSTIFY"} iconName="mdiFormatAlignJustify" tooltip={ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.AlignJustify")} />
		</React.Fragment>
	)
}
