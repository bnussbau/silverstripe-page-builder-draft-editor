<?php

declare(strict_types=1);

namespace zauberfisch\PageBuilderDraftEditor\Element;

use zauberfisch\PageBuilder\Element\Element;

class DraftEditor extends Element {
	public function getValueForFrontend(): array {
		$element = $this->array;
		if (isset($element['props']['content']['entityMap'])) {
			foreach ($element['props']['content']['entityMap'] as &$entry) {
				if ($entry['type'] === 'LINK') {
					$entry['data'] = $this->frontendConvertLink($entry['data']);
				}
			}
		}
		return $element;
	}
}
