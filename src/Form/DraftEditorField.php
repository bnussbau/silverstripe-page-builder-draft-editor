<?php

declare(strict_types=1);

namespace zauberfisch\DraftEditor\Form;

use SilverStripe\Forms\FormField;

class DraftEditorField extends FormField {
	public function __construct($name, $title) {
		$this->addExtraClass('zauberfisch__draft-editor__field');
		parent::__construct($name, $title);
	}

	public function getSchemaData() {
		$arr = parent::getSchemaData();
		$arr['value'] = $this->dataValue() ?: null;
		return $arr;
	}
}
