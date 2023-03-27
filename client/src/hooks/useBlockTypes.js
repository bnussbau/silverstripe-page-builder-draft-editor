import React from "react"

export function useBlockTypes() {
	return React.useMemo(() => [
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
}
