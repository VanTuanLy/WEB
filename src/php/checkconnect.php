<?php

// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

// require './db.php';

// // Thiết lập CORS
// $allowed_origins = [
//     "http://localhost:3000",
//     "http://localhost:8080"
// ];

// if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
//     header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
// } else {
//     header("Access-Control-Allow-Origin: " . $allowed_origins[0]); // Mặc định là nguồn gốc đầu tiên
// }

// header("Access-Control-Allow-Credentials: true");
// header("Access-Control-Allow-Headers: Content-Type, Authorization");

// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//     header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
//     header("Access-Control-Max-Age: 86400"); // Cache request OPTIONS trong 1 ngày
//     exit(0);
// }

// header('Content-Type: application/json');

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
?>