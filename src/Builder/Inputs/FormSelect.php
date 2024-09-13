<?php

namespace Narsil\Forms\Builder\Inputs;

#region USE

use Illuminate\Support\Arr;
use Narsil\Forms\Builder\Inputs\FormInput;
use Narsil\Forms\Enums\PreviewEnum;
use Narsil\Forms\Models\FormNode;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
class FormSelect extends FormInput
{
    #region CONSTRUCTOR

    /**
     * @param string $identifier
     *
     * @return void
     */
    public function __construct(string $identifier)
    {
        parent::__construct('select', $identifier);
    }

    #endregion

    #region CONSTANTS

    /**
     * @var string
     */
    private const LABEL_KEY = 'label_key';
    /**
     * @var string
     */
    private const FETCH = 'fetch';
    /**
     * @var string
     */
    private const PREVIEW = 'preview';
    /**
     * @var string
     */
    private const VALUE_KEY = 'value_key';

    #endregion

    #region PUBLIC METHODS

    /**
     * Sets the fetch parameter.
     *
     * @param string $fetch
     *
     * @return static Returns the current object instance.
     */
    final public function fetch(string $fetch): static
    {
        Arr::set($this->formNode, FormNode::PARAMETERS . '.' . self::FETCH, $fetch);

        return $this;
    }

    /**
     * Sets the label key parameter.
     *
     * @param string $labelKey
     *
     * @return static Returns the current object instance.
     */
    final public function labelKey(string $labelKey): static
    {
        Arr::set($this->formNode, FormNode::PARAMETERS . '.' . self::LABEL_KEY, $labelKey);

        return $this;
    }

    /**
     * Sets the options attribute.
     *
     * @param array $options
     *
     * @return static Returns the current object instance.
     */
    final public function options(array $options): static
    {
        $this->formNode[FormNode::RELATIONSHIP_OPTIONS] = $options;

        return $this;
    }

    /**
     * Sets the preview parameter.
     *
     * @param PreviewEnum $preview
     *
     * @return static Returns the current object instance.
     */
    final public function preview(PreviewEnum $preview): static
    {
        Arr::set($this->formNode, FormNode::PARAMETERS . '.' . self::PREVIEW, $preview);

        return $this;
    }

    /**
     * Sets the value key parameter.
     *
     * @param string $valueKey
     *
     * @return static Returns the current object instance.
     */
    final public function valueKey(string $valueKey = 'value'): static
    {
        Arr::set($this->formNode, FormNode::PARAMETERS . '.' . self::VALUE_KEY, $valueKey);

        return $this;
    }

    #endregion
}
