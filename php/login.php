<?php
$pdo = new PDO('mysql:host=smart-dev.demanderp.de;dbname=azubi_alex', 'azubi_alex', 'Test1234');

$user = $_POST['user'];
$pass = $_POST['pass'];

$passwortUnsub = "SELECT PASSWORT FROM user WHERE EMAIL = ?";
$passUnsub = $pdo->prepare($passwortUnsub);
$passUnsub->execute(array($user));
$passwort = $passUnsub->fetch(PDO::FETCH_ASSOC)['PASSWORT'];
var_dump($passwort);
if ($passwort == $pass) {
    header( 'Location: http://localhost:63342/uebungen/html/Plattensammlung/Plattensammlung_index.html' );

} else {
    header( 'Location: http://localhost:63342/uebungen/html/Plattensammlung/index.html' );
}