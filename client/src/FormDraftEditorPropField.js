import React from "react"
import {Editor} from "draft-js"
import "draft-js/dist/Draft.css"
import styles from "./DraftEditor.module.scss"
import {ListControls, LinkControls, BlockStyleControls, InlineStyleControls, AlignmentControls} from "./components"
import {useEditorConfig} from "./hooks/useEditorConfig"
import {ToolbarSeparator} from "@zauberfisch/pagebuilder"

export function FormDraftEditorPropField({elementProp, config = {}}) {
	const {
		blockTypes,
		inlineStyles,
		focusEditor,
		editorState,
		setEditorState,
		editorProps,
	} = useEditorConfig({value: elementProp.value, changeHandler: elementProp.changeHandler, config})
	return (
		<div>
			<div style={{display: "flex", flexWrap: "wrap"}}>
				<BlockStyleControls {...{editorState, setEditorState, blockTypes}} />
				<ToolbarSeparator />
				<AlignmentControls {...{editorState, setEditorState}} />
				<ToolbarSeparator />
				<InlineStyleControls {...{editorState, setEditorState, inlineStyles}} />
				<ToolbarSeparator />
				<ListControls {...{editorState, setEditorState}} />
				<ToolbarSeparator />
				<LinkControls {...{editorState, setEditorState}} />
			</div>
			<div onClick={focusEditor} className={styles.editorContainer}>
				<Editor editorState={editorState} onChange={setEditorState} {...editorProps} />
			</div>
		</div>
	)
}
