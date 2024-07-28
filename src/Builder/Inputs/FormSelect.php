<?php

namespace Narsil\Forms\Builder\Inputs;

#region USE

use Narsil\Forms\Builder\Inputs\FormInput;
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
    private const FETCH = 'fetch';

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
        $this->formNode[FormNode::PARAMETERS] = array_merge($this->formNode[FormNode::PARAMETERS] ?? [], [
            self::FETCH => $fetch,
        ]);

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

    #endregion
}
