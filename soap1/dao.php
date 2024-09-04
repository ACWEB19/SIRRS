<?php

function conexion(){
    // $conn = mysqli_connect("localhost", "root", "") ;
    $conn = mysql_connect("localhost", "root", "")or die(mysql_error()) ;
    mysql_select_db("ws_sirrs", $conn);

    // if (!$conn) {
    //     die("Connection failed: " . mysqli_connect_error());
    // }
    // echo "Connected successfully";
    return ($conn);
}

?>