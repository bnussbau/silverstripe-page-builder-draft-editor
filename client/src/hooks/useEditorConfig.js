import React from "react"
import {useBlockTypes} from "./useBlockTypes"
import {useEditorState} from "./useEditorState"
import {useInlineStyles} from "./useInlineStyles"
import {useCustomStyleMap} from "./useCustomStyleMap"
import {useEditorCallbacks} from "./useEditorCallbacks"
import {blockRenderMap, blockStyleFn} from "../utility"

export function useEditorConfig({value, changeHandler, config}) {
	const refEditor = React.useRef()
	const [editorState, setEditorState] = useEditorState(value, changeHandler)
	const {handleKeyCommand, keyBindingFn, focusEditor, handleReturn} = useEditorCallbacks({setEditorState, refEditor})
	return {
		blockTypes: useBlockTypes(),
		inlineStyles: useInlineStyles(config.extraInlineStyles, [JSON.stringify(config.extraInlineStyles)]),
		focusEditor,
		editorState,
		setEditorState,
		editorProps: {
			// editorState,
			// onChange: setEditorState,
			customStyleMap: useCustomStyleMap(config.extraCustomStyleMap, [JSON.stringify(config.extraCustomStyleMap)]),
			blockRenderMap,
			blockStyleFn,
			placeholder: config.placeholder || ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.Placeholder"),
			ref: refEditor,
			handleKeyCommand,
			keyBindingFn,
			handleReturn,
			spellCheck: true,
		},
	}
}
