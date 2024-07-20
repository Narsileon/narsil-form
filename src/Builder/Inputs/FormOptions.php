<?php

namespace Narsil\Forms\Builder\Inputs;

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
class FormOptions
{
    #region CONSTRUCTOR

    /**
     * @return void
     */
    public function __construct()
    {
        $this->formOptions[self::OPTIONS] = [];

        $this->formOptions[self::LABEL_ACCESSOR] = 'label';
        $this->formOptions[self::VALUE_ACCESSOR] = 'value';
    }

    #endregion

    #region CONSTANTS

    /**
     * @var string
     */
    private const DEFAULT_VALUE = 'default_value';
    /**
     * @var string
     */
    private const LABEL_ACCESSOR = 'label_accessor';
    /**
     * @var string
     */
    private const OPTIONS = 'options';
    /**
     * @var string
     */
    private const VALUE_ACCESSOR = 'value_accessor';

    #endregion

    #region PROPERTIES

    /**
     * @var array<string,mixed>
     */
    protected array $formOptions = [];

    #endregion

    #region PUBLIC METHODS

    /**
     * Gets the form options.
     *
     * @return array<string,mixed>
     */
    final public function get(): array
    {
        return $this->formOptions;
    }

    /**
     * Sets the default value from the options.
     *
     * @param string $defaultValue
     *
     * @return static Returns the current object instance.
     */
    final public function defaultValue(string $defaultValue): static
    {
        $this->formOptions[self::DEFAULT_VALUE] = $defaultValue;

        return $this;
    }

    /**
     * Sets the label accessor from the options.
     *
     * @param string $labelAccessor
     *
     * @return static Returns the current object instance.
     */
    final public function labelAccessor(string $labelAccessor): static
    {
        $this->formOptions[self::LABEL_ACCESSOR] = $labelAccessor;

        return $this;
    }

    /**
     * Sets the options from the options.
     *
     * @param array $options
     *
     * @return static Returns the current object instance.
     */
    final public function options(array $options): static
    {
        $this->formOptions[self::OPTIONS] = $options;

        return $this;
    }

    /**
     * Sets the value accessor from the options.
     *
     * @param string $valueAccessor
     *
     * @return static Returns the current object instance.
     */
    final public function valueAccessor(string $valueAccessor): static
    {
        $this->formOptions[self::VALUE_ACCESSOR] = $valueAccessor;

        return $this;
    }

    #endregion
}
