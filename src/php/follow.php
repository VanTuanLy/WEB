<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require './db.php';

// Thiết lập CORS
$allowed_origins = [
    "http://localhost:3000",
    "http://localhost:8080"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
} else {
    header("Access-Control-Allow-Origin: " . $allowed_origins[0]); // Mặc định là nguồn gốc đầu tiên
}

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Max-Age: 86400"); // Cache request OPTIONS trong 1 ngày
    exit(0);
}

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"));

if ($data === null || !isset($data->follower) || !isset($data->followed) || !isset($data->check)) {
    echo json_encode(array("message" => "Invalid input."));
    exit();
}

$follower = $data->follower;
$followed = $data->followed;
$check = $data->check;

if (!$check) {
    $sql = "UPDATE Users SET follows = follows + 1 WHERE username = ?";
    $params = array($followed);
    $stmt = sqlsrv_query($conn, $sql, $params);

    if ($stmt === false) {
        echo json_encode(array("message" => "Error in query execution."));
        die(print_r(sqlsrv_errors(), true));
    }

    $sqls = "INSERT INTO FOLLOW (FOLLOWER, BE_FOLLOWED) VALUES (?, ?)";
    $paramss = array($follower, $followed);
    $stmts = sqlsrv_query($conn, $sqls, $paramss);

    if ($stmts === false) {
        echo json_encode(array("message" => "Error in query execution."));
        die(print_r(sqlsrv_errors(), true));
    } else {
        echo json_encode(array("message" => "followed"));
    }
} else {
    $sql = "UPDATE Users SET FOLLOWS = FOLLOWS - 1 WHERE username = ?";
    $params = array($followed);
    $stmt = sqlsrv_query($conn, $sql, $params);

    if ($stmt === false) {
        echo json_encode(array("message" => "Error in query execution."));
        die(print_r(sqlsrv_errors(), true));
    }

    $sqls = "DELETE FROM FOLLOW WHERE FOLLOWER = ? AND BE_FOLLOWED = ?";
    $paramss = array($follower, $followed);
    $stmts = sqlsrv_query($conn, $sqls, $paramss);

    if ($stmts === false) {
        echo json_encode(array("message" => "Error in query execution."));
        die(print_r(sqlsrv_errors(), true));
    } else {
        echo json_encode(array("message" => "unfollowed"));
    }
}
?>
