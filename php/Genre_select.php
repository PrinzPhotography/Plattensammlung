<?php
$pdo = new PDO('mysql:host=smart-dev.demanderp.de;dbname=azubi_alex', 'azubi_alex', 'Test1234');
$genre = $_POST['genre'];
$stmt = $pdo->prepare('SELECT DISTINCT KUENSTLER,ALBUM,ERSCHEINUNGSJAHR FROM plattensammlung WHERE GENRE = :genre');
$stmt->bindParam(':genre', $genre);
$stmt->execute();
$artist = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo(json_encode($artist));