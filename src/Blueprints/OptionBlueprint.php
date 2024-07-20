<?php

namespace Narsil\Forms\Blueprints;

#region USE

use Illuminate\Database\Schema\Blueprint;
use Narsil\Forms\Models\FormNodeOption;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
final class OptionBlueprint
{
    #region PUBLIC METHODS

    /**
     * @param Blueprint $table
     * @param string $column
     *
     * @return void
     */
    public static function define(Blueprint $table, string $column): void
    {
        $table->foreignId($column)
            ->nullable()
            ->constrained(FormNodeOption::TABLE, FormNodeOption::ID)
            ->nullOnDelete();
    }

    #endregion
}
