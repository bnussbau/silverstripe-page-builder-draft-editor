if (typeof (ss) === "undefined" || typeof (ss.i18n) === "undefined") {
	if (typeof (console) !== "undefined") { // eslint-disable-line no-console
		console.error("Class ss.i18n not defined")  // eslint-disable-line no-console
	}
} else {
	ss.i18n.addDictionary("de", {
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.RemoveLink": "Link entfernen",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.AddLink": "Link hinzufügen",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.AddLinkInternal": "Interner Link",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.AddLinkExternal": "Externer Link",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.AddLinkEmail": "E-Mail Link",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.AddLinkFile": "Datei Link",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.Placeholder": "Text",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.BlockType": "Format",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.AlignLeft": "Linksbündig",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.AlignCenter": "Zentriert",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.AlignRight": "Rechtsbündig",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.AlignJustify": "Blocksatz",

		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.Bold": "Fett",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.Italic": "Kursiv",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.Underline": "Unterstrichen",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.Strikethrough": "Durchgestrichen",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.Paragraph": "Absatz",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.Heading1": "Überschrift 1",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.Heading2": "Überschrift 2",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.Heading3": "Überschrift 3",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.Heading4": "Überschrift 4",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.Heading5": "Überschrift 5",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.Heading6": "Überschrift 6",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.Blockquote": "Zitat",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.BulletList": "Unsortierte Liste",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.NumberedList": "Sortierte Liste",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.DecreaseIndent": "Ausrücken",
		"ZAUBERFISCH_PAGEBUILDER_DraftEditor.IncreaseIndent": "Einrücken"
	})
}
