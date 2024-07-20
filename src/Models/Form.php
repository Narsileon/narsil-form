<?php

namespace Narsil\Forms\Models;

#region USE

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
class Form extends Model
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
            self::OWNER_ID,
            self::OWNER_TYPE,
            self::SLUG,
            self::TITLE,
        ];

        $this->with = [
            self::RELATIONSHIP_NODES,
        ];

        parent::__construct($attributes);
    }

    #endregion

    #region CONSTANTS

    /**
     * @var string
     */
    final public const ACTIVE = 'active';
    /**
     * @var string
     */
    final public const ID = 'id';
    /**
     * @var string
     */
    final public const OWNER_ID = 'owner_id';
    /**
     * @var string
     */
    final public const OWNER_TYPE = 'owner_type';
    /**
     * @var string
     */
    final public const SLUG = 'slug';
    /**
     * @var string
     */
    final public const TITLE = 'title';

    /**
     * @var string
     */
    final public const RELATIONSHIP_NODES = 'nodes';
    /**
     * @var string
     */
    final public const RELATIONSHIP_OWNER = 'owner';

    /**
     * @var string
     */
    final public const TABLE = 'forms';

    #endregion

    #region RELATIONSHIPS

    /**
     * @return HasMany
     */
    final public function nodes(): HasMany
    {
        return $this->hasMany(
            FormNode::class,
            FormNode::FORM_ID,
            self::ID,
        );
    }

    /**
     * @return MorphTo
     */
    final public function owner(): MorphTo
    {
        return $this->morphTo(
            self::RELATIONSHIP_OWNER,
            self::OWNER_TYPE,
            self::OWNER_ID,
        );
    }

    #endregion
}
