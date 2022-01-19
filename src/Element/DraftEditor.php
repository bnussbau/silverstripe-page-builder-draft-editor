<?php

declare(strict_types=1);

namespace zauberfisch\PageBuilderDraftEditor\Element;

use zauberfisch\PageBuilder\Element\Element;
use zauberfisch\PageBuilder\Form\PageBuilderConfig;

class DraftEditor extends Element {
	public function getValueForFrontend(PageBuilderConfig $config = null): \stdClass {
		$element = parent::getValueForFrontend();
		if (isset($element->props->content->entityMap)) {
			foreach ($element->props->content->entityMap as &$entry) {
				if ($entry->type === 'LINK') {
					$entry->data = $this->frontendConvertLink($entry->data);
				}
			}
		}
		return $element;
	}
}
