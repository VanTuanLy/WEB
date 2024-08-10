<?php
// $allowed_origins = [
//     "http://localhost:3000",
//     "http://localhost:8080"
// ];

// // Kiểm tra giá trị của HTTP_ORIGIN
// if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
//     header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
// } else {
//     header("Access-Control-Allow-Origin: " . $allowed_origins[0]); // Mặc định là nguồn gốc đầu tiên
// }
// header("Access-Control-Allow-Headers: *");
// header("Access-Control-Allow-Credentials: true");
// header("Access-Control-Allow-Headers: Content-Type");
// header('Content-Type: application/json');

require './checkconnect.php';

require './db.php';

$data = json_decode(file_get_contents("php://input"));

$id = $data->id;
$like = $data->like;
$username = $data->username;

if($like) {

    $sql = "UPDATE WRITE_CONTENT SET LIKES = LIKES + 1 WHERE ID = ?";
    $params = array($id);
    $stmt = sqlsrv_query($conn, $sql, $params);

    if ($stmt === false) {
        echo json_encode(array("message" => "Error in query execution."));
        die(print_r(sqlsrv_errors(), true));
    }

    $sqls = "INSERT INTO LIKE_BLOG (ID, username) VALUES (?, ?)";
    $paramss = array( $id, $username);
    $stmts = sqlsrv_query($conn, $sqls, $paramss);

    if ($stmts === false) {
        echo json_encode(array("message" => "Error in query execution."));
        die(print_r(sqlsrv_errors(), true));
    }
    else {
        echo json_encode(array("message" => "liked"));
    }

}
else {
    $sql = "UPDATE WRITE_CONTENT SET LIKES = LIKES - 1 WHERE ID = ?";
    $params = array($id);
    $stmt = sqlsrv_query($conn, $sql, $params);

    if ($stmt === false) {
        echo json_encode(array("message" => "Error in query execution."));
        die(print_r(sqlsrv_errors(), true));
    }

    $sqls = "DELETE FROM LIKE_BLOG WHERE ID = ? AND username = ?";
    $paramss = array($id, $username);
    $stmts = sqlsrv_query($conn, $sqls, $paramss);

    if ($stmts === false) {
        echo json_encode(array("message" => "Error in query execution."));
        die(print_r(sqlsrv_errors(), true));
    }

    if ($stmts === false) {
        echo json_encode(array("message" => "Error in query execution."));
        die(print_r(sqlsrv_errors(), true));
    }
    else {
        echo json_encode(array("message" => "unliked"));
    }
}

sqlsrv_close($conn);

?>