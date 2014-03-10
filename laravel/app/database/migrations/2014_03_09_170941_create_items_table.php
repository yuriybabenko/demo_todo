<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateItemsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('items', function($t) {
      $t->increments('id');
      $t->unsignedInteger('user_id');
      $t->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
      $t->string('title', 255);
      $t->integer('priority')->default(1);
      $t->timestamp('due_date')->nullable();
      $t->boolean('completed')->default(0);
      $t->timestamps();
    });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('items');
	}

}
