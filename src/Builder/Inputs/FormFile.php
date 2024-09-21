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
}
