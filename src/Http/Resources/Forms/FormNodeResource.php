<?php

namespace Narsil\Forms\Http\Resources\Forms;

#region USE

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Narsil\Forms\Models\FormNode;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
class FormNodeResource extends JsonResource
{
    #region PUBLIC METHODS

    /**
     * @param Request $request
     *
     * @return array
     */
    public function toArray(Request $request): array
    {
        return [
            FormNode::AUTO_COMPLETE => $this->{FormNode::AUTO_COMPLETE},
            FormNode::DESCRIPTION => $this->{FormNode::DESCRIPTION},
            FormNode::ID => $this->{FormNode::ID},
            FormNode::IDENTIFIER => $this->{FormNode::IDENTIFIER} ?? str($this->{FormNode::ID}),
            FormNode::LABEL => ucfirst($this->{FormNode::LABEL}),
            FormNode::MAX => $this->{FormNode::MAX},
            FormNode::MIN => $this->{FormNode::MIN},
            FormNode::NODE_TYPE => $this->{FormNode::NODE_TYPE},
            FormNode::PARENT_ID => $this->{FormNode::PARENT_ID},
            FormNode::PARAMETERS => $this->{FormNode::PARAMETERS},
            FormNode::PLACEHOLDER => $this->{FormNode::PLACEHOLDER},
            FormNode::READ_ONLY => $this->{FormNode::READ_ONLY},
            FormNode::REQUIRED => $this->{FormNode::REQUIRED},
            FormNode::TYPE => $this->{FormNode::TYPE},
        ];
    }

    #endregion
}
