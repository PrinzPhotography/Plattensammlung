<?php
$nachname = $_POST['nachname'];
$vorname = $_POST['vorname'];
$email = $_POST['email'];
$text = $_POST['contactText'];

$formcontent="From: $vorname \n Message: $text";
$recipient = "a.prinz.1991@web.de";
$subject = "Kontaktformular";
$mailheader = "From: $email \r\n";
mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");