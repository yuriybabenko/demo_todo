<?php
namespace todo;

/**
 * Helper class for handling our API responses.
 */
class Api {
  const version = 1;

  protected $_response = array(
    'status' => 'ok',
    'messages' => array(
      'status' => array(),
      'error' => array(),
    )
  );

  /**
   * Flag to set an error on current request.
   * @return boolean [description]
   */
  public function hasError() {
    $this->_response['status'] = 'error';
  }

  /**
   * Adds specified message to Status Messages.
   * @param [type] $message [description]
   */
  public function setStatusMessage($message) {
    $this->_response['messages']['status'][] = $message;
  }

  /**
   * Adds specified message to Error Messages.
   * @param [type] $message [description]
   */
  public function setErrorMessage($message) {
    $this->hasError();
    $this->_response['messages']['error'][] = $message;
  }

  /**
   * Returns array of current messages.
   * @return [type] [description]
   */
  public function getMessages() {
    return $this->_response['messages'];
  }

  /**
   * Sets custom property on response.
   * @param [type] $name  [description]
   * @param [type] $value [description]
   */
  public function setProperty($name, $value) {
    $this->_response[$name] = $value;
  }

  /**
   * Removes custom property from response.
   * @param  [type] $name [description]
   * @return [type]       [description]
   */
  public function delProperty($name) {
    unset($this->_response[$name]);
  }

  /**
   * Returns JSON response.
   * @return [type] [description]
   */
  public function getResponse() {
    $this->setProperty('request_time', (int) $_SERVER['REQUEST_TIME']);

    return \Response::json($this->_response);
  }
}