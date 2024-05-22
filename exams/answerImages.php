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
     $answerId = $_GET['answer_id'];
      if($answerId === null){
                 http_response_code(400); // Bad Request
               echo json_encode(['error' => 'answer_id is  required fields']);
               exit;
            }

    if ($answerId !== null) {
       
        try {
          $sql = "SELECT * FROM AnswerImages WHERE answer_id = :answerId";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(":answerId", $answerId, PDO::PARAM_INT);
     
        $stmt->execute();
        $answers = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($answers) {
              foreach ($answers as $key => $answer) {
            if ($answer['image_data'] !== null) {
                $answers[$key]['image_data'] = base64_encode($question['image_data']);
            }
                }
            
                echo json_encode($answers);
            } else {
                http_response_code(404); // Not Found
                echo json_encode(['error' => 'AnswerImages not found']);
            }
        } catch (PDOException $e) {
            http_response_code(500); // Internal Server Error
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
       
    $requestData = json_decode(file_get_contents('php://input'), true);
       $answer_id = $requestData['answer_id'];
       $imageData = $requestData['image_data'];

    // Validate the request data
    if ($answer_id === null || $imageData === null) {
        http_response_code(400); // Bad Request
        echo json_encode(['error' => ' answer_id and image_data are required fileld']);
        exit;
    }
   
    try {
        // Insert the new question into the Questions table
        $sql = "INSERT INTO AnswerImages (answer_id, image_data) VALUES (?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$answer_id, $imageData]);
        
         $answer_id = $pdo->lastInsertId();
          // Get the last inserted ID (subject_id)
          http_response_code(201);
    echo json_encode(['image_id' => $answer_id]);
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
        echo json_encode(['error' => ' answer_id is required fileld']);
        exit;
    }

    // Extract relevant data from the request
    
  
   try {
    $sql = "UPDATE `AnswerImages`
            SET `image_data` = ? WHERE `image_id` = ?";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$imageData, $id]);
    
    echo json_encode(['message' => 'Answer Images updated successfully']);
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
        echo json_encode(['error' => ' answer_id is required fileld']);
        exit;
    }
     
   try {
    $sql = "DELETE FROM `AnswerImages` WHERE `image_id`=?";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$id]);
    http_response_code(204);
    echo json_encode(['message' => 'Answer Image deleted successfully']);
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
