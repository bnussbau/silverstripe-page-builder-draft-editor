import React from "react"

export function useInlineStyles(extraInlineStyles, deps) {
	return React.useMemo(() => [
		{tooltip: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.Bold"), styleName: "BOLD", iconLeft: {iconName: "mdiFormatBold"}},
		{tooltip: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.Italic"), styleName: "ITALIC", iconLeft: {iconName: "mdiFormatItalic"}},
		{tooltip: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.Underline"), styleName: "UNDERLINE", iconLeft: {iconName: "mdiFormatUnderline"}},
		{tooltip: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_DraftEditor.Strikethrough"), styleName: "STRIKETHROUGH", iconLeft: {iconName: "mdiFormatStrikethroughVariant"}},
		// {label: "Monospace", style: "CODE", iconName: "iconName"},
		...(extraInlineStyles || [])
	], deps)
}
