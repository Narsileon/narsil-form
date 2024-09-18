<?php

namespace Narsil\Forms\Services;

#region USE

use Narsil\Forms\Models\Form;
use Narsil\Forms\Models\FormNode;
use Narsil\Forms\Models\FormNodeOption;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
abstract class FormService
{
    #region PUBLIC METHODS

    /**
     * @param string $title
     * @param string $slug
     * @param array<AbstractFormNode> $nodes
     *
     * @return Form
     */
    public static function getForm(string $title, string $slug, array $nodes): Form
    {
        $form = Form::firstWhere([
            Form::SLUG => $slug,
        ]);

        if (!$form)
        {
            $form = static::createForm($title, $slug, $nodes);
        }

        return $form;
    }

    #endregion

    #region PRIVATE METHODS

    /**
     * @param string $title
     * @param string $slug
     * @param array<AbstractFormNode> $nodes
     *
     * @return Form
     */
    private static function createForm(string $title, string $slug, array $nodes): Form
    {
        $form = Form::firstOrCreate([
            Form::SLUG => $slug,
        ], [
            Form::TITLE => $title,
        ]);

        static::createFormNodesRecursively($form, $nodes);

        return $form;
    }

    /**
     * @param Form $form
     * @param array<AbstractFormNode> $nodes
     * @param FormNode $parentNode
     *
     * @return void
     */
    private static function createFormNodesRecursively(Form $form, array $nodes, FormNode $parentNode = null): void
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
                FormNode::READONLY => $node[FormNode::READONLY] ?? false,
                FormNode::REQUIRED => $node[FormNode::REQUIRED] ?? false,
                FormNode::TYPE => $node[FormNode::TYPE] ?? null,
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
                static::createFormNodesRecursively($form, $children, $formNode);
            }
        }
    }

    #endregion
}
