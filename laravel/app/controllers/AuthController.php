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

    return $api->getResponse();
  }

  /**
   * Checks whether the current user is authenticated and if so, provides the email.
   * @return [type] [description]
   */
  public function getAuth() {
    $api = new \todo\Api();

    if (Auth::check()) {
      $api->setProperty('auth', 1);
      $api->setProperty('user_email', Auth::user()->email);
    }
    else {
      $api->setProperty('auth', 0);
    }

    $api->setStatusMessage('session_id: ' . Session::getId());

    return $api->getResponse();
  }

  /**
   * Logs out current user.
   * @return [type] [description]
   */
  public function getLogout() {
    $api = new \todo\Api();

    // $session_id = Session::getId();
    // DB::table('sessions')->where('id', '=', $session_id)->delete();

    $api->setStatusMessage('session_id: ' . Session::getId());

    // log the user out
    Auth::logout();
    Session::forget('user');

    $api->setStatusMessage('You have been logged out.');
    return $api->getResponse();
  }

}