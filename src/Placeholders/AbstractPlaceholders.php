<?php

namespace Narsil\Forms\Placeholders;

#region USE

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
abstract class AbstractPlaceholders
{
    #region PUBLIC METHODS

    /**
     * @param Model $model
     *
     * @return array
     */
    public static abstract function placeholders(Model $model): array;

    /**
     * @param Model $model
     * @param string template
     *
     * @return string
     */
    public static function replacePlaceholders(Model $model, string $template): string
    {
        $placeholders = static::placeholders($model);

        foreach ($placeholders as $key => $value)
        {
            $wrappedPlaceholder = '{ ' . $key . ' }';

            if (Str::contains($template, $wrappedPlaceholder))
            {
                $template = Str::replace($wrappedPlaceholder, $value, $template);
            }
        }

        return $template;
    }

    #endregion
}
