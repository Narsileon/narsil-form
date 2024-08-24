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
        $this->bootMigrations();
        $this->bootTranslations();
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

    /**
     * @return void
     */
    private function bootMigrations(): void
    {
        $this->loadMigrationsFrom([
            __DIR__ . '/../database/migrations',
        ]);
    }

    /**
     * @return void
     */
    private function bootTranslations(): void
    {
        $this->loadJsonTranslationsFrom(__DIR__ . '/../lang', 'forms');
        $this->loadTranslationsFrom(__DIR__ . '/../lang', 'forms');
    }

    #endregion
}
