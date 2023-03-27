import React from "react"
import {CompositeDecorator, convertToRaw, convertFromRaw, EditorState} from "draft-js"
import styles from "../DraftEditor.module.scss"
import {EventBus} from "@zauberfisch/pagebuilder"

export function Link({contentState, entityKey, children}) {
	// const {url} = contentState.getEntity(entityKey).getData()
	// 	<a href={url} className={styles.link}>{children}</a>
	return (
		<span title={JSON.stringify(contentState.getEntity(entityKey).getData())} className={styles.link}>{children}</span>
	)
}

function findLinkEntities(contentBlock, callback, contentState) {
	contentBlock.findEntityRanges(
		(character) => {
			const entityKey = character.getEntity()
			return (
				entityKey !== null &&
				contentState.getEntity(entityKey).getType() === "LINK"
			)
		},
		callback,
	)
}

const decorator = new CompositeDecorator([
	{
		strategy: findLinkEntities,
		component: Link,
	},
])

function createEditorState(initialContent) {
	console.log({initialContent})
	return initialContent ? EditorState.createWithContent(convertFromRaw(initialContent), decorator) : EditorState.createEmpty(decorator)
}

export function useEditorState(value, changeHandler) {
	const [editorState, _setEditorState] = React.useState(() => createEditorState(value))
	const refValue = React.useRef()
	refValue.current = value
	React.useEffect(() => {
		const eventId = EventBus.on("RELOAD_STATE", () => {
			_setEditorState(createEditorState(refValue.current))
		})
		return () => {
			EventBus.off("RELOAD_STATE", eventId)
		}
	}, [])
	const setEditorState = React.useCallback((newState) => {
		_setEditorState((oldState) => {
			if (typeof newState === "function") {
				newState = newState(oldState)
			}
			const oldRaw = convertToRaw(oldState.getCurrentContent())
			const newRaw = convertToRaw(newState.getCurrentContent())
			if (JSON.stringify(oldRaw) !== JSON.stringify(newRaw)) {
				changeHandler(newRaw)
			}
			return newState
		})
	}, [])
	return [editorState, setEditorState]
}
