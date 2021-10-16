import React from "react"
import Injector from "lib/Injector"
import {useNode} from "@craftjs/core"
import {Editor, EditorState, RichUtils} from "draft-js"
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
	{title: "Test", styleName: "MYCUSTOMTEST", color: "red", activeColor: "purple"},
	// {label: "Monospace", style: "CODE", iconName: "iconName"},
]
// TODO this should be configurable by a silverstripe app
const BLOCK_TYPES = [
	{title: "Paragraph", label: "P", value: "unstyled"},
	{title: "Heading 1", label: "H1", value: "header-one"},
	{title: "Heading 2", label: "H2", value: "header-two"},
	{title: "Heading 3", label: "H3", value: "header-three"},
	{title: "Heading 4", label: "H4", value: "header-four"},
	{title: "Heading 5", label: "H5", value: "header-five"},
	{title: "Heading 6", label: "H6", value: "header-six"},
	{title: "Blockquote", label: "Blockquote", value: "blockquote"},
	{title: "Bullet list", label: "UL", value: "unordered-list-item"},
	{title: "Numbered list", label: "OL", value: "ordered-list-item"},
	{title: "Code", label: "Code Block", value: "code-block"},
]

const BlockStyleControls = ({editorState, setEditorState}) => {
	const ToolbarSelect = Injector.component.get("PageBuilder/ToolbarSelect")
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
		<ToolbarSelect value={blockType} onChange={setBlockType} options={BLOCK_TYPES} />
	)
}

function InlineStyleControlsButton({styleName, setEditorState, active, color, background, activeColor, activeBackground, ...props}) {
	const ToolbarButton = Injector.component.get("PageBuilder/ToolbarButton")
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

export const DraftEditor = ({text, fontSize, textAlign, ...props}) => {
	const ElementContainer = Injector.component.get("PageBuilder/ElementContainer")
	const ToolbarPortalRow = Injector.component.get("PageBuilder/ToolbarPortalRow")
	const ToolbarPortalTop = Injector.component.get("PageBuilder/ToolbarPortalTop")
	const ToolbarSeparator = Injector.component.get("PageBuilder/ToolbarSeparator")
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


	// const toggleInlineStyle = (inlineStyle) => {
	// 	setEditorState(_editorState => {
	// 		console.log("a")
	// 		const newState = RichUtils.toggleInlineStyle(
	// 			_editorState,
	// 			inlineStyle,
	// 		)
	// 		console.log({
	// 			_editorState,
	// 			newState,
	// 		})
	// 		return _editorState
	// 	})
	// }

	return (
		<ElementContainer>
			<ToolbarPortalTop>
				<BlockStyleControls {...{editorState, setEditorState}} />
				<ToolbarSeparator />
				<InlineStyleControls {...{editorState, setEditorState}} />
			</ToolbarPortalTop>
			{/*<ToolbarPortalRow>*/}
			{/*	*/}
			{/*</ToolbarPortalRow>*/}
			{/*className="RichEditor-root"*/}
			{/*className={classNames("RichEditor-editor", {"RichEditor-hidePlaceholder": !hasText})}*/}
			<div onClick={focusEditor} className={styles.editorContainer}>
				<Editor
					{...{
						// blockStyleFn,
						editorState,
						customStyleMap,
						onChange: setEditorState,
						placeholder: "",
						ref: refEditor,
						spellCheck: true,
					}}
				/>
			</div>
			<pre>{JSON.stringify(props.content, null, 2)}</pre>

			{/*<ExampleEditor />*/}
			{/*<Editor*/}
			{/*	// editorState={editorState}*/}
			{/*	toolbarClassName="toolbarClassName"*/}
			{/*	wrapperClassName="wrapperClassName"*/}
			{/*	editorClassName="editorClassName"*/}
			{/*	// onEditorStateChange={this.onEditorStateChange}*/}
			{/*/>*/}
		</ElementContainer>
	)
}

const defaultProps = {
	text: "",
	fontSize: 20,
}

DraftEditor.getTypeDisplayName = () => ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_ELEMENT.DraftEditor")

function CreateButton(props) {
	const CreateElementButton = Injector.component.get("PageBuilder/CreateElementButton")
	return <CreateElementButton {...props} element={<DraftEditor />} iconName="mdiCardTextOutline" />
}

DraftEditor.craft = {
	props: defaultProps,
	related: {
		CreateButton,
	},
}














