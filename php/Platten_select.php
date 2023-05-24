<?php
$pdo = new PDO('mysql:host=smart-dev.demanderp.de;dbname=azubi_alex', 'azubi_alex', 'Test1234');




//Künstler Select
if($_POST['DATA']=='selectAz') {

    $letter = $_POST['letter'] . '%';
    $stmt = $pdo->prepare('SELECT DISTINCT KUENSTLER FROM plattensammlung WHERE KUENSTLER LIKE :letter');
    $stmt->bindParam(':letter', $letter);
    $stmt->execute();
    $artist = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo(json_encode($artist));
}

if($_POST['DATA']=='selectGenre') {
//Genre Select
    $genre = $_POST['genre'];
    $stmt = $pdo->prepare('SELECT DISTINCT KUENSTLER,ALBUM,ERSCHEINUNGSJAHR FROM plattensammlung WHERE GENRE = :genre');
    $stmt->bindParam(':genre', $genre);
    $stmt->execute();
    $artist = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo(json_encode($artist));
}

if($_POST['DATA']=='selectSammlung') {
    $artistSql = "SELECT KUENSTLER,ALBUM FROM plattensammlung ORDER BY KUENSTLER ASC";
    $sql = $pdo->prepare($artistSql);
    $sql->execute(array());
    $artist = $sql->fetchAll(PDO::FETCH_ASSOC);
    echo(json_encode($artist));
}
if($_POST['DATA']=='genreFilter') {
//Genre Select
    $genre = $_POST['genre'];
    $stmt = $pdo->prepare('SELECT DISTINCT KUENSTLER,ALBUM,ERSCHEINUNGSJAHR FROM plattensammlung WHERE GENRE = :genre');
    $stmt->bindParam(':genre', $genre);
    $stmt->execute();
    $artist = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo(json_encode($artist));
}
if($_POST['DATA']=='search') {
    $suche = '%'.$_POST['suche'].'%';
    $stmt = $pdo->prepare('SELECT DISTINCT KUENSTLER,ALBUM,ERSCHEINUNGSJAHR FROM plattensammlung WHERE KUENSTLER LIKE :suche');
    $stmt->bindParam(':suche', $suche);
    $stmt->execute();
    $artist = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo(json_encode($artist));
}

if($_POST['DATA']=='albenKünstler') {
    $alben = $_POST['alben'];
    $stmt = $pdo->prepare('SELECT ALBUM FROM plattensammlung WHERE KUENSTLER = :alben');
    $stmt->bindParam(':alben', $alben);
    $stmt->execute();
    $alben = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo(json_encode($alben));
}
if($_POST['DATA']=='delete') {
    $album = $_POST['albumDelete'];
    $statement = $pdo->prepare("DELETE FROM plattensammlung WHERE ALBUM = ?");
    $statement->execute(array($album));
    echo(json_encode(['erfolg'=>'erfolgreich gelöscht']));
}
if($_POST['DATA']=='selectNewest') {
    $artistSql = "SELECT KUENSTLER,ALBUM FROM plattensammlung WHERE ID=(select max(ID) from plattensammlung)";
    $sql = $pdo->prepare($artistSql);
    $sql->execute(array());
    $artist = $sql->fetchAll(PDO::FETCH_ASSOC);
    echo(json_encode($artist));
}
if($_POST['DATA']=='albumDetail') {
    $artistDetail = $_POST['artistDetail'];
    $albumDetail = $_POST['albumDetail'];
    $stmt = $pdo->prepare('SELECT KUENSTLER,ALBUM,ERSCHEINUNGSJAHR,GENRE FROM plattensammlung WHERE ALBUM = :albumDetail');
    $stmt->bindParam(':albumDetail', $albumDetail);
    $stmt->execute();
    $albumDetail = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo(json_encode($albumDetail));
}


/*--STEP THREE: Get the full record w/the ID we found in step 2
select *
from
  fruits fr
 ,(
--STEP TWO: Get the ID # of the name we found in step 1
  select
    min(vendor_id) min_id
  from
    fruits fr1
   ,(
--STEP ONE: Get the next name after "apples"
    select min(name) next_name
    from fruits frx
    where frx.name > 'apples'
    ) minval
  where fr1.name = minval.next_name
  ) x
where fr.vendor_id = x.min_id;*/