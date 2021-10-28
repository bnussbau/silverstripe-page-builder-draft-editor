import React from "react"
import {DefaultDraftBlockRenderMap, Editor} from "draft-js"
import Immutable from "immutable"
import "draft-js/dist/Draft.css"
import styles from "./DraftEditor.module.scss"
import {ListControls, LinkControls, BlockStyleControls, InlineStyleControls, AlignmentControls} from "./components"
import {useEditorCallbacks, useEditorState} from "./hooks"

import {ElementContainer, ToolbarPortalTop, ToolbarSeparator, CreateElementButton} from "@zauberfisch/pagebuilder"
import {ALIGNMENT_DATA_KEY} from "./ExtendedRichUtils"
// const ToolbarPortalRow = loadComponent("PageBuilder/ToolbarPortalRow")
// const ToolbarButton = loadComponent("PageBuilder/ToolbarButton")

// TODO this should be configurable by a silverstripe app
const customStyleMap = {
	COLOR_PINK: {
		color: "deeppink",
	},
}
// TODO this should be configurable by a silverstripe app
const inlineStyles = [
	{tooltip: "Bold", styleName: "BOLD", iconName: "mdiFormatBold"},
	{tooltip: "Italic", styleName: "ITALIC", iconName: "mdiFormatItalic"},
	{tooltip: "Underline", styleName: "UNDERLINE", iconName: "mdiFormatUnderline"},
	{tooltip: "Strikethrough", styleName: "STRIKETHROUGH", iconName: "mdiFormatStrikethroughVariant"},
	{title: "Highlight", styleName: "COLOR_PINK", color: "deeppink"},
	// {label: "Monospace", style: "CODE", iconName: "iconName"},
]
// TODO this should be configurable by a silverstripe app
const blockTypes = [
	{iconName: "mdiText", title: "Paragraph", value: "unstyled"},
	{iconName: "mdiFormatHeader1", title: "Heading 1", value: "header-one"},
	{iconName: "mdiFormatHeader2", title: "Heading 2", value: "header-two"},
	{iconName: "mdiFormatHeader3", title: "Heading 3", value: "header-three"},
	{iconName: "mdiFormatHeader4", title: "Heading 4", value: "header-four"},
	{iconName: "mdiFormatHeader5", title: "Heading 5", value: "header-five"},
	{iconName: "mdiFormatHeader6", title: "Heading 6", value: "header-six"},
	{iconName: "mdiFormatQuoteClose", title: "Blockquote", value: "blockquote"},
	{iconName: "mdiFormatListBulleted", title: "Bullet list", value: "unordered-list-item"},
	{iconName: "mdiFormatListNumbered", title: "Numbered list", value: "ordered-list-item"},
	{iconName: "mdiCodeBraces", title: "Code", value: "code-block"},
]
const blockRenderMap = DefaultDraftBlockRenderMap.merge(Immutable.Map({
	"unstyled": {
		element: "p",
		aliasedElements: ["div"],
	},
}))

function blockStyleFn(contentBlock) {
	const textAlignStyle = contentBlock.getData().get(ALIGNMENT_DATA_KEY)
	switch (textAlignStyle) {
		case "LEFT":
			return styles.alignLeft
		case "CENTER":
			return styles.alignCenter
		case "RIGHT":
			return styles.alignRight
		case "JUSTIFY":
			return styles.alignJustify
	}
}

export const DraftEditor = ({content}) => {
	const refEditor = React.useRef()
	const [editorState, setEditorState] = useEditorState(content)
	const {handleKeyCommand, keyBindingFn, focusEditor, handleReturn} = useEditorCallbacks({setEditorState, refEditor})
	// /admin/methodSchema/Modals/EditorExternalLink
	// /admin/methodSchema/Modals/EditorEmailLink
	// /admin/methodSchema/Modals/editorInternalLink
	return (
		<ElementContainer padding={false}>
			<ToolbarPortalTop>
				<BlockStyleControls {...{editorState, setEditorState, blockTypes}} />
				<ToolbarSeparator />
				<AlignmentControls {...{editorState, setEditorState}} />
				<ToolbarSeparator />
				<InlineStyleControls {...{editorState, setEditorState, inlineStyles}} />
				<ToolbarSeparator />
				<ListControls {...{editorState, setEditorState}} />
				<ToolbarSeparator />
				<LinkControls {...{editorState, setEditorState}} />
				{/*<DebugControls {...{editorState, setEditorState}} />*/}
			</ToolbarPortalTop>
			{/*<ToolbarPortalRow></ToolbarPortalRow>*/}
			<div onClick={focusEditor} className={styles.editorContainer}>
				<Editor
					{...{
						editorState,
						customStyleMap,
						blockRenderMap,
						blockStyleFn,
						onChange: setEditorState,
						placeholder: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.Placeholder"),
						ref: refEditor,
						spellCheck: true,
						handleKeyCommand,
						keyBindingFn,
						handleReturn,
					}}
				/>
			</div>
		</ElementContainer>
	)
}

const defaultProps = {
	content: null,
}

DraftEditor.getTypeDisplayName = () => ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.DraftEditor")

function CreateButton(props) {
	return <CreateElementButton {...props} element={<DraftEditor />} iconName="mdiCardTextOutline" />
}

DraftEditor.craft = {
	props: defaultProps,
	related: {
		CreateButton,
	},
}














