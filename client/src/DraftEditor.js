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
const blockRenderMap = DefaultDraftBlockRenderMap.merge(Immutable.Map({
	"unstyled": {
		element: "div",
		aliasedElements: ["p"],
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
	const defaultInlineStyles = React.useMemo(() => [
		{tooltip: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.Bold"), styleName: "BOLD", iconLeft: {iconName: "mdiFormatBold"}},
		{tooltip: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.Italic"), styleName: "ITALIC", iconLeft: {iconName: "mdiFormatItalic"}},
		{tooltip: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.Underline"), styleName: "UNDERLINE", iconLeft: {iconName: "mdiFormatUnderline"}},
		{tooltip: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.Strikethrough"), styleName: "STRIKETHROUGH", iconLeft: {iconName: "mdiFormatStrikethroughVariant"}},
		// {label: "Monospace", style: "CODE", iconName: "iconName"},
	], [])
	const blockTypes = React.useMemo(() => [
		{
			title: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.Paragraph"),
			children: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.Paragraph"),
			// iconName: "mdiText",
			value: "unstyled",
		},
		{
			title: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.Heading1"),
			children: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.Heading1"),
			// iconName: "mdiFormatHeader1",
			value: "header-one",
		},
		{
			title: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.Heading2"),
			children: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.Heading2"),
			// iconName: "mdiFormatHeader2",
			value: "header-two",
		},
		{
			title: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.Heading3"),
			children: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.Heading3"),
			// iconName: "mdiFormatHeader3",
			value: "header-three",
		},
		{
			title: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.Heading4"),
			children: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.Heading4"),
			// iconName: "mdiFormatHeader4",
			value: "header-four",
		},
		{
			title: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.Heading5"),
			children: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.Heading5"),
			// iconName: "mdiFormatHeader5",
			value: "header-five",
		},
		{
			title: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.Heading6"),
			children: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.Heading6"),
			// iconName: "mdiFormatHeader6",
			value: "header-six",
		},
		{
			title: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.Blockquote"),
			children: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.Blockquote"),
			// iconName: "mdiFormatQuoteClose",
			value: "blockquote",
		},
		{
			title: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.BulletList"),
			children: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.BulletList"),
			// iconName: "mdiFormatListBulleted",
			value: "unordered-list-item",
		},
		{
			title: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.NumberedList"),
			children: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.NumberedList"),
			// iconName: "mdiFormatListNumbered",
			value: "ordered-list-item",
		},
		// {iconName: "mdiCodeBraces", title: "Code", value: "code-block"},
	], [])
	const refEditor = React.useRef()
	const [editorState, setEditorState] = useEditorState(content)
	const {handleKeyCommand, keyBindingFn, focusEditor, handleReturn} = useEditorCallbacks({setEditorState, refEditor})
	const specCacheKey = [JSON.stringify(pageBuilderSpecs)]
	const inlineStyles = React.useMemo(() => [...defaultInlineStyles, ...(pageBuilderSpecs.extraInlineStyles || [])], specCacheKey)
	console.log({extraInlineStyles: pageBuilderSpecs.extraInlineStyles, inlineStyles})
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
