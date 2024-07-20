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
class FormTime extends FormInput
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

        $this->formNode[FormNode::TYPE] = 'time';
    }

    #endregion
}
