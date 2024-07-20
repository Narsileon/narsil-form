<?php

namespace Narsil\Forms\Interfaces;

#region USE

use Illuminate\Database\Eloquent\Collection;
use Narsil\Forms\Models\FormNodeOption;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
interface IFormNodeOptionRepository
{
    #region PUBLIC METHODS

    /**
     * @return void
     */
    public function flush(): void;

    /**
     * @return Collection
     */
    public function getAll(): Collection;

    /**
     * @param integer $id
     *
     * @return ?FormNodeOption
     */
    public function getById(int $id): ?FormNodeOption;

    #endregion
}
