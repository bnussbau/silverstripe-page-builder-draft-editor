import React from "react"
import {AlignmentControls, BlockStyleControls, InlineStyleControls, LinkControls, ListControls} from "./components"
import styles from "./DraftEditor.module.scss"
import {convertToRaw, Editor} from "draft-js"
import {useEditorConfig} from "./hooks/useEditorConfig"
import {ToolbarSeparator} from "@zauberfisch/pagebuilder"

function DraftEditorField({value: _value, setOnSubmitCallback, setValue: _setValue}) {
	const config = {} // TODO
	const value = React.useMemo(() => {
		return JSON.parse(_value)
	}, [_value])
	const changeHandler = React.useCallback((newValue) => {
		_setValue(JSON.stringify(newValue))
	}, [_setValue])
	const {
		blockTypes,
		inlineStyles,
		focusEditor,
		editorState,
		setEditorState,
		editorProps,
	} = useEditorConfig({value, changeHandler, config})
	const refCurrentEditorState = React.useRef()
	refCurrentEditorState.current = editorState
	React.useEffect(() => {
		setOnSubmitCallback(() => _setValue(JSON.stringify(convertToRaw(refCurrentEditorState.current.getCurrentContent())), false))
	}, [])
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

export {DraftEditorField as Component}
export default DraftEditorField
// export default fieldHolder(PageBuilderField)
