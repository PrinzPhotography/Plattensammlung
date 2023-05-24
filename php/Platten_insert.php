<?php
$pdo = new PDO('mysql:host=smart-dev.demanderp.de;dbname=azubi_alex', 'azubi_alex', 'Test1234');

$artist = $_POST['artist'];
$album = $_POST['album'];
$erscheinungsjahr = $_POST['erscheinungsjahr'];
$genre = $_POST['genre'];
$medium = $_POST['medium'];

$artistSql = "SELECT KUENSTLER,ALBUM FROM plattensammlung WHERE KUENSTLER = ? and ALBUM = ?";
$sql = $pdo->prepare($artistSql);
$sql->execute(array($artist, $album));
$artistNew = $sql->fetch(PDO::FETCH_ASSOC);
$artist2 = $artistNew['KUENSTLER'];
$album2 = $artistNew['ALBUM'];

if($artist2 == $artist && $album2 == $album) {
    echo(json_encode(['success' => 'Schon vorhanden']));
} else {
    $sql='Insert into Plattensammlung (KUENSTLER,ALBUM,ERSCHEINUNGSJAHR,GENRE,MEDIUM) VALUES (?,?,?,?,?)';
    $statement=$pdo->prepare($sql);
    $statement->execute(array($artist,$album,$erscheinungsjahr,$genre,$medium));
    echo(json_encode(['success' => 'Eingetragen']));
}

//header( 'Location: http://localhost:63342/uebungen/html/Plattensammlung/Plattensammlung_eintrag.html?_ijt=45grgm2m686247qd65vnfmrbbl&_ij_reload' );

