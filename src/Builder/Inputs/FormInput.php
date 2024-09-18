<?php

namespace Narsil\Forms\Builder\Inputs;

#region USE

use Narsil\Forms\Builder\AbstractFormNode;
use Narsil\Forms\Models\FormNode;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
abstract class FormInput extends AbstractFormNode
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
        parent::__construct($type, $identifier);

        $this->formNode[FormNode::LABEL] = $this->getLabelFromIdentifier($identifier);
    }

    #endregion

    #region PUBLIC METHODS

    /**
     * Sets the description from the form node.
     *
     * @param string $value
     *
     * @return static Returns the current object instance.
     */
    final public function description(string $description): static
    {
        $this->formNode[FormNode::DESCRIPTION] = $description;

        return $this;
    }

    /**
     * Sets the required attribute as false.
     *
     * @return static Returns the current object instance.
     */
    final public function optional(): static
    {
        $this->formNode[FormNode::REQUIRED] = false;

        return $this;
    }

    /**
     * Sets the readonly attribute.
     *
     * @param boolean $readonly
     *
     * @return static Returns the current object instance.
     */
    final public function readonly(bool $readonly = true): static
    {
        $this->formNode[FormNode::READONLY] = $readonly;

        return $this;
    }

    /**
     * Sets the required attribute as true.
     *
     * @return static Returns the current object instance.
     */
    final public function required(): static
    {
        $this->formNode[FormNode::REQUIRED] = true;

        return $this;
    }

    #endregion

    #region PRIVATE METHODS

    /**
     * @param string $identifier
     *
     * @return string
     */
    private function getLabelFromIdentifier(string $identifier): string
    {
        $identifier = $this->removeRelationshipFromIdentifier($identifier);

        return "validation.attributes.$identifier";
    }

    /**
     * @param string $identifier
     *
     * @return string
     */
    private function removeRelationshipFromIdentifier(string $identifier): string
    {
        if (substr($identifier, -3) === '_id')
        {
            $identifier = substr($identifier, 0, -3);
        }

        return $identifier;
    }

    #endregion
}
