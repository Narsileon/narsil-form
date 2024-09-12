<?php

namespace Narsil\Forms\Builder;

#region USE

use Narsil\Forms\Models\FormNode;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
abstract class AbstractFormNode
{
    #region CONSTRUCTOR

    /**
     * @param string $type
     * @param string $identifier
     *
     * @return void
     */
    public function __construct(string $type, string $identifier)
    {
        $this->formNode[FormNode::IDENTIFIER] = $identifier;
        $this->formNode[FormNode::NODE_TYPE] = $type;
    }

    #endregion

    #region PROPERTIES

    /**
     * @var array<string,mixed>
     */
    protected array $formNode = [];

    #endregion

    #region PUBLIC METHODS

    /**
     * Sets the autoComplete attribute.
     *
     * @param string $autoComplete
     *
     * @return static Returns the current object instance.
     */
    final public function autoComplete(string $autoComplete): static
    {
        $this->formNode[FormNode::AUTO_COMPLETE] = $autoComplete;

        return $this;
    }

    /**
     * Gets the form node.
     *
     * @return array<string,mixed>
     */
    final public function get(): array
    {
        return $this->formNode;
    }

    /**
     * Gets the value of the attribute from the form node.
     *
     * @param string $attribute
     *
     * @return mixed
     */
    final public function getAttribute(string $attribute): mixed
    {
        return $this->formNode[$attribute] ?? null;
    }

    /**
     * Sets the identifier from the form node.
     *
     * @param string $identifier
     *
     * @return static Returns the current object instance.
     */
    final public function identifier(string $identifier): static
    {
        $this->formNode[FormNode::IDENTIFIER] = $identifier;

        return $this;
    }

    /**
     * Sets the label from the form node.
     *
     * @param string $label
     *
     * @return static Returns the current object instance.
     */
    final public function label(string $label): static
    {
        $this->formNode[FormNode::LABEL] = $label;

        return $this;
    }

    /**
     * Sets the type from the form node.
     *
     * @param string $type
     *
     * @return static Returns the current object instance.
     */
    final public function nodeType(string $type): static
    {
        $this->formNode[FormNode::NODE_TYPE] = $type;

        return $this;
    }

    #endregion
}
