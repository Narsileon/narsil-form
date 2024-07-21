<?php

#region USE

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Narsil\Forms\Models\Form;
use Narsil\Forms\Models\FormNode;
use Narsil\Forms\Models\FormNodeOption;

#endregion

return new class extends Migration
{
    #region MIGRATIONS

    /**
     * @return void
     */
    public function up(): void
    {
        $this->createFormsTable();
        $this->createFormNodesTable();
        $this->createFormNodeOptionsTable();
    }

    /**
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists(FormNodeOption::TABLE);
        Schema::dropIfExists(FormNode::TABLE);
        Schema::dropIfExists(Form::TABLE);
    }

    #endregion

    #region TABLES

    /**
     * @return void
     */
    private function createFormNodeOptionsTable(): void
    {
        if (Schema::hasTable(FormNodeOption::TABLE))
        {
            return;
        }

        Schema::create(FormNodeOption::TABLE, function (Blueprint $table)
        {
            $table->id();

            $table->boolean(Form::ACTIVE)
                ->default(true);
            $table->foreignId(FormNodeOption::NODE_ID)
                ->constrained(FormNode::TABLE, FormNode::ID)
                ->cascadeOnDelete();
            $table->trans(FormNodeOption::LABEL);
            $table->string(FormNodeOption::VALUE);

            $table->timestamps();
        });
    }

    /**
     * @return void
     */
    private function createFormNodesTable(): void
    {
        if (Schema::hasTable(FormNode::TABLE))
        {
            return;
        }

        Schema::create(FormNode::TABLE, function (Blueprint $table)
        {
            $table->id();

            $table->boolean(FormNode::ACTIVE)
                ->default(true);
            $table->foreignId(FormNode::FORM_ID)
                ->constrained(Form::TABLE, Form::ID)
                ->cascadeOnDelete();
            $table->foreignId(FormNode::PARENT_ID)
                ->nullable()
                ->constrained(FormNode::TABLE, FormNode::ID)
                ->nullOnDelete();
            $table->string(FormNode::NODE_TYPE);
            $table->trans(FormNode::LABEL);
            $table->trans(FormNode::DESCRIPTION);
            $table->string(FormNode::IDENTIFIER)
                ->nullable();
            $table->string(FormNode::AUTO_COMPLETE)
                ->nullable();
            $table->string(FormNode::DEFAULT_VALUE)
                ->nullable();
            $table->integer(FormNode::MAX)
                ->nullable();
            $table->integer(FormNode::MIN)
                ->nullable();
            $table->trans(FormNode::PLACEHOLDER);
            $table->boolean(FormNode::REQUIRED)
                ->default(false);
            $table->string(FormNode::TYPE)
                ->nullable();

            $table->timestamps();
        });
    }

    /**
     * @return void
     */
    private function createFormsTable(): void
    {
        if (Schema::hasTable(Form::TABLE))
        {
            return;
        }

        Schema::create(Form::TABLE, function (Blueprint $table)
        {
            $table->id();

            $table->boolean(Form::ACTIVE)
                ->default(true);
            $table->trans(Form::TITLE);
            $table->string(Form::SLUG);
            $table->nullableMorphs(Form::RELATIONSHIP_OWNER);

            $table->timestamps();
        });
    }

    #endregion
};
