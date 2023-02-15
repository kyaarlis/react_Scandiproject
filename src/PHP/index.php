<?php
// Error Reporting
error_reporting(E_ALL);
ini_set('display_errors', '1');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *"); 
header("Access-Control-Allow-Methods: DELETE");;
?>

<?php
//  Parses data from the form to put into the products database

// Connect to the file dbConnect.php
require "database/dbConnect.php";
$objDB = new dbConnect;
$conn = $objDB->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
        $sql = "SELECT * FROM products";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $form = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($form);
        break; 

    case 'POST':
        $form = json_decode( file_get_contents('php://input') );
        $sql = "INSERT INTO products(sku, name, price, size, height, width, length, weight) 
        VALUES(:sku, :name, :price, :size, :height, :width, :length, :weight)";
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
            $response = ['status' => 0, 'message' => 'Failed to creaet record:('];
        }
        break;

    case 'DELETE':
        $sql = "DELETE FROM products WHERE sku = :sku";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':sku', $path[3]);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully!'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record:('];
        }
        echo json_encode($response);
        break;
}



// Parse form Data and add inventory to database

// if(isset($_POST['sku'])){

//     $sku = mysqli_real_escape_string($con, $_POST['sku']);
//     $name = mysqli_real_escape_string($con, $_POST['name']);
//     $price = mysqli_real_escape_string($con, $_POST['price']);
//     $productType = mysqli_real_escape_string($con, $_POST['productType']);
//     $size = mysqli_real_escape_string($con, $_POST['size']);
//     $height = mysqli_real_escape_string($con, $_POST['height']);
//     $width = mysqli_real_escape_string($con, $_POST['width']);
//     $weight = mysqli_real_escape_string($con, $_POST['weight']);
//     $length = mysqli_real_escape_string($con, $_POST['length']);

//     //see if there is a duplicate sku in the database already

//     $sql = mysqli_query($con, "SELECT sku FROM products WHERE sku='$sku'LIMIT 1");

//     // count the output amount, if there's an sku match then the below value will be 1

//     $skuMatch = mysqli_num_rows($con, "SELECT sku FROM products WHERE sku='$sku'LIMIT 1");

//     if($skuMatch > 0){
//         echo 'Sorry you tried to place a product in the database with an sku that already exists, 
//         please view the inventory <a href="http://localhost:3000/">Return to Inventory </a>';

//         exit();
//     }

//     // Otherwise, add this product into the products database
//     $sql = mysqli_query($con, "INSERT INTO products(sku, name, price, productType, size, height, width, length, weight) 
//     VALUES('$sku', '$name', '$price', '$productType', '$size', '$height', '$width', '$length', '$weight')") or die(mysqli_error($con));
// }
?>

<?php
//  Grabs all the children of MProductList into an array

//including the main php that 
// include_once 'productClasses/MProductList.php'; // Where my main class is that the below php files are extending
// include_once 'productClasses/Book.php';
// include_once 'productClasses/DVD.php';
// include_once 'productClasses/Furniture.php';

// /*
// for each declared class that is a subclass of MProductList, add that class to the children array that is declared above it.
// */

// $children = array();

// foreach(get_declared_classes() as $class ){
//     if(is_subclass_of( $class, 'MProductList' )){
//     $children[] = $class;
//     }
// }
?>

 <?php 

// // this php block Deletes items when Mass Delete button is clicked

// if(isset($_POST["please_delete"])){
    
//     if(isset($_POST['delete'])){
//         foreach($_POST['delete'] as $SKU){
            
//              $con->query("DELETE FROM products WHERE sku='".$SKU."'");
          
//         }
//     }
// }

?>

            
<?php     
// $ascorder = "SELECT * FROM products ORDER BY name ASC";
// $stmt = $conn->prepare($ascorder);
// $stmt->execute();
// $sql = $stmt->fetchAll();

// $productCount = $stmt->rowCount();

// if ($productCount > 0) {
//   foreach ($sql as $row) {
//     $key = array_search($row['productType'], $children);
//     $ourNewProduct = new $children[$key]();
//     $ourNewProduct->setValues($row['sku'], $row['name'], $row['price'], $row['size'], $row['height'], $row['width'], $row['length'], $row['weight']);
//     echo $ourNewProduct->getInfo();
//   }
// }

    // //to now go through the array
            
    // $ascorder = "SELECT * FROM products ORDER BY name ASC";
    // $sql = mysqli_query($con, $ascorder);
            
    // $productCount = mysqli_num_rows($sql);
            
    // /*
    // $children = declared above as holding all classes that are extending main class MProductLis
    // All class names are the exact same name of the productType
    // ourNewProduct -> holds my new instance of my class as it is invoked.

    // Setting Values -> My setter. I am setting the values from my $row - sku, name, price, size, height, width, length, weight

    // echo -> getInfo() My getter. It utilizes the values set in the setValues and each product displays its respective data.
    // */
            
    // if($productCount > 0){
                            
    // while($row = mysqli_fetch_object($sql)){
                                    
    // $key= array_search("$row->productType",$children);
    // $ourNewProduct = new $children[$key]();
    // $ourNewProduct->setValues("$row->sku","$row->name", "$row->price","$row->size", "$row->height", 
    // "$row->width", "$row->length", "$row->weight");
    // echo $ourNewProduct->getInfo();
    //     }            
    // }      
    ?>
            
                