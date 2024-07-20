<?php

namespace Narsil\Forms\Builder\Elements;

#region USE

use Narsil\Forms\Builder\Elements\FormElement;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
class FormSection extends FormElement
{
    #region CONSTRUCTOR

    /**
     * @param string $identifier
     *
     * @return void
     */
    public function __construct(string $identifier = 'default-section')
    {
        parent::__construct('section', $identifier);
    }

    #endregion
}
