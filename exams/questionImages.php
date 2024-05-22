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
     $question_id = $_GET['question_id'];
     
      if($question_id === null){
                 http_response_code(400); // Bad Request
               echo json_encode(['error' => 'question_id is  required fields']);
               exit;
            }

    if ($question_id !== null) {
       
        try {
          $sql = "SELECT image_id, question_id,image_data FROM QuestionImages WHERE question_id = :questionId";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(":questionId", $question_id, PDO::PARAM_INT);
        $stmt->execute();
        $questions = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($questions) {
             /* // Questions found, return them as a JSON response
                foreach ($questions as $key => $question) {
            if ($question['image_data'] !== null) {
                $questions[$key]['image_data'] = base64_encode($question['image_data']);
            }
                }*/
                echo json_encode($questions);
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
       $question_id = $_GET['question_id'];
       $imageData = $requestData['image_data'];

    // Validate the request data
    if ($question_id === null || $imageData === null) {
        http_response_code(400); // Bad Request
        echo json_encode(['error' => ' question_id and image_data are required fileld']);
        exit;
    }
    
    // ... (handle image data if applicable)

    try {
        // Insert the new question into the Questions table
        $sql = "INSERT INTO QuestionImages (question_id, image_data) VALUES (?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$question_id, $imageData]);
        
         $question_id = $pdo->lastInsertId();
          // Get the last inserted ID (subject_id)
          http_response_code(201);
    echo json_encode(['image_id' => $question_id]);
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
