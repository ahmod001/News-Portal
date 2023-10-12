<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('newses', function (Blueprint $table) {
            $table->id();
            $table->string('title', 150)->index();
            $table->string('img', 200);
            $table->string('location', 200)->index()->nullable();
            $table->longText('description');

            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('reporter_id');

            $table->foreign('category_id')->references('id')->on('categories')
                ->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('reporter_id')->references('id')->on('news_reporters')
                ->cascadeOnUpdate()->restrictOnDelete();

            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('newses');
    }
};