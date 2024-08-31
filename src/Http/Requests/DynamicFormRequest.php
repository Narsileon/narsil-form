<?php

namespace Narsil\Forms\Http\Requests;

#region USE

use Narsil\Tables\Constants\DBTypes;
use Narsil\Tables\Constants\Types;
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

            $rule[] = $this->getType($column->type);
            $rule[] = $this->getRequired($column->required);

            if ($this->sometimes)
            {
                $rule[] = self::SOMETIMES;
            }

            $rules[$attribute] = $rule;
        }

        return $rules;
    }

    #endregion

    #region PRIVATE METHODS

    /**
     * @param bool $required
     *
     * @return string
     */
    private function getRequired(bool $required): string
    {
        $rule = $required ? self::REQUIRED : self::OPTIONAL;

        return $rule;
    }

    /**
     * @param string $type
     *
     * @return mixed
     */
    private function getType(string $type): mixed
    {
        $rule = '';

        switch ($type)
        {
            case Types::BOOLEAN:
                $rule = self::TYPE_BOOLEAN;
                break;
            case Types::DATE:
                $rule = self::TYPE_DATE;
                break;
            case Types::DATETIME:
                $rule = self::TYPE_DATE;
                break;
            case Types::DOUBLE:
            case Types::FLOAT:
            case Types::INTEGER:
                $rule = self::TYPE_NUMERIC;
                break;
            case Types::STRING:
            case Types::TEXT:
                $rule = self::TYPE_STRING;
                break;
            case Types::TIME:
                $rule = self::TYPE_TIME;
                break;
        }

        return $rule;
    }

    #endregion
}
