<?php

namespace Narsil\Forms\Builder;

#region USE

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;
use Narsil\Forms\Http\Resources\FormResource;
use Narsil\Forms\Services\FormService;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
abstract class AbstractForm extends JsonResource
{
    #region CONSTRUCTOR

    /**
     * @param mixed $resource
     * @param string $title
     * @param string $slug
     *
     * @return void
     */
    public function __construct(mixed $resource, string $title, string $slug)
    {
        $this->slug = $slug;
        $this->title = $title;

        parent::__construct($resource);
    }

    #endregion

    #region PROPERTIES

    /**
     * @var string
     */
    private readonly string $slug;
    /**
     * @var string
     */
    private readonly string $title;

    #endregion

    #region PUBLIC METHODS

    /**
     * @return FormResource
     */
    public function getForm(): FormResource
    {
        $form = FormService::getForm(
            nodes: $this->getSchema(),
            slug: $this->slug,
            title: $this->title,
        );

        $form = new FormResource($form, $this->getOptions());

        return $form;
    }

    /**
     * @param Request $request
     *
     * @return array
     */
    public function toArray(Request $request): array
    {
        $attributes = $this->resource ? $this->resource->toArray() : [];

        return $attributes;
    }

    /**
     * @param Request $request
     *
     * @return array
     */
    public function with($request): array
    {
        $form = $this->getForm();
        $meta = $this->getMeta();
        $slug = $this->getSlug();

        return compact(
            'form',
            'meta',
            'slug',
        );
    }

    #endregion

    #region PROTECTED METHODS

    /**
     * @return array
     */
    protected function getMeta(): array
    {
        return [];
    }

    /**
     * @return array
     */
    protected function getOptions(): array
    {
        return [];
    }

    /**
     * @return array<AbstractFormNode>
     */
    protected abstract function getSchema(): array;

    #endregion

    #region PRIVATE METHODS

    /**
     * @return string|null
     */
    private function getSlug(): string|null
    {
        return $this->resource ? Str::slug($this->resource->getTable()) : null;
    }

    #endregion
}
