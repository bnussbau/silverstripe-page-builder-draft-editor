if (typeof (ss) === "undefined" || typeof (ss.i18n) === "undefined") {
	if (typeof (console) !== "undefined") { // eslint-disable-line no-console
		console.error("Class ss.i18n not defined")  // eslint-disable-line no-console
	}
} else {
	ss.i18n.addDictionary("en", {
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.RemoveLink": "Remove Link",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.AddLink": "Add Link",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.AddLinkInternal": "Internal",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.AddLinkExternal": "External",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.AddLinkEmail": "Email",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.AddLinkFile": "File",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.Placeholder": "Content",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.BlockType": "Format",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.AlignLeft": "Align left",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.AlignCenter": "Align center",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.AlignRight": "Align right",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.AlignJustify": "Justify",

		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.Bold": "Bold",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.Italic": "Italic",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.Underline": "Underline",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.Strikethrough": "Strikethrough",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.Paragraph": "Paragraph",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.Heading1": "Heading 1",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.Heading2": "Heading 2",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.Heading3": "Heading 3",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.Heading4": "Heading 4",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.Heading5": "Heading 5",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.Heading6": "Heading 6",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.Blockquote": "Blockquote",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.BulletList": "Bullet list",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.NumberedList": "Numbered list",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.DecreaseIndent": "Decrease Indent",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.IncreaseIndent": "Increase Indent"
	})
}
