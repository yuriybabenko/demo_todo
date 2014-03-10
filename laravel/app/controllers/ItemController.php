<?php

class ItemController extends \BaseController {

  /**
   * Callback for /item/add. 
   * Adds new to-do item.
   * @return [type] [description]
   */
  public function postAdd() {
    $api = new \todo\Api();

    // perform form validation
      $validator = Validator::make(Input::all(), User::$rules);
      if ($validator->fails()) {
        foreach ($validator->messages()->toArray() as $error) {
          $api->setErrorMessage(array_shift($error));
        }

        return $api->getResponse();
      }

    // perform login authentication
      $user = array(
        'email' => Input::get('email'),
        'password' => Input::get('password')
      );
          
      if (!Auth::attempt($user)) {
        $api->setErrorMessage('Login failed.');
        return $api->getResponse();
      }

    return $api->getResponse();
  }

}