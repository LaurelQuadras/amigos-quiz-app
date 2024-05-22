<?php
// questions_api.php
error_reporting(E_ALL);
ini_set('display_errors', 'On');

// Include your database configuration
require_once 'db_config.php';

// Set headers for CORS (Cross-Origin Resource Sharing)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

// Initialize the database connection
try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASSWORD,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
    );
} catch (PDOException $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Database connection error: ' . $e->getMessage()]);
    exit;
}

// Define API endpoints
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
     $userName = $_GET['user_name'];
     
      if($userName === null){
                 http_response_code(400); // Bad Request
               echo json_encode(['error' => 'user name is  required fields']);
               exit;
            }

    if ($userName !== null) {
       
        try {
          $sql = "SELECT id, username, role from tutors_users WHERE username = :userName";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(":userName", $userName, PDO::PARAM_INT);
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($users) {
              // Questions found, return them as a JSON response
              
                echo json_encode($users);
            } else {
                http_response_code(404); // Not Found
                echo json_encode(['error' => 'QuestionImages not found']);
            }
        } catch (PDOException $e) {
            http_response_code(500); // Internal Server Error
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Handle POST requests (create a new question)
    // Example: /questions

    // Parse the request body (assuming it's in JSON format)
    $requestData = json_decode(file_get_contents('php://input'), true);
       $userName = $requestData['user_name'];
       $password = $requestData['pass'];
       $role = $requestData['role'];
      
    // Validate the request data
    if ($userName === null || $password === null || $role == null) {
        http_response_code(400); // Bad Request
        echo json_encode(['error' => ' user_name , pass and role  are required fileld']);
        exit;
    }
    
    // ... (handle image data if applicable)

    try {
       $password = password_hash($password, PASSWORD_BCRYPT);
        // Insert the new question into the Questions table
        $sql = "INSERT INTO tutors_users (username,password,role) VALUES (?, ?,?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$userName, $password,$role]);
        
         $userName = $pdo->lastInsertId();
          // Get the last inserted ID (subject_id)
          http_response_code(201);
    echo json_encode(['user id' => $userName]);
    } catch (PDOException $e) {
        http_response_code(500); // Internal Server Error
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
   $requestData = json_decode(file_get_contents('php://input'), true);
       $imageData = $requestData['image_data'];
       $id = $_GET['id'];

   // Validate the request data
    if ($id === null ) {
        http_response_code(400); // Bad Request
        echo json_encode(['error' => ' question_id is required fileld']);
        exit;
    }

    // Extract relevant data from the request
    
  
   try {
    $sql = "UPDATE `QuestionImages`
            SET `image_data` = ? WHERE `image_id` = ?";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$imageData, $id]);
    
    echo json_encode(['message' => 'Question Images updated successfully']);
} catch (PDOException $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}

    // ...
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
         $id = $_GET['id'];

   // Validate the request data
    if ($id === null ) {
        http_response_code(400); // Bad Request
        echo json_encode(['error' => ' question_id is required fileld']);
        exit;
    }
     
   try {
    $sql = "DELETE FROM `QuestionImages` WHERE `image_id`=?";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$id]);
    http_response_code(204);
    echo json_encode(['message' => 'Question Image deleted successfully']);
} catch (PDOException $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
    
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => 'Invalid request method']);
}

// Close the database connection
$pdo = null;
?>
