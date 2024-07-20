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
class FormNumber extends FormInput
{
    #region CONSTRUCTOR

    /**
     * @param string $identifier
     *
     * @return void
     */
    public function __construct(string $identifier)
    {
        parent::__construct('string', $identifier);

        $this->formNode[FormNode::TYPE] = 'number';
    }

    #endregion

    #region PUBLIC METHODS

    /**
     * Sets the max attribute.
     *
     * @param integer $max
     *
     * @return static Returns the current object instance.
     */
    final public function max(int $max): static
    {
        $this->formNode[FormNode::MAX] = $max;

        return $this;
    }

    /**
     * Sets the min attribute.
     *
     * @param integer $min
     *
     * @return static Returns the current object instance.
     */
    final public function min(int $min): static
    {
        $this->formNode[FormNode::MIN] = $min;

        return $this;
    }

    #endregion
}
