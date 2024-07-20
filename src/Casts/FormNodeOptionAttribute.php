<?php

namespace Narsil\NarsilFramework\Casts;

#region USE

use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;
use Narsil\Forms\Interfaces\IFormNodeOptionRepository;
use Narsil\Forms\Models\FormNodeOption;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
final class FormNodeOptionAttribute implements CastsAttributes
{
    #region CONSTRUCTOR

    /**
     * @return void
     */
    public function __construct()
    {
        $this->formNodeOptionRepository = app(IFormNodeOptionRepository::class);
    }

    #endregion

    #region PROPERTIES

    /**
     * @var IFormNodeOptionRepository
     */
    protected readonly IFormNodeOptionRepository $formNodeOptionRepository;

    #endregion

    #region PUBLIC METHODS

    /**
     * @param Model $model
     * @param string $key
     * @param mixed $value
     * @param array $attributes
     *
     * @return ?array
     */
    public function get(Model $model, string $key, mixed $value, array $attributes): ?array
    {
        $formNodeOption = $this->formNodeOptionRepository->getById($value);

        if (!$formNodeOption)
        {
            return null;
        }

        return [
            FormNodeOption::ID => $formNodeOption->{FormNodeOption::ID},
            FormNodeOption::LABEL => $formNodeOption->{FormNodeOption::LABEL},
            FormNodeOption::VALUE => $formNodeOption->{FormNodeOption::VALUE},
        ];
    }

    /**
     * @param Model $model
     * @param string $key
     * @param mixed $value
     * @param array $attributes
     *
     * @return integer
     */
    public function set(Model $model, string $key, mixed $value, array $attributes): int
    {
        return $value;
    }

    #endregion
}
