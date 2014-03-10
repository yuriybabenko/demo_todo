<?php

class Item extends Eloquent {

  public static $rules = array(
    'user_id' => 'required',
    'title' => 'required',
  );

  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'items';

}