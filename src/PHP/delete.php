<?php
// Error Reporting
error_reporting(E_ALL);
ini_set('display_errors', '1');

// Set headers to allow cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *"); 
header("Access-Control-Allow-Methods: *");

// Connect to the database using dbConnect.php
require "database/dbConnect.php";
$objDB = new dbConnect;
$conn = $objDB->connect();

// Get the request method (e.g. POST, GET, PUT, DELETE)
$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
  case 'POST':
    // Get the array of product SKUs to delete from the JSON-encoded request body
    $productSku = json_decode(file_get_contents('php://input'))->productSku;

    // Create placeholders for the array of SKUs to delete in the SQL query
    $placeholders = implode(',', array_fill(0, count($productSku), '?'));

    // Prepare and execute the SQL query to delete products with SKUs in the array
    $stmt = $conn->prepare("DELETE FROM products WHERE sku IN ($placeholders)");
    $stmt->execute($productSku);

    // Get the number of affected rows from the SQL query
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
