import {ALIGNMENT_DATA_KEY} from "./ExtendedRichUtils"
import styles from "../DraftEditor.module.scss"

export function blockStyleFn(contentBlock) {
	const textAlignStyle = contentBlock.getData().get(ALIGNMENT_DATA_KEY)
	switch (textAlignStyle) {
		case "LEFT":
			return styles.alignLeft
		case "CENTER":
			return styles.alignCenter
		case "RIGHT":
			return styles.alignRight
		case "JUSTIFY":
			return styles.alignJustify
	}
}
