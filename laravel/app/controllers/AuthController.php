<?php

class AuthController extends \BaseController {

  /**
   * Callback for /csrf-token.
   * Returns CSRF token.
   * @return [type] [description]
   */
  public function getCsrfToken() {
    $api = new \todo\Api();
    $api->setProperty('csrf_token', csrf_token());

    return $api->getResponse();
  }

  /**
   * Callback for /auth. 
   * Authenticates user.
   * @return [type] [description]
   */
  public function postAuth() {
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

      $api->setStatusMessage('Login successful.');

      Session::put('email', $user['email']);

    return $api->getResponse();
  }

}