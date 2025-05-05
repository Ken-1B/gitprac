<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include "db.php";

$data = json_decode(file_get_contents("php://input"));

$name = $data->name;
$email = $data->email;
$password = password_hash($data->password, PASSWORD_BCRYPT);

$stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $email, $password);

$response = [];

if ($stmt->execute()) {
  $response['status'] = true;
  $response['message'] = "User registered successfully!";
} else {
  $response['status'] = false;
  $response['message'] = "Registration failed: " . $conn->error;
}

echo json_encode($response);
?>
