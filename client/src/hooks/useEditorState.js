import React from "react"
import {CompositeDecorator, convertToRaw, convertFromRaw, EditorState} from "draft-js"
import {useNode} from "@craftjs/core"
import styles from "../DraftEditor.module.scss"

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

export function useEditorState(initialContent) {
	const {actions: {setProp}} = useNode()
	const [editorState, _setEditorState] = React.useState(() => {
		if (initialContent) {
			const contentState = convertFromRaw(initialContent)
			return EditorState.createWithContent(contentState, decorator)
		}
		// initialContent
		return EditorState.createEmpty(decorator)
	})
	const setEditorState = React.useCallback((newState) => {
		_setEditorState((oldState) => {
			if (typeof newState === "function") {
				newState = newState(oldState)
			}
			setProp((_props) => {
				// eslint-disable-next-line no-param-reassign
				_props.content = convertToRaw(newState.getCurrentContent())
				// _props.content = JSON.parse(JSON.stringify(newState))
			}, 500)
			return newState
		})
	}, [])
	return [editorState, setEditorState]
}
