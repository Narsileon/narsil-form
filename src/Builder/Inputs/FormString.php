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
class FormString extends FormInput
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
    }

    #endregion

    #region PUBLIC METHODS

    /**
     * Sets the autoComplete attribute.
     *
     * @param string $autoComplete
     *
     * @return static Returns the current object instance.
     */
    final public function autoComplete(string $autoComplete): static
    {
        $this->formNode[FormNode::AUTO_COMPLETE] = $autoComplete;

        return $this;
    }

    /**
     * Sets the maxLength attribute.
     *
     * @param integer $maxLength
     *
     * @return static Returns the current object instance.
     */
    final public function maxLength(int $maxLength): static
    {
        $this->formNode[FormNode::MAX] = $maxLength;

        return $this;
    }

    /**
     * Sets the minLength attribute.
     *
     * @param integer $minLength
     *
     * @return static Returns the current object instance.
     */
    final public function minLength(int $minLength): static
    {
        $this->formNode[FormNode::MIN] = $minLength;

        return $this;
    }

    /**
     * Sets the placeholder attribute.
     *
     * @param string $placeholder
     *
     * @return static Returns the current object instance.
     */
    final public function placeholder(string $placeholder): static
    {
        $this->formNode[FormNode::PLACEHOLDER] = $placeholder;

        return $this;
    }

    /**
     * Sets the type attribute.
     *
     * @param string $type
     *
     * @return static Returns the current object instance.
     */
    final public function type(string $type): static
    {
        $this->formNode[FormNode::TYPE] = $type;

        return $this;
    }

    #endregion
}
