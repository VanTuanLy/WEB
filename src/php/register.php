<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');

require './db.php';

// Lấy dữ liệu từ React
$data = json_decode(file_get_contents("php://input"));

$username = $data->username;
$password = $data->password;
$email = $data->email;

// Kiểm tra xem người dùng đã tồn tại chưa
$sql = "SELECT * FROM Users WHERE username = ?";
$params = array($username);

$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt === false) {
    die(json_encode(array("message" => "Error in query execution.")));
}

if (sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    echo json_encode(array("message" => "Username already exists"));
} else {
    $sql = "INSERT INTO users (username, passwords, email) VALUES (?, ?, ?)";
    $params = array($username, $password, $email);
    $stmt = sqlsrv_query($conn, $sql, $params);

    if ($stmt === false) {
        die(json_encode(array("message" => "Error in query execution.")));
    } else {
        echo json_encode(array("message" => "Registration successful."));
    }
}

// Đóng kết nối
sqlsrv_close($conn);
?>
