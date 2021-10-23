import React from "react"
import {ExtendedRichUtils as RichUtils} from "../ExtendedRichUtils"
import {ToolbarSelect} from "@zauberfisch/pagebuilder"

export function BlockStyleControls({editorState, setEditorState, blockTypes}) {
	const blockType = editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType()
	const setBlockType = React.useCallback((newBlockType) => {
		if (blockType !== newBlockType) {
			setEditorState(_editorState => RichUtils.toggleBlockType(
				_editorState,
				newBlockType,
			))
		}
	}, [blockType])
	return (
		<ToolbarSelect showSelectedTitle={false} value={blockType} onChange={setBlockType} options={blockTypes} tooltip={ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.BlockType")} />
	)
}
