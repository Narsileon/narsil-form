<?php

namespace Narsil\Forms\Builder;

#region USE

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;
use Narsil\Forms\Models\Form;
use Narsil\Forms\Models\FormNode;
use Narsil\Forms\Models\FormNodeOption;
use Narsil\Forms\Http\Resources\FormResource;

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
     * @param Request $request
     *
     * @return array
     */
    public function toArray(Request $request): array
    {
        $attributes = [];

        $attributes = $this->resource?->toArray();

        return $attributes;
    }

    /**
     * @param Request $request
     *
     * @return array
     */
    public function with($request): array
    {
        $form = new FormResource($this->getForm(), $this->getOptions());;
        $meta = $this->getMeta();
        $slug = $this->getSlug();
        $title = $this->getTitle();

        return compact(
            'form',
            'meta',
            'slug',
            'title',
        );
    }

    #endregion

    #region PROTECTED METHODS

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
     * @param array<AbstractFormNode> $nodes
     *
     * @return Form
     */
    private function createForm(array $nodes): Form
    {
        $form = Form::firstOrCreate([
            Form::SLUG => $this->slug,
        ], [
            Form::TITLE => $this->title,
        ]);

        $this->createFormNodesRecursively($form, $nodes);

        return $form;
    }

    /**
     * @param Form $form
     * @param array<AbstractFormNode> $nodes
     * @param FormNode $parentNode
     *
     * @return void
     */
    private function createFormNodesRecursively(Form $form, array $nodes, FormNode $parentNode = null): void
    {
        foreach ($nodes as $node)
        {
            $node = $node->get();

            $formNode = FormNode::firstOrCreate([
                FormNode::FORM_ID => $form->{Form::ID},
                FormNode::IDENTIFIER => $node[FormNode::IDENTIFIER] ?? null,
                FormNode::NODE_TYPE => $node[FormNode::NODE_TYPE],
                FormNode::PARENT_ID => $parentNode?->{FormNode::ID},
            ], array_filter([
                FormNode::AUTO_COMPLETE => $node[FormNode::AUTO_COMPLETE] ?? null,
                FormNode::DEFAULT_VALUE => $node[FormNode::DEFAULT_VALUE] ?? null,
                FormNode::DESCRIPTION => $node[FormNode::DESCRIPTION] ?? null,
                FormNode::LABEL => $node[FormNode::LABEL] ?? null,
                FormNode::MAX => $node[FormNode::MAX] ?? null,
                FormNode::MIN => $node[FormNode::MIN] ?? null,
                FormNode::PARAMETERS => $node[FormNode::PARAMETERS] ?? null,
                FormNode::PLACEHOLDER => $node[FormNode::PLACEHOLDER] ?? null,
                FormNode::TYPE => $node[FormNode::TYPE] ?? null,
                FormNode::REQUIRED => $node[FormNode::REQUIRED] ?? false,
            ]));

            if ($options = $node[FormNode::RELATIONSHIP_OPTIONS] ?? null)
            {
                foreach ($options as $option)
                {
                    FormNodeOption::firstOrCreate([
                        FormNodeOption::NODE_ID => $formNode->{FormNode::ID},
                        FormNodeOption::VALUE => $option[FormNodeOption::VALUE] ?? $option,
                    ], [
                        FormNodeOption::LABEL => $option[FormNodeOption::LABEL] ?? $option,
                    ]);
                }
            }

            if ($children = $node[FormNode::RELATIONSHIP_CHILDREN] ?? null)
            {
                $this->createFormNodesRecursively($form, $children, $formNode);
            }
        }
    }

    /**
     * @return Form
     */
    private function getForm(): Form
    {
        $form = Form::firstWhere(Form::SLUG);

        if (!$form)
        {
            $schema = $this->getSchema();

            $form = $this->createForm($schema);
        }

        return $form;
    }

    /**
     * @return string
     */
    private function getSlug(): string
    {
        return Str::slug($this->resource->getTable());
    }

    /**
     * @return string
     */
    private function getTitle(): string
    {
        return ucfirst(str_replace('_', ' ', $this->resource->getTable()));
    }

    #endregion
}
