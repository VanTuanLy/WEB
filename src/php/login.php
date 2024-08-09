<?php
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Headers: *");
// header('Content-Type: application/json');

// session_start();

// require './db.php';

// $data = json_decode(file_get_contents("php://input"));

// $username = $data->username;
// $password = $data->password;

// // Kiểm tra thông tin đăng nhập
// $sql = "SELECT * FROM Users WHERE username = ? AND passwords = ?";
// $params = array($username, $password);

// $stmt = sqlsrv_query($conn, $sql, $params);

// if ($stmt === false) {
//     die(json_encode(array("message" => "Error in query execution.")));
// }

// if (sqlsrv_fetch($stmt) === false) {
//     echo json_encode(array("message" => "Invalid username or password."));
// } else {
//     $_SESSION['loggedin'] = true;
//     $_SESSION['username'] = $username;
//     echo json_encode(array("message" => $_SESSION['username']));
// }

// // Đóng kết nối
// sqlsrv_close($conn);
$allowed_origins = [
    "http://localhost:3000",
    "http://localhost:8080"
];

// Kiểm tra giá trị của HTTP_ORIGIN
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
} else {
    header("Access-Control-Allow-Origin: " . $allowed_origins[0]); // Mặc định là nguồn gốc đầu tiên
}
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

session_start();

require './db.php';

$data = json_decode(file_get_contents("php://input"));

$username = $data->username;
$password = $data->password;
$_SESSION['name'] = $username;

// Kiểm tra thông tin đăng nhập
$sql = "SELECT * FROM Users WHERE username = ? AND passwords = ?";
$params = array($username, $password);

$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt === false) {
    echo json_encode(array("message" => "Error in query execution."));
    die(print_r(sqlsrv_errors(), true));
}

if (sqlsrv_has_rows($stmt)) {
    echo json_encode(array("username" => $username));
} else {
    echo json_encode(array("message" => "Invalid username or password."));
}

 //Đóng kết nối
sqlsrv_close($conn);
?>