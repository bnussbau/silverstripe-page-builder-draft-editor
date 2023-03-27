import React from "react"
import {ALIGNMENT_DATA_KEY, ExtendedRichUtils as RichUtils} from "../utility/ExtendedRichUtils"
import {ToolbarButtonComponent} from "@zauberfisch/pagebuilder"

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
			<ToolbarButtonComponent onClick={alignLeft} active={currentAlignment === "LEFT"} iconLeft={{iconName:"mdiFormatAlignLeft"}} tooltip={ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.AlignLeft")} />
			<ToolbarButtonComponent onClick={alignCenter} active={currentAlignment === "CENTER"} iconLeft={{iconName:"mdiFormatAlignCenter"}} tooltip={ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.AlignCenter")} />
			<ToolbarButtonComponent onClick={alignRight} active={currentAlignment === "RIGHT"} iconLeft={{iconName:"mdiFormatAlignRight"}} tooltip={ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.AlignRight")} />
			<ToolbarButtonComponent onClick={alignJustify} active={currentAlignment === "JUSTIFY"} iconLeft={{iconName:"mdiFormatAlignJustify"}} tooltip={ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.AlignJustify")} />
		</React.Fragment>
	)
}
