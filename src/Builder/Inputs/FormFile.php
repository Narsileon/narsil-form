<?php

namespace Narsil\Forms\Builder\Inputs;

#region USE

use Illuminate\Support\Arr;
use Narsil\Forms\Builder\Inputs\FormInput;
use Narsil\Forms\Models\FormNode;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
class FormFile extends FormInput
{
    #region CONSTRUCTOR

    /**
     * @param string $identifier
     *
     * @return void
     */
    public function __construct(string $identifier)
    {
        parent::__construct('file', $identifier);

        $this->formNode[FormNode::TYPE] = 'file';
    }

    #endregion

    #region CONSTANTS

    /**
     * @var string
     */
    private const ACCEPT = 'accept';

    #endregion

    #region PUBLIC METHODS

    /**
     * Sets the accept attribute.
     *
     * @param integer $max
     *
     * @return static Returns the current object instance.
     */
    final public function accept(string $accept): static
    {
        Arr::set($this->formNode, FormNode::PARAMETERS . '.' . self::ACCEPT, $accept);

        return $this;
    }

    #endregion
}
