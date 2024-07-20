<?php

namespace Narsil\Forms\Models;

#region USE

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
class FormNodeOption extends Model
{
    #region CONSTRUCTOR

    /**
     * @param array $attributes
     *
     * @return void
     */
    public function __construct(array $attributes = [])
    {
        $this->table = self::TABLE;

        $this->fillable = [
            self::LABEL,
            self::NODE_ID,
            self::VALUE,
        ];


        parent::__construct($attributes);
    }

    #endregion

    #region CONSTANTS

    /**
     * @var string
     */
    final public const ID = 'id';
    /**
     * @var string
     */
    final public const LABEL = 'label';
    /**
     * @var string
     */
    final public const NODE_ID = 'node_id';
    /**
     * @var string
     */
    final public const VALUE = 'value';

    /**
     * @var string
     */
    final public const RELATIONSHIP_NODE = 'node';

    /**
     * @var string
     */
    final public const TABLE = 'form_node_options';

    #endregion

    #region RELATIONSHIPS

    /**
     * @return BelongsTo
     */
    final public function form_node(): BelongsTo
    {
        return $this->belongsTo(
            FormNode::class,
            self::NODE_ID,
            FormNode::ID
        );
    }

    #endregion
}
