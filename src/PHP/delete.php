<?php
// Error Reporting
error_reporting(E_ALL);
ini_set('display_errors', '1');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *"); 
header("Access-Control-Allow-Methods: *");

// Connect to the file dbConnect.php
require "database/dbConnect.php";
$objDB = new dbConnect;
$conn = $objDB->connect();

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
  case 'POST':
    $productSku = json_decode(file_get_contents('php://input'))->productSku;
    $placeholders = implode(',', array_fill(0, count($productSku), '?'));

    $stmt = $conn->prepare("DELETE FROM products WHERE sku IN ($placeholders)");
    $stmt->execute($productSku);
    $affectedRows = $stmt->rowCount();

    if ($affectedRows > 0) {
      $response = ['status' => 1, 'message' => 'Record(s) deleted successfully!'];
    } else {
      $response = ['status' => 0, 'message' => 'No records were deleted.'];
    }

    echo json_encode($response);
    break;
}
?>
