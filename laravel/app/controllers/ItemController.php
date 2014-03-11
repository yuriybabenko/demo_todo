<?php

class ItemController extends \BaseController {

  /**
   * Callback for /item
   * Return all items for current user and performs sorting.
   * @return [type] [description]
   */
  public function postAll() {
    $api = new \todo\Api();

    $data = array();

    $query = Item::where('user_id', '=', Auth::user()->id);

    // sort by due date
    if ((int) Input::get('date', true)) {
      $query->orderBy('due_date' , 'ASC');
    }

    // sort by priority
    if ((int) Input::get('priority', true)) {
      $query->orderBy('priority' , 'DESC');
    }

    $items = $query->get();

    foreach ($items as $item) {
      $new_item = array(
        'id' => $item->id,
        'user_id' => Auth::user()->id,
        'title' => htmlentities($item->title),
        'priority' => $item->priority,
        'date' => $item->due_date,
        'completed' => $item->completed ? true : false,
      );

      if (!is_null($new_item['date'])) {
        $new_item['date'] = date('m/d/Y', strtotime($item->due_date));
      }

      // sanitize output
      foreach ($new_item as &$value) {
        $value = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
      }

      $data[] = $new_item;
    }

    $api->setProperty('items', $data);
    return $api->getResponse();
  }

  /**
   * Callback for /item/add. 
   * Adds new to-do item.
   * @return [type] [description]
   */
  public function postAdd() {
    $api = new \todo\Api();

    // build Item object & save it
      $item = new item;
      $item->user_id = Auth::user()->id;
      $item->title = Input::get('title');
      $item->priority = Input::get('priority', 1);
      $item->due_date = Input::get('date');
      $item->completed = 0;

    // sanity checks
      // default to 'normal' priority
      if (!is_numeric($item->priority) || !in_array($item->priority, array(0, 1, 2))) {
        $item->priority = 1; 
      }

      // check date format
      if ($item->due_date) {
        // perform form validation
        $validator = Validator::make(array('date' => $item->due_date), array('date' => 'date_format:"m/d/Y"'));
        if ($validator->fails()) {
          $api->setErrorMessage('Invalid date.');

          return $api->getResponse();
        }

        // now format date for MySQL
        $item->due_date = date('Y-m-d', strtotime($item->due_date));
      }
      else {
        $item->due_date = NULL;
      }

      if ($item->save()) {
        $api->setStatusMessage('Item "' . str_limit($item->title, 30, '...') . '" saved.');
      }
      else {
        $api->setErrorMessage('An error occurred.');
      }

    return $api->getResponse();
  }

  /**
   * Callback for /item/toggle. 
   * Toggles item status.
   * @return [type] [description]
   */
  public function postToggle() {
    $api = new \todo\Api();

    // count items which matches specified id and currently logged in user
    $count = Item::where('id', '=', Input::get('id'))
                  ->where('user_id', '=', Auth::user()->id)
                  ->count();

    if (!$count) {
      $api->setErrorMessage('Item could not be updated.');
      return $api->getResponse();
    }

    $item = Item::find(Input::get('id'));
    $item->completed = $item->completed ? 0 : 1;
    $item->save();

    return $api->getResponse();
  }

  /**
   * Callback for /item/remove. 
   * Removes to-do item.
   * @return [type] [description]
   */
  public function postRemove() {
    $api = new \todo\Api();

    // count items which matches specified id and currently logged in user
    $count = Item::where('id', '=', Input::get('id'))
                  ->where('user_id', '=', Auth::user()->id)
                  ->count();

    if (!$count) {
      $api->setErrorMessage('Item could not be deleted.');
      return $api->getResponse();
    }

    $item = Item::find(Input::get('id'));
    $title = $item->title;
    $item->delete();

    $api->setStatusMessage('Item "' . str_limit($title, 30, '...') . '" deleted.');

    return $api->getResponse();
  }

}