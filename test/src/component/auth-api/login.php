<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include "db.php";

$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$password = $data->password;

$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

$response = [];

if ($result->num_rows > 0) {
  $user = $result->fetch_assoc();
  if (password_verify($password, $user['password'])) {
    $response['status'] = true;
    $response['message'] = "Login successful!";
    $response['user'] = [
      "id" => $user['id'],
      "name" => $user['name'],
      "email" => $user['email']
    ];
  } else {
    $response['status'] = false;
    $response['message'] = "Invalid password";
  }
} else {
  $response['status'] = false;
  $response['message'] = "User not found";
}

echo json_encode($response);
?>
