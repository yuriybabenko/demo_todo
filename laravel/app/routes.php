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

  Route::post('auth', array(
    'uses' => 'AuthController@postAuth',
    'before' => 'csrf',
  ));

  Route::get('auth', array(
    'uses' => 'AuthController@getAuth',
  ));

  Route::get('auth/logout', array(
    'uses' => 'AuthController@getLogout',
  ));

  Route::get('user', array(
    'uses' => 'UserController@getIndex',
  ));
});



