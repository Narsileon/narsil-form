<?php

namespace Narsil\Forms\Http\Requests;

#region USE

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
abstract class AbstractFormRequest extends FormRequest
{
    #region CONSTANTS

    /**
     * @var string
     */
    final public const CONFIRMED = 'confirmed';
    /**
     * @var string
     */
    final public const OPTIONAL = 'nullable';
    /**
     * @var string
     */
    final public const REQUIRED = 'required';
    /**
     * @var string
     */
    final public const SOMETIMES = 'sometimes';

    /**
     * @var string
     */
    final public const FORMAT_GIF = 'mimes:gif';
    /**
     * @var string
     */
    final public const FORMAT_IMAGE = 'mimes:bmp,jpeg,jpg,png';
    /**
     * @var string
     */
    final public const FORMAT_SVG = 'mimes:svg';

    /**
     * @var string
     */
    final public const TYPE_ARRAY = 'array';
    /**
     * @var string
     */
    final public const TYPE_BOOLEAN = 'boolean';
    /**
     * @var string
     */
    final public const TYPE_DATE = 'date';
    /**
     * @var string
     */
    final public const TYPE_EMAIL = 'email';
    /**
     * @var string
     */
    final public const TYPE_IMAGE = 'image';
    /**
     * @var string
     */
    final public const TYPE_INTEGER = 'int';
    /**
     * @var string
     */
    final public const TYPE_NUMERIC = 'numeric';
    /**
     * @var string
     */
    final public const TYPE_STRING = 'string';
    /**
     * @var string
     */
    final public const TYPE_TIME = 'date_format:H:i';

    #endregion

    #region PUBLIC METHODS

    /**
     * @param string $value
     *
     * @return string
     */
    final public static function afterNotEqual(string $value): string
    {
        $rule = 'after:' . $value;

        return $rule;
    }

    /**
     * @param string $value
     *
     * @return string
     */
    final public static function afterOrEqual(string $value): string
    {
        $rule = 'after_or_equal:' . $value;

        return $rule;
    }

    /**
     * @param string $value
     *
     * @return string
     */
    final public static function beforeNotEqual(string $value): string
    {
        $rule = 'before:' . $value;

        return $rule;
    }

    /**
     * @param string $value
     *
     * @return string
     */
    final public static function beforeOrEqual(string $value): string
    {
        $rule = 'before_or_equal:' . $value;

        return $rule;
    }

    /**
     * @param string $attribute
     *
     * @return string
     */
    final public static function imageOrString(string $attribute): string
    {
        $hasFile = request()->hasFile($attribute);

        return $hasFile ? self::TYPE_IMAGE : self::TYPE_STRING;
    }

    /**
     * @param float $value
     *
     * @return string
     */
    final public static function max(float $value): string
    {
        $rule = 'max:' . $value;

        return $rule;
    }

    /**
     * @param float $value
     *
     * @return string
     */
    final public static function min(float $value): string
    {
        $rule = 'min:' . $value;

        return $rule;
    }

    /**
     * @param string $column
     *
     * @return string
     */
    final public static function requiredWithColumn(string $column): string
    {
        $rule = 'required_with:' . $column;

        return $rule;
    }

    /**
     * @param array<string> $columns
     *
     * @return string
     */
    final public static function requiredWithColumns(array $columns): string
    {
        $columns = implode(',', $columns);

        $rule = 'required_with:' . $columns;

        return $rule;
    }

    /**
     * @param string $column
     *
     * @return string
     */
    final public static function requiredWithoutColumn(string $column): string
    {
        $rule = 'required_without:' . $column;

        return $rule;
    }

    /**
     * @param array<string> $columns
     *
     * @return string
     */
    final public static function requiredWithoutColumns(array $columns): string
    {
        $columns = implode(',', $columns);

        $rule = 'required_without:' . $columns;

        return $rule;
    }

    /**
     * @param string $table
     * @param string $column
     * @param string $ignoreId
     *
     * @return string
     */
    final public static function unique(string $table, string $column, string $ignoreId = ''): string
    {
        $rule = Rule::unique($table, $column)->ignore($ignoreId);

        return $rule;
    }

    #endregion
}
