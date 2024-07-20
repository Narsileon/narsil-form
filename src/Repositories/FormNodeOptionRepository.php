<?php

namespace Narsil\Forms\Repositories;

#region USE

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;
use Narsil\Forms\Interfaces\IFormNodeOptionRepository;
use Narsil\Forms\Models\FormNodeOption;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
final class FormNodeOptionRepository implements IFormNodeOptionRepository
{
    #region CONSTANTS

    /**
     * @var string
     */
    private const CACHE_KEY = 'form_node_option_repository';

    #endregion

    #region PROPERTIES

    /**
     * @var Collection|null
     */
    private ?Collection $formNodeOptionsById = null;

    #endregion

    #region PUBLIC METHODS

    /**
     * @return void
     */
    public function flush(): void
    {
        Cache::forget(self::CACHE_KEY);
    }

    /**
     * @return Collection Returns a collection of all form node options.
     */
    public function getAll(): Collection
    {
        return Cache::rememberForever(self::CACHE_KEY, function ()
        {
            return FormNodeOption::all();
        });
    }

    /**
     * @param integer $id
     *
     * @return ?FormNodeOption Returns the form node option for the giving id.
     */
    public function getById(int $id): ?FormNodeOption
    {
        if ($this->formNodeOptionsById === null)
        {
            $this->formNodeOptionsById = $this->getAll()->keyBy(FormNodeOption::ID);
        }

        return $this->formNodeOptionsById->get($id);
    }

    #endregion
}
