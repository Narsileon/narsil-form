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
class FormTable extends FormElement
{
    #region CONSTRUCTOR

    /**
     * @param string $identifier
     *
     * @return void
     */
    public function __construct(string $identifier)
    {
        parent::__construct('table', $identifier);
    }

    #endregion
}
