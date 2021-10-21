import React from "react"
import {loadComponent} from "lib/Injector"
import {createInsertLinkModal} from "containers/InsertLinkModal/InsertLinkModal"

const InsertLinkExternalModal = createInsertLinkModal("SilverStripe\\Admin\\LeftAndMain", "EditorExternalLink")
const InsertLinkEmailModal = createInsertLinkModal("SilverStripe\\Admin\\LeftAndMain", "EditorEmailLink")
const InsertLinkInternalModal = createInsertLinkModal("SilverStripe\\CMS\\Controllers\\CMSPageEditController", "editorInternalLink")

import InsertMediaModal from "containers/InsertMediaModal/InsertMediaModal"

const InjectableInsertMediaModal = loadComponent(InsertMediaModal)

export function LinkModalExternal(props) {
	return (
		<InsertLinkExternalModal
			title={i18n._t("Admin.LINK_EXTERNAL", "Insert external link")}
			requireLinkText={false}
			{...props}
		/>
	)
	// bodyClassName="modal__dialog"
	// className="insert-link__dialog-wrapper--external"
	// identifier="Admin.InsertLinkExternalModal"
}

export function LinkModalInternal(props) {
	// Link: hrefParts[0] || '',
	// 	Anchor: hrefParts[1] || '',
	// 	Description: node.attr('title'),
	// 	TargetBlank: !!node.attr('target'),
	return (
		<InsertLinkInternalModal
			title={i18n._t("CMS.LINK_ANCHOR", "Link to an anchor on a page")}
			requireLinkText={false}
			{...props}
		/>
	)
	// bodyClassName="modal__dialog"
	// className="insert-link__dialog-wrapper--internal"
	// identifier="Admin.InsertLinkInternalModal"
}

export function LinkModalEmail(props) {
	// Link: email,
	// 	Subject: subject,
	// 	Description: node.attr('title'),
	return (
		<InsertLinkEmailModal
			title={i18n._t("Admin.LINK_EMAIL", "Insert email link")}
			requireLinkText={false}
			{...props}
		/>
		// bodyClassName="modal__dialog"
		// className="insert-link__dialog-wrapper--email"
		// identifier="Admin.InsertLinkEmailModal"
	)
}

export function LinkModalFile({onInsert, ...props}) {
	// <InsertMediaModal
	// 	title={false}
	// 	isOpen={selecting}
	// 	onInsert={selectingItem ? this.handleReplace : this.handleAddInsert}
	// 	onClosed={this.handleHide}
	// 	onInsertMany={this.handleInsertMany}
	// 	maxFiles={selectingItem ? 1 : maxFiles}
	// 	type="select"
	// 	bodyClassName="modal__dialog"
	// 	className="insert-media-react__dialog-wrapper"
	// 	fileAttributes={selectingItem ? { ID: selectingItem.id } : null}
	// 	folderId={folderId}
	// />
	// 		{/*{...props}*/}
	return (
		<InjectableInsertMediaModal
			{...props}
			type="insert-link"
			onInsert={(e) => {
				console.log({onInsert: e})
				onInsert(e)
				return Promise.resolve()
			}}
			title={false}
			requireLinkText={false}
		/>
	)
	// bodyClassName="modal__dialog"
	// className="insert-link__dialog-wrapper--internal"
}
