import React from "react"
import {getDefaultKeyBinding} from "draft-js"
import {ExtendedRichUtils as RichUtils} from "../ExtendedRichUtils"


export function useEditorCallbacks({setEditorState, refEditor}) {
	return {
		handleKeyCommand: React.useCallback((command, editorState) => {
			const newState = RichUtils.handleKeyCommand(editorState, command)
			if (newState) {
				setEditorState(newState)
				return true
			}
			return false
		}, []),
		keyBindingFn: React.useCallback((e) => {
			if (e.keyCode === 9 /* TAB */) {
				setEditorState(_editorState => RichUtils.onTab(e, _editorState, 4))
				return
			}
			return getDefaultKeyBinding(e)
		}, []),
		focusEditor: React.useCallback(() => refEditor.current.focus(), []),
		handleReturn: React.useCallback((e) => {
			if (e.shiftKey) {
				setEditorState(_editorState => RichUtils.insertSoftNewline(_editorState))
				return "handled"
			}
			return "not-handled"
		}, []),
	}
}

