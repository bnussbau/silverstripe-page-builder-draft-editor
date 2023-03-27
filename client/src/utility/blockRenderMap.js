import {DefaultDraftBlockRenderMap} from "draft-js"
import Immutable from "immutable"

export const blockRenderMap = DefaultDraftBlockRenderMap.merge(Immutable.Map({
	"unstyled": {
		element: "p",
		aliasedElements: ["div"],
	},
}))

