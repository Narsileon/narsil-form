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
class FormTabs extends FormElement
{
    #region CONSTRUCTOR

    /**
     * @param string $identifier
     *
     * @return void
     */
    public function __construct(string $identifier = 'default-tabs')
    {
        parent::__construct('tabs', $identifier);
    }

    #endregion
}
