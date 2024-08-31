<?php

namespace Narsil\Forms\Http\Resources;

#region USE

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Narsil\Forms\Models\Form;
use Narsil\Forms\Models\FormNode;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
class FormResource extends JsonResource
{
    #region CONSTRUCTOR

    /**
     * @param mixed $resource
     * @param array $options
     *
     * @return void
     */
    public function __construct(mixed $resource, array $options = null)
    {
        $this->options = $options;

        parent::__construct($resource);
    }

    #endregion

    #region PROPERTIES

    /**
     * @var string|null
     */
    public static $wrap = null;

    /**
     * @var array
     */
    protected readonly array $options;

    #endregion

    #region PUBLIC METHODS

    /**
     * @param Request $request
     *
     * @return array
     */
    public function toArray(Request $request): array
    {
        return [
            Form::ID => $this->{Form::ID},
            Form::TITLE => ucfirst($this->{Form::TITLE}),

            Form::RELATIONSHIP_NODES => FormNodeResource::collection($this->{Form::RELATIONSHIP_NODES}),

            FormNode::RELATIONSHIP_OPTIONS => $this->getOptions(),
        ];
    }

    #endregion

    #region PRIVATE METHODS

    /**
     * @return array
     */
    private function getOptions(): array
    {
        $options = [];

        foreach ($this->{Form::RELATIONSHIP_NODES} as $node)
        {
            $nodeOptions = $node->{FormNode::RELATIONSHIP_OPTIONS};

            if (count($nodeOptions) === 0)
            {
                continue;
            }

            $options[$node->{FormNode::IDENTIFIER}] = [
                FormNode::RELATIONSHIP_OPTIONS => FormNodeOptionResource::collection($nodeOptions),
            ];
        }

        return array_merge($options, $this->options);
    }

    #endregion
}
