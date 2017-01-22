<?php
$name = $_POST["name"];
$email = $_POST["email"];
$message = $_POST["message"];

if(strlen($name) >= 4 && strlen($message) >= 15 && strlen($email) && preg_match("/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i",$email)) {
    mail("mail@sebastianruehmann.de","Kontaktanfrage von ". $name, $message, 'From: '. $email . "\n" . 'Content-Type:text/plain; charset="UTF-8"');
    echo "success";
} else {
    echo "h4ck0rz";
}
?>