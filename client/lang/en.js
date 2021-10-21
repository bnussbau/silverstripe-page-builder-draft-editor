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
	})
}
