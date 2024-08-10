<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');

require './db.php';

// Lấy dữ liệu từ React
$data = json_decode(file_get_contents("php://input"));

$groupname = $data->groupname;
$username = $data->username;
$describe = $data->describe;

$sql = "SELECT * FROM Users WHERE username = ?";
$params = array($username);

$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt === false) {
    die(json_encode(array("message" => "Error in query execution.")));
}

if (sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {

    $sql = "INSERT INTO GROUPS (GROUP_NAME, CREATOR, DESCRIBE) VALUES (?, ?, ?)";
    $params = array($groupname, $username, $describe);
    $stmt = sqlsrv_query($conn, $sql, $params);

    if ($stmt === false) {
        die(json_encode(array("message" => "Error in query execution.")));
    } else {
        echo json_encode(array("message" => "Create group successful."));
    }
}
else
{
    echo json_encode(array("message" => 'Username not exist'));
}

// Đóng kết nối
sqlsrv_close($conn);

?>