<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');

require './db.php';

// Lấy dữ liệu từ React
$data = json_decode(file_get_contents("php://input"));

$title = $data->title;
$tags = $data->tags;
$blog = $data->blog;
$username = $data->username;

// Kiểm tra xem người dùng đã tồn tại chưa
$sql = "SELECT * FROM Users WHERE username = ?";
$params = array($username);

$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt === false) {
    die(json_encode(array("message" => "Error in query execution.")));
}

if (sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {

    $sql = "INSERT INTO WRITE_CONTENT (WRITERS, TITLES, HASHTAGS, CONTENTS) VALUES (?, ?, ?, ?)";
    $params = array($username, $title, $tags, $blog);
    $stmt = sqlsrv_query($conn, $sql, $params);

    if ($stmt === false) {
        die(json_encode(array("message" => "Error in query execution.")));
    } else {
        echo json_encode(array("message" => "Post blog successful."));
    }
}
else
{
    echo json_encode(array("message" => 'Username not exist'));
}

// Đóng kết nối
sqlsrv_close($conn);
?>
