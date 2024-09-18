<?php

namespace Narsil\Forms\Models;

#region USE

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Narsil\Localization\Casts\TransAttribute;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
class FormNode extends Model
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

        $this->casts = [
            self::DESCRIPTION => TransAttribute::class,
            self::LABEL => TransAttribute::class,
            self::PARAMETERS => 'array',
            self::PLACEHOLDER => TransAttribute::class,
        ];

        $this->guarded = [];

        $this->with = [
            self::RELATIONSHIP_OPTIONS,
        ];

        parent::__construct($attributes, self::TABLE, '');
    }

    #endregion

    #region CONSTANTS

    /**
     * @var string
     */
    final public const AUTO_COMPLETE = 'auto_complete';
    /**
     * @var string
     */
    final public const DEFAULT_VALUE = 'default_value';
    /**
     * @var string
     */
    final public const DESCRIPTION = 'description';
    /**
     * @var string
     */
    final public const FORM_ID = 'form_id';
    /**
     * @var string
     */
    final public const ID = 'id';
    /**
     * @var string
     */
    final public const IDENTIFIER = 'identifier';
    /**
     * @var string
     */
    final public const LABEL = 'label';
    /**
     * @var string
     */
    final public const MAX = 'max';
    /**
     * @var string
     */
    final public const MIN = 'min';
    /**
     * @var string
     */
    final public const NODE_TYPE = 'node_type';
    /**
     * @var string
     */
    final public const PARAMETERS = 'parameters';
    /**
     * @var string
     */
    final public const PARENT_ID = 'parent_id';
    /**
     * @var string
     */
    final public const PLACEHOLDER = 'placeholder';
    /**
     * @var string
     */
    final public const READONLY = 'readonly';
    /**
     * @var string
     */
    final public const REQUIRED = 'required';
    /**
     * @var string
     */
    final public const TYPE = 'type';

    /**
     * @var string
     */
    final public const RELATIONSHIP_CHILDREN = 'children';
    /**
     * @var string
     */
    final public const RELATIONSHIP_FORM = 'form';
    /**
     * @var string
     */
    final public const RELATIONSHIP_OPTIONS = 'options';

    /**
     * @var string
     */
    final public const TABLE = 'form_nodes';

    #endregion

    #region RELATIONSHIPS

    /**
     * @return BelongsTo
     */
    final public function form(): BelongsTo
    {
        return $this->belongsTo(
            Form::class,
            self::FORM_ID,
            Form::ID
        );
    }

    /**
     * @return HasMany
     */
    final public function options(): HasMany
    {
        return $this->hasMany(
            FormNodeOption::class,
            FormNodeOption::NODE_ID,
            self::ID
        );
    }

    #endregion
}
