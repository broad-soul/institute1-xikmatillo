<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMainPageExtraClassesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('main_page_extra_classes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('bgimage')->nullable();
            $table->string('image')->nullable();
            $table->longText('en');
            $table->longText('ru');
            $table->longText('uz');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('main_page_extra_classes');
    }
}
