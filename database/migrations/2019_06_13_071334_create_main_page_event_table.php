<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMainPageEventTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('main_page_event', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->integer('visible')->default(1);
            $table->string('bgimage')->nullable();
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
        Schema::dropIfExists('main_page_event');
    }
}
