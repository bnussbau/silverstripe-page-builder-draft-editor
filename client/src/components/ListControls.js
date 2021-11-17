import React from "react"
import {ExtendedRichUtils as RichUtils} from "../ExtendedRichUtils"
import {ToolbarButton, ToolbarSeparator} from "@zauberfisch/pagebuilder"

export function ListControls({editorState, setEditorState}) {
	const blockType = editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType()
	const indent = React.useCallback(() => {
		setEditorState(_editorState => {
			return RichUtils.onTab(
				new KeyboardEvent("keydown", {keyCode: 9, which: 9, shiftKey: false}),
				_editorState,
				4, /* maxDepth */
			)
		})
	}, [])
	const deIndent = React.useCallback(() => {
		setEditorState(_editorState => {
			return RichUtils.onTab(
				new KeyboardEvent("keydown", {keyCode: 9, which: 9, shiftKey: true}),
				_editorState,
				4, /* maxDepth */
			)
		})
	}, [])
	const disabled = !["unordered-list-item", "ordered-list-item"].includes(blockType)
	return (
		<React.Fragment>
			<ToolbarButton disabled={disabled} tooltip={ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.DecreaseIndent")} onClick={deIndent} iconName="mdiFormatIndentDecrease" />
			<ToolbarButton disabled={disabled} tooltip={ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.IncreaseIndent")} onClick={indent} iconName="mdiFormatIndentIncrease" />
		</React.Fragment>
	)
}
