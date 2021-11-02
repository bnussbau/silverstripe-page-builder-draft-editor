import React from "react"
import {DefaultDraftBlockRenderMap, Editor} from "draft-js"
import Immutable from "immutable"
import "draft-js/dist/Draft.css"
import styles from "./DraftEditor.module.scss"
import {ListControls, LinkControls, BlockStyleControls, InlineStyleControls, AlignmentControls} from "./components"
import {useEditorCallbacks, useEditorState} from "./hooks"

import {ElementContainer, ToolbarPortalTop, ToolbarSeparator} from "@zauberfisch/pagebuilder"
import {ALIGNMENT_DATA_KEY} from "./ExtendedRichUtils"

const defaultCustomStyleMap = {}
const defaultInlineStyles = [
	{tooltip: "Bold", styleName: "BOLD", iconName: "mdiFormatBold"},
	{tooltip: "Italic", styleName: "ITALIC", iconName: "mdiFormatItalic"},
	{tooltip: "Underline", styleName: "UNDERLINE", iconName: "mdiFormatUnderline"},
	{tooltip: "Strikethrough", styleName: "STRIKETHROUGH", iconName: "mdiFormatStrikethroughVariant"},
	// {label: "Monospace", style: "CODE", iconName: "iconName"},
]
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
	// {iconName: "mdiCodeBraces", title: "Code", value: "code-block"},
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

export const DraftEditor = ({content, pageBuilderSpecs}) => {
	const refEditor = React.useRef()
	const [editorState, setEditorState] = useEditorState(content)
	const {handleKeyCommand, keyBindingFn, focusEditor, handleReturn} = useEditorCallbacks({setEditorState, refEditor})
	const specCacheKey = [JSON.stringify(pageBuilderSpecs)]

	const inlineStyles = React.useMemo(() => [...defaultInlineStyles, ...(pageBuilderSpecs.extraInlineStyles || [])], specCacheKey)
	const customStyleMap = React.useMemo(() => ({...defaultCustomStyleMap, ...(pageBuilderSpecs.extraCustomStyleMap || {})}), specCacheKey)
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

DraftEditor.pageBuilderSpecs = {
	defaultProps: {
		content: null,
	},
	iconName: "mdiCardTextOutline",
}
