import React from "react"

export function useCustomStyleMap(extraCustomStyleMap, deps) {
	return React.useMemo(() => ({
			...(extraCustomStyleMap || {})
		}),
		deps
	)
}
