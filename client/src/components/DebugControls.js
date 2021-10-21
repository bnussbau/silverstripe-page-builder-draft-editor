import React from "react"
import {convertToRaw} from "draft-js"
import {ToolbarButton} from "@zauberfisch/pagebuilder"

export function DebugControls({editorState}) {
	const logState = () => {
		console.log(convertToRaw(editorState.getCurrentContent()))
	}
	return <ToolbarButton title="Log" onClick={logState} />
}
