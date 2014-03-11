<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::group(array('prefix' => 'api/v1'), function() {
  Route::get('csrf-token', array(
    'uses' => 'AuthController@getCsrfToken',
  ));

  // auth
  Route::post('auth', array(
    'uses' => 'AuthController@postAuth',
    'before' => 'csrf',
  ));

  Route::get('auth', array(
    'uses' => 'AuthController@getAuth',
  ));

  Route::post('auth/register', array(
    'uses' => 'AuthController@postRegister',
  ));

  Route::get('auth/logout', array(
    'uses' => 'AuthController@getLogout',
  ));
  
  // user
  Route::get('user', array(
    'uses' => 'UserController@getIndex',
  ));

  // item
  Route::post('item', array(
    'uses' => 'ItemController@postAll',
  ));

  Route::post('item/add', array(
    'uses' => 'ItemController@postAdd',
    'before' => 'csrf',
  ));

  Route::post('item/update', array(
    'uses' => 'ItemController@postUpdate',
    'before' => 'csrf',
  ));

  Route::post('item/toggle', array(
    'uses' => 'ItemController@postToggle',
    'before' => 'csrf',
  ));

  Route::post('item/remove', array(
    'uses' => 'ItemController@postRemove',
    'before' => 'csrf',
  ));
  
});




