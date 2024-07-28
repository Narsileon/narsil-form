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
    private const OPTIONS = 'options';

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

    #endregion
}
