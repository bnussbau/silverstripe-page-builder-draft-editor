/* global window */
import Injector from "lib/Injector"
// import PageBuilderField from "../components/PageBuilderField"
import {DraftEditor} from "./DraftEditor"

window.document.addEventListener("DOMContentLoaded", () => {
	Injector.component.registerMany({
		"zauberfisch\\PageBuilderDraftEditor\\Element\\DraftEditor": DraftEditor,
	})
})
