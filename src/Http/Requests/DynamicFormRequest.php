<?php

namespace Narsil\Forms\Http\Requests;

#region USE

use Narsil\Tables\Constants\DBTypes;
use Narsil\Tables\Services\TableService;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
class DynamicFormRequest extends AbstractFormRequest
{
    #region CONSTRUCTOR

    /**
     * @param string $table
     * @param bool $sometimes
     */
    public function __construct(
        string $table,
        bool $sometimes = false,
    )
    {
        $this->table = $table;
        $this->sometimes = $sometimes;
    }

    #endregion

    #region PROPERTIES

    /**
     * @var string
     */
    protected readonly string $table;
    /**
     * @var bool
     */
    protected readonly bool $sometimes;

    #endregion

    #region PUBLIC METHODS

    /**
     * @return array
     */
    public function rules(): array
    {
        $rules = [];

        $tableInformations = TableService::getTableColumns($this->table);

        foreach ($tableInformations as $attribute => $column)
        {
            $rule = [];

            if ($column->auto)
            {
                continue;
            }

            if ($column->type === DBTypes::TIMESTAMP)
            {
                continue;
            }

            $rule[] = $column->type;
            $rule[] = $column->required ? self::REQUIRED : self::OPTIONAL;

            if ($this->sometimes)
            {
                $rule[] = self::SOMETIMES;
            }

            $rules[$attribute] = $rule;
        }

        return $rules;
    }

    #endregion
}
