<?php
$pdo = new PDO('mysql:host=smart-dev.demanderp.de;dbname=azubi_alex', 'azubi_alex', 'Test1234');

$sql = "SELECT Kuenstler from `Plattensammlung` where Kuenstler like 'A%'";
foreach ($pdo->query($sql) as $row) {
    echo $row['Kuenstler'];
    echo '<br>';
}
?>