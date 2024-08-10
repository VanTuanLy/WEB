<?php
require './checkconnect.php';

require './db.php';

$sql = "SELECT * FROM GROUPS ORDER BY CREATE_AT DESC";
$stmt = sqlsrv_query($conn, $sql);

$list = array();

while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    $list[] = $row;
}

echo json_encode($list);

sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);
?>