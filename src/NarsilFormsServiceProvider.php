<?php

namespace Narsil\Forms;

#region USE

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\ServiceProvider;
use Narsil\Forms\Blueprints\OptionBlueprint;
use Narsil\Forms\Interfaces\IFormNodeOptionRepository;
use Narsil\Forms\Repositories\FormNodeOptionRepository;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
final class NarsilFormsServiceProvider extends ServiceProvider
{
    #region PUBLIC METHODS

    /**
     * @return void
     */
    public function boot(): void
    {
        $this->bootBlueprints();
    }

    /**
     * @return void
     */
    public function register(): void
    {
        $this->app->singleton(IFormNodeOptionRepository::class, FormNodeOptionRepository::class);
    }

    #endregion

    #region PRIVATE METHODS

    /**
     * @return void
     */
    private function bootBlueprints(): void
    {
        Blueprint::macro('option', function (string $column)
        {
            OptionBlueprint::define($this, $column);
        });
    }

    #endregion
}
