<?php
// Credits: https://gist.github.com/mfkp/1488819

session_cache_limiter('nocache');
header('Expires: ' . gmdate('r', 0));
header('Content-type: application/json');

$apiKey 	= 'your-api-key'; - // How get your Mailchimp API KEY - http://kb.mailchimp.com/article/where-can-i-find-my-api-key
$listId 	= 'your-list-id'; - // How to get your Mailchimp LIST ID - http://kb.mailchimp.com/article/how-can-i-find-my-list-id
$submit_url	= "http://us2.api.mailchimp.com/1.3/?method=listSubscribe"; - // Replace us2 with your actual datacenter

$double_optin = false;
$send_welcome = false;
$email_type = 'html';
$email = $_POST['email'];
$merge_vars = array( 'YNAME' => $_POST['yname'] );

$data = array(
    'email_address' => $email,
    'apikey' => $apiKey,
    'id' => $listId,
    'double_optin' => $double_optin,
    'send_welcome' => $send_welcome,
	'merge_vars' => $merge_vars,
    'email_type' => $email_type
);

$payload = json_encode($data);
 
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $submit_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, urlencode($payload));
 
$result = curl_exec($ch);
curl_close ($ch);

$data = json_decode($result);

if ($data->error) {
    $arrResult = array ('response'=>'error','message'=>$data->error);
} else {
    $arrResult = array ('response'=>'success');
}

echo json_encode($arrResult);