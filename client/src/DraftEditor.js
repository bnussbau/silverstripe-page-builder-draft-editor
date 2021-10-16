import React from "react"
import {loadComponent} from "lib/Injector"
import {useNode} from "@craftjs/core"
import {DefaultDraftBlockRenderMap, Editor, EditorState, getDefaultKeyBinding, RichUtils} from "draft-js"
import Immutable from "immutable"
import "draft-js/dist/Draft.css"
import styles from "./DraftEditor.module.scss"

// TODO this should be configurable by a silverstripe app
const customStyleMap = {
	MYCUSTOMTEST: {
		color: "red",
	},
}
// TODO this should be configurable by a silverstripe app
const INLINE_STYLES = [
	{tooltip: "Bold", styleName: "BOLD", iconName: "mdiFormatBold"},
	{tooltip: "Italic", styleName: "ITALIC", iconName: "mdiFormatItalic"},
	{tooltip: "Underline", styleName: "UNDERLINE", iconName: "mdiFormatUnderline"},
	{tooltip: "Strikethrough", styleName: "STRIKETHROUGH", iconName: "mdiFormatStrikethroughVariant"},
	{title: "Test", styleName: "MYCUSTOMTEST", color: "red", activeColor: "purple"},
	// {label: "Monospace", style: "CODE", iconName: "iconName"},
]
// TODO this should be configurable by a silverstripe app
const BLOCK_TYPES = [
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
const _blockRenderMap = Immutable.Map({
	"unstyled": {
		element: "p",
		aliasedElements: ["div"],
	},
})
const blockRenderMap = DefaultDraftBlockRenderMap.merge(_blockRenderMap)


const BlockStyleControls = ({editorState, setEditorState}) => {
	const ToolbarSelect = loadComponent("PageBuilder/ToolbarSelect")
	const blockType = editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType()
	const setBlockType = React.useCallback((newBlockType) => {
		if (blockType !== newBlockType) {
			setEditorState(_editorState => RichUtils.toggleBlockType(
				_editorState,
				newBlockType,
			))
		}
	}, [blockType])
	return (
		<ToolbarSelect showSelectedTitle={false} value={blockType} onChange={setBlockType} options={BLOCK_TYPES} />
	)
}

function InlineStyleControlsButton({styleName, setEditorState, active, color, background, activeColor, activeBackground, ...props}) {
	const ToolbarButton = loadComponent("PageBuilder/ToolbarButton")
	const onClick = React.useCallback((e) => {
		e.preventDefault()
		setEditorState(_editorState => RichUtils.toggleInlineStyle(
			_editorState,
			styleName,
		))
	}, [styleName])
	return (
		<ToolbarButton {...{...props, onClick, active}} style={{color: active ? activeColor : color, background: active ? activeBackground : background}} />
	)
}

const InlineStyleControls = ({editorState, setEditorState}) => {
	const currentStyle = editorState.getCurrentInlineStyle()
	return (
		<React.Fragment>
			{INLINE_STYLES.map((inlineStyle) => (
					<InlineStyleControlsButton active={currentStyle.has(inlineStyle.styleName)} {...{...inlineStyle, editorState, setEditorState}} />
				),
			)}
		</React.Fragment>
	)
}

function ListControls({editorState, setEditorState}) {
	const blockType = editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType()
	const ToolbarButton = loadComponent("PageBuilder/ToolbarButton")
	const ToolbarSeparator = loadComponent("PageBuilder/ToolbarSeparator")
	const indent = React.useCallback(() => {
		setEditorState(_editorState => {
			return RichUtils.onTab(
				new KeyboardEvent("keydown", {keyCode: 9, which: 9, shiftKey: false}),
				_editorState,
				4, /* maxDepth */
			)
		})
	}, [])
	const deIndent = React.useCallback(() => {
		setEditorState(_editorState => {
			return RichUtils.onTab(
				new KeyboardEvent("keydown", {keyCode: 9, which: 9, shiftKey: true}),
				_editorState,
				4, /* maxDepth */
			)
		})
	}, [])
	if (["unordered-list-item", "ordered-list-item"].includes(blockType)) {
		return (
			<React.Fragment>
				<ToolbarSeparator />
				<ToolbarButton tooltip={"Decrease Indent"} onClick={deIndent} iconName="mdiFormatIndentDecrease" />
				<ToolbarButton tooltip={"Increase Indent"} onClick={indent} iconName="mdiFormatIndentIncrease" />
			</React.Fragment>
		)
	}
	return null
}

export const DraftEditor = ({...props}) => {
	const ElementContainer = loadComponent("PageBuilder/ElementContainer")
	const ToolbarPortalRow = loadComponent("PageBuilder/ToolbarPortalRow")
	const ToolbarPortalTop = loadComponent("PageBuilder/ToolbarPortalTop")
	const ToolbarSeparator = loadComponent("PageBuilder/ToolbarSeparator")
	const ToolbarButton = loadComponent("PageBuilder/ToolbarButton")
	const {actions: {setProp}} = useNode()
	const refEditor = React.useRef()
	const focusEditor = React.useCallback(() => refEditor.current.focus(), [])
	const [editorState, _setEditorState] = React.useState(
		() => EditorState.createEmpty(),
	)
	const setEditorState = React.useCallback((newState) => {
		_setEditorState((oldState) => {
			if (typeof newState === "function") {
				newState = newState(oldState)
			}
			setProp((_props) => {
				// eslint-disable-next-line no-param-reassign
				_props.content = JSON.parse(JSON.stringify(newState))
			}, 500)
			return newState
		})

	}, [])

	const handleKeyCommand = React.useCallback((command, editorState) => {
		const newState = RichUtils.handleKeyCommand(editorState, command)
		if (newState) {
			setEditorState(newState)
			return true
		}
		return false
	}, [])
	const keyBindingFn = React.useCallback((e) => {
		if (e.keyCode === 9 /* TAB */) {
			setEditorState(_editorState => RichUtils.onTab(
				e,
				_editorState,
				4, /* maxDepth */
			))
			return
		}
		return getDefaultKeyBinding(e)
	}, [])

	return (
		<ElementContainer>
			<ToolbarPortalTop>
				<BlockStyleControls {...{editorState, setEditorState}} />
				<ToolbarSeparator />
				<InlineStyleControls {...{editorState, setEditorState}} />
				<ListControls {...{editorState, setEditorState}} />
			</ToolbarPortalTop>
			{/*<ToolbarPortalRow></ToolbarPortalRow>*/}
			<div onClick={focusEditor} className={styles.editorContainer}>
				<Editor
					{...{
						// blockStyleFn,
						editorState,
						customStyleMap,
						blockRenderMap,
						onChange: setEditorState,
						placeholder: "",
						ref: refEditor,
						spellCheck: true,
						handleKeyCommand,
						keyBindingFn,
					}}
				/>
			</div>
		</ElementContainer>
	)
}

const defaultProps = {
}

DraftEditor.getTypeDisplayName = () => ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_ELEMENT.DraftEditor")

function CreateButton(props) {
	const CreateElementButton = loadComponent("PageBuilder/CreateElementButton")
	return <CreateElementButton {...props} element={<DraftEditor />} iconName="mdiCardTextOutline" />
}

DraftEditor.craft = {
	props: defaultProps,
	related: {
		CreateButton,
	},
}














