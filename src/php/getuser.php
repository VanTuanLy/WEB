<?php
session_start();
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
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');




$requestMethod = $_SERVER['REQUEST_METHOD'];


if(!isset($_SESSION['name'])){
    $_SESSION['name'] = '';
}

if ($requestMethod === 'POST'){
    $data = json_decode(file_get_contents("php://input"));
    if ($data && isset($data->username) && isset($data->password)) {
        $username = $data->username;
        $password = $data->password;

        // Kiểm tra tính hợp lệ của username và password
        
        $_SESSION['name'] = $username;

    }
}

if (isset($_SESSION['name'])) {
    echo json_encode(['username' => $_SESSION['name']]);
} else {
    echo json_encode(['error' => 'User not logged in']);
}
?>