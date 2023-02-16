<?php
// Error Reporting
error_reporting(E_ALL); 
ini_set('display_errors', '1');
header("Access-Control-Allow-Origin: *"); // allow cross-origin resource sharing (CORS)
header("Access-Control-Allow-Headers: *"); // allow all headers to be sent in the request
header("Access-Control-Allow-Methods: *"); // allow all HTTP methods to be used

// Connect to the database
require "database/dbConnect.php";
$objDB = new dbConnect; // create a new instance of the dbConnect class
$conn = $objDB->connect(); 

$method = $_SERVER['REQUEST_METHOD']; // get the HTTP request method (GET, POST, etc.)

switch ($method) {
    case "GET":
        $sql = "SELECT * FROM products"; 
        $stmt = $conn->prepare($sql);
        $stmt->execute(); // execute the query
        $form = $stmt->fetchAll(PDO::FETCH_ASSOC); // fetch all rows as an associative array
        echo json_encode($form); // return the products in JSON format
        break; 

    case 'POST':
        $form = json_decode(file_get_contents('php://input')); // get the product data from the request body
        $sql = "INSERT INTO products (sku, name, price, size, height, width, length, weight) 
                VALUES (:sku, :name, :price, :size, :height, :width, :length, :weight)"; // SQL query to insert a new product

        $stmt = $conn->prepare($sql); 
        $stmt->bindParam(':sku', $form->sku);
        $stmt->bindParam(':name', $form->name); 
        $stmt->bindParam(':price', $form->price); 
        $stmt->bindParam(':size', $form->size);
        $stmt->bindParam(':height', $form->height);
        $stmt->bindParam(':width', $form->width); 
        $stmt->bindParam(':length', $form->length); 
        $stmt->bindParam(':weight', $form->weight); 

        if ($stmt->execute()) { 
            $response = ['status' => 1, 'message' => 'Record saved successfully!'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record:('];
        }
        echo json_encode($response);
        break;
}     
?>
