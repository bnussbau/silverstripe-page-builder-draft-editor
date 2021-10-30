import React from "react"
import {ExtendedRichUtils as RichUtils} from "../ExtendedRichUtils"
import {EditorState} from "draft-js"
import {DropdownItem} from "reactstrap"
import {useElementPropLinkTypes, useElementPropLinkInsertCallback, ToolbarButton, ToolbarDropdown} from "@zauberfisch/pagebuilder"

function RemoveLinkButton({editorState, setEditorState, disabled}) {
	const removeLink = (e) => {
		e.preventDefault()
		const selection = editorState.getSelection()
		if (!selection.isCollapsed()) {
			setEditorState(RichUtils.toggleLink(editorState, selection, null))
		}
	}
	return <ToolbarButton iconName="mdiLinkOff" tooltip={ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.RemoveLink")} onClick={removeLink} disabled={disabled} />
}

function AddLinkButton({editorState, setEditorState, disabled, refCurrentLinkData}) {
	const linkTypes = useElementPropLinkTypes()
	const [openModalId, setOpenModalId] = React.useState("")
	// const [previousLinkData, setPreviousLinkData] = React.useState({})
	const onMouseDown = React.useCallback((e) => {
		e.preventDefault()
	}, [])
	// const onClick = (e) => {
	// 	// TODO only allow editing the current type
	// 	// TODO only allow editing of whole link (no partials)
	// 	setPreviousLinkData({...refCurrentLinkData.current})
	// 	setOpenModalId(e.target.dataset.modalid)
	// }
	const onClick = React.useCallback((e) => {
		setOpenModalId(e.target.dataset.modalid)
	}, [])
	const onInsert = useElementPropLinkInsertCallback(linkData => {
		setEditorState(_editorState => {
			const contentState = _editorState.getCurrentContent()
			const contentStateWithEntity = contentState.createEntity(
				"LINK",
				"MUTABLE",
				linkData,
			)
			const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
			const newEditorState = EditorState.set(_editorState, {currentContent: contentStateWithEntity})
			return RichUtils.toggleLink(
				newEditorState,
				newEditorState.getSelection(),
				entityKey,
			)
		})
		setOpenModalId("")
		// TODO focus editor
	}, openModalId, [])
	const onClosed = React.useCallback(() => setOpenModalId(""), [])

	return (
		<React.Fragment>
			<ToolbarDropdown tooltip={ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.AddLink")} iconName="mdiLink" disabled={disabled}>
				{linkTypes.map(({title, id}) => (
					<DropdownItem data-modalid={id} onMouseDown={onMouseDown} onClick={onClick} style={{padding: "0 10px"}}>
						{title}
					</DropdownItem>
				))}
			</ToolbarDropdown>
			{linkTypes.map(({id, component}) => (
				// React.createElement(component, {key: id, fileAttributes: previousLinkData, onInsert, onClosed, isOpen: openModalId === id})
				React.createElement(component, {key: id, fileAttributes: {}, onInsert, onClosed, isOpen: openModalId === id})
			))}
		</React.Fragment>
	)
}

export function LinkControls({editorState, setEditorState}) {
	const selection = editorState.getSelection()
	let canInsertLink = false
	// let canRemoveLink = false
	let canRemoveLink = true
	// const refCurrentLinkData = React.createRef()
	if (!selection.isCollapsed()) {
		canInsertLink = true
		const contentState = editorState.getCurrentContent()
		const startKey = editorState.getSelection().getStartKey()
		const startOffset = editorState.getSelection().getStartOffset()
		const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey)
		const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset)
		if (linkKey) {
			canRemoveLink = true
			// const linkInstance = contentState.getEntity(linkKey)
			// refCurrentLinkData.current = linkInstance.getData()
		} else {
			// refCurrentLinkData.current = {}
		}
	}
	return (
		<React.Fragment>
			<AddLinkButton {...{editorState, setEditorState, disabled: !canInsertLink}} />
			<RemoveLinkButton {...{editorState, setEditorState, disabled: !canRemoveLink}} />
		</React.Fragment>
	)
}
