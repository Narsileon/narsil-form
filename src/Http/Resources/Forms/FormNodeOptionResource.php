<?php

namespace Narsil\Forms\Http\Resources\Forms;

#region USE

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Narsil\Forms\Models\FormNodeOption;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
class FormNodeOptionResource extends JsonResource
{
    #region PUBLIC METHODS

    /**
     * @param Request $request
     *
     * @return array
     */
    public function toArray(Request $request): array
    {
        return [
            FormNodeOption::LABEL => $this->{FormNodeOption::LABEL},
            FormNodeOption::VALUE => $this->{FormNodeOption::VALUE},
        ];
    }

    #endregion
}
