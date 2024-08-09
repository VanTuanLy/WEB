<?php
require './checkconnect.php';

require './db.php';

$sql = "SELECT * FROM WRITE_CONTENT ORDER BY CREATE_AT DESC";
$stmt = sqlsrv_query($conn, $sql);

$blogs = array();

while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    $blogs[] = $row;
}

echo json_encode($blogs);

sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);
?>