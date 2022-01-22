<?php

declare(strict_types=1);

namespace zauberfisch\PageBuilderDraftEditor\Element;

use zauberfisch\PageBuilder\Element\ElementConfig;

class DraftEditorConfig extends ElementConfig {
	protected string $phpClassName = DraftEditor::class;

	public function __construct(string $elementKeySuffix = "Default") {
		parent::__construct($elementKeySuffix);
		$this->config['extraInlineStyles'] = [];
		$this->config['extraCustomStyleMap'] = [];
	}

	/**
	 * @param string $styleName
	 * @param array $buttonProps (eg: ["iconName" => "mdiFormatBold", "title" => "bold", "tooltip" => "Make it bold", "color": "#f0f"])
	 * @return $this
	 */
	public function addInlineStyleButton(string $styleName, array $buttonProps = []): DraftEditorConfig {
		$this->config['extraInlineStyles'][] = array_merge(
			$buttonProps,
			['styleName' => $styleName],
		);
		return $this;
	}

	/**
	 * @param string $styleName
	 * @param array $styles (eg: ['color' => '#f0f'])
	 * @return $this
	 */
	public function addInlineStyle(string $styleName, array $styles): DraftEditorConfig {
		$this->config['extraCustomStyleMap'][$styleName] = $styles;
		return $this;
	}
}
