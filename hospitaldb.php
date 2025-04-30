<?php
$db_server="localhost";
$db_user="root"; $db_password=""; $db_name="hospital";
$conn="";
try{
$conn = new mysqli($db_server, $db_user, $db_password, $db_name);
}
catch(mysqli_sql_exception){
    echo "Could not connect <br> ";
}
?>
