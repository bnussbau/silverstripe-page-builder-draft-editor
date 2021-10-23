if (typeof (ss) === "undefined" || typeof (ss.i18n) === "undefined") {
	if (typeof (console) !== "undefined") { // eslint-disable-line no-console
		console.error("Class ss.i18n not defined")  // eslint-disable-line no-console
	}
} else {
	ss.i18n.addDictionary("en", {
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.DraftEditor": "Draft Editor",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.RemoveLink": "Remove Link",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.AddLink": "Add Link",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.AddLinkInternal": "Internal",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.AddLinkExternal": "External",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.AddLinkEmail": "Email",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.AddLinkFile": "File",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.Placeholder": "Write something ...",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.BlockType": "Format",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.AlignLeft": "Align left",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.AlignCenter": "Align center",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.AlignRight": "Align right",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.AlignJustify": "Justify",
	})
}
