<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use \DrewM\MailChimp\MailChimp;

class MailchimpController extends Controller
{
  public function subscribe() 
  {
    // you will need the mailchimp api key
    $MailChimp = new MailChimp(config("app.mailchimp_api_key"));
    // you will need the mailchimp list_id
    $list_id = config("app.mailchimp_list_id");

    // grab user data
    $firstName = request()->input('firstName');
    $lastName = request()->input('lastName');
    $userEmail = request()->input('email');

    // create the subscription
    $result = $MailChimp->post("lists/$list_id/members", [
      'email_address' => $userEmail,
      'status' => 'subscribed',
      'merge_fields' => [
        'FNAME' => $firstName,
        'LNAME' => $lastName
      ]
    ]);

    return 'successful';
  }
}