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
class FormTree extends FormInput
{
    #region CONSTRUCTOR

    /**
     * @param string $identifier
     *
     * @return void
     */
    public function __construct(string $identifier)
    {
        parent::__construct('tree', $identifier);
    }

    #endregion

    #region CONSTANTS

    /**
     * @var string
     */
    private const LABEL_KEY = 'label_key';

    #endregion

    #region PUBLIC METHODS

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

    #endregion
}
