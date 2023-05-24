<?php
$pdo = new PDO('mysql:host=smart-dev.demanderp.de;dbname=azubi_alex', 'azubi_alex', 'Test1234');

$artistSql = "SELECT KUENSTLER,ALBUM,ERSCHEINUNGSJAHR FROM plattensammlung";
$sql = $pdo->prepare($artistSql);
$sql->execute(array());
$artist = $sql->fetchAll(PDO::FETCH_ASSOC);
echo(json_encode($artist));