<?php

namespace Narsil\Forms\Builder\Elements;

#region USE

use Narsil\Forms\Builder\AbstractFormNode;
use Narsil\Forms\Models\FormNode;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
abstract class FormElement extends AbstractFormNode
{
    #region PUBLIC METHODS

    /**
     * Sets the children from the form node.
     *
     * @param array $children
     *
     * @return static Returns the current object instance.
     */
    final public function children(array $children): static
    {
        $this->formNode[FormNode::RELATIONSHIP_CHILDREN] = $children;

        return $this;
    }

    #endregion
}
