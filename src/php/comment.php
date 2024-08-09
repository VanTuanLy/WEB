<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');

require './db.php';

// Lấy dữ liệu từ React
$data = json_decode(file_get_contents("php://input"));

if (!$data || !isset($data->comment) || !isset($data->username) || !isset($data->id)) {
    die(json_encode(array("message" => "Invalid input data.")));
}

$comment = $data->comment;
$username = $data->username;
$id = $data->id;

// Kiểm tra xem người dùng đã tồn tại chưa
$sql = "SELECT * FROM Users WHERE username = ?";
$params = array($username);

$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt === false) {
    die(json_encode(array("message" => "Error in query execution.")));
}

if (sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {

    $sql = "INSERT INTO COMMENT (COMMENT, USERS, ID) VALUES (?, ?, ?)";
    $params = array($comment, $username, $id);
    $stmt = sqlsrv_query($conn, $sql, $params);

    if ($stmt === false) {
        die(json_encode(array("message" => "Error in query execution.")));
    } else {
        echo json_encode(array("message" => "Post comment successful."));
    }
}
else
{
    echo json_encode(array("message" => 'Username not exist'));
}

// Đóng kết nối
sqlsrv_close($conn);
?>
