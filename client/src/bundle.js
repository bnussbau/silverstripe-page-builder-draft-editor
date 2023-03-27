/* global window */
import "legacy/entwine"
import Injector from "lib/Injector"
import DraftEditorField from "./DraftEditorField"
import {DraftEditor} from "./DraftEditor"

window.document.addEventListener("DOMContentLoaded", () => {
	Injector.component.registerMany({
		DraftEditorField,
		"zauberfisch\\PageBuilderDraftEditor\\Element\\DraftEditor": DraftEditor,
	})
})

require("expose-loader?Zauberfisch_DraftEditor!export-components.js")
