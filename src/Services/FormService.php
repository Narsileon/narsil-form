<?php

namespace Narsil\Forms\Services;

#region USE

use Illuminate\Support\Facades\Config;
use Narsil\Forms\Constants\ConfigKeys;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
final class FormService
{
    #region PUBLIC METHODS

    /**
     * @param string $modelClass
     *
     * @return string|null
     */
    public function guessFormName(string $modelClass): string|null
    {
        $classBaseName = class_basename($modelClass);

        $form = "App\\Http\\Forms\\{$classBaseName}Form";

        if (!class_exists($form))
        {
            $paths = Config::get(ConfigKeys::PATHS, []);

            foreach ($paths as $path)
            {
                $form = "$path\\{$classBaseName}Form";

                if (class_exists($form))
                {
                    break;
                }
            }
        }

        return class_exists($form) ? $form : null;
    }

    #endregion
}
