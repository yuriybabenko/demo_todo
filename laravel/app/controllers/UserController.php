<?php

class UserController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function getIndex()
	{
    $api = new \todo\Api();

    $api->setStatusMessage('Index page.');

    return $api->getResponse();
	}

}