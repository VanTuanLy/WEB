<?php

require './checkconnect.php';

require './db.php';

$data = json_decode(file_get_contents("php://input"));

$groupid = $data->group_id;
$username = $data->username;
$check = $data->check;

if(!$check) {

    $sql = "UPDATE GROUPS SET MEMBERS_COUNT = MEMBERS_COUNT + 1 WHERE GROUP_ID = ?";
    $params = array($groupid);
    $stmt = sqlsrv_query($conn, $sql, $params);

    if ($stmt === false) {
        echo json_encode(array("message" => "Error in query execution."));
        die(print_r(sqlsrv_errors(), true));
    }

    $sqls = "INSERT INTO GROUPS_Users (GROUP_ID, MEMBERS) VALUES (?, ?)";
    $paramss = array( $groupid, $username);
    $stmts = sqlsrv_query($conn, $sqls, $paramss);

    if ($stmts === false) {
        echo json_encode(array("message" => "Error in query execution."));
        die(print_r(sqlsrv_errors(), true));
    }
    else {
        echo json_encode(array("message" => "joined"));
    }

}
else {
    $sql = "UPDATE GROUPS SET MEMBERS_COUNT = MEMBERS_COUNT - 1 WHERE GROUP_ID = ?";
    $params = array($groupid);
    $stmt = sqlsrv_query($conn, $sql, $params);

    if ($stmt === false) {
        echo json_encode(array("message" => "Error in query execution."));
        die(print_r(sqlsrv_errors(), true));
    }

    $sqls = "DELETE FROM GROUPS_Users WHERE GROUP_ID = ? AND MEMBERS = ?";
    $paramss = array($groupid, $username);
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
        echo json_encode(array("message" => "out"));
    }
}

sqlsrv_close($conn);

?>