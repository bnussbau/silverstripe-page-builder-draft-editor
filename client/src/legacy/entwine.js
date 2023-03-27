import jQuery from "jquery"
import React from "react"
import ReactDOM from "react-dom"
import {loadComponent} from "lib/Injector"
import {throttle} from "lodash"

jQuery.entwine("ss", function ($) {
	$(".js-injector-boot .field.zauberfisch__draft-editor__field > .zauberfisch__draft-editor__field").entwine({
		InputElement: null,
		EditorElement: null,
		OnSubmitCallback: null,
		onmatch() {
			const DraftEditorField = loadComponent("DraftEditorField")
			const schemaData = this.data("schema")
			const input = this.find("> input")
			this.setInputElement(input.get(0))
			this.setEditorElement(this.find("> div").get(0))
			const form = this.closest("form")
			const _this = this
			// re-serialize the initial state to ensure it's formatted the same (needed for changed state)
			const initialValue = JSON.stringify(JSON.parse(schemaData.value))
			const setValue = (value) => {
				input.val(value)
				if (initialValue !== value) {
					// Trigger change detection (see jquery.changetracker.js)
					form.trigger("change")
				}
			}
			const setInputValueThrottled = throttle(setValue, 1000)
			const props = {
				value: initialValue,
				setOnSubmitCallback: (callback) => _this.setOnSubmitCallback(callback),
				setValue: (value, shouldThrottle = true) => {
					if (shouldThrottle) {
						setInputValueThrottled(value)
					} else {
						setInputValueThrottled.cancel()
						setValue(value)
					}
				},
			}
			ReactDOM.render(
				<DraftEditorField {...props} />,
				this.getEditorElement(),
			)
		},

		onunmatch() {
			if (this.getEditorElement()) {
				ReactDOM.unmountComponentAtNode(this.getEditorElement())
			}
		},

		"from .cms-edit-form": {
			onbeforesubmitform: function () {
				const callback = this.getOnSubmitCallback()
				if (callback) {
					callback()
				} else {
					console.error(`DraftEditor did not provide a onSubmit callback`)
				}
				this._super()
			},
		},
	})
})
