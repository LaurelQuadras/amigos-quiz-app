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
     $subjectId = $_GET['subject_id'];
      if($subjectId === null){
                 http_response_code(400); // Bad Request
               echo json_encode(['error' => 'subject_id is  required fields']);
               exit;
            }

    // Handle GET requests
    // Handle GET requests
    if (isset($_GET['question_id'])) {
        // Retrieve a specific question by ID
        // Example: /questions?id=123

        // Get the question ID from the query string
        $questionId = $_GET['question_id'];
    
        try {
          $sql = "SELECT Q.question_id, Q.subject_id, Q.question_text, Q.question_type, Q.authority, Q.level
       
FROM Questions Q WHERE Q.question_id = :questionId AND Q.subject_id = :subjectId ";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(":questionId", $questionId, PDO::PARAM_INT);
        // Assuming you have a $subjectId variable defined elsewhere
        $stmt->bindParam(":subjectId", $subjectId, PDO::PARAM_INT);
        $stmt->execute();
        $questions = $stmt->fetchAll(PDO::FETCH_ASSOC);
          if ($questions) {
                 echo json_encode($questions);
            } else {
                http_response_code(404); // Not Found
                echo json_encode(['error' => 'Question not found']);
            }
        } catch (PDOException $e) {
            http_response_code(500); // Internal Server Error
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
    } else {
        
           
        try {
           $sql = "SELECT Q.question_id,Q.subject_id , Q.question_text, Q.question_type, Q.authority, Q.level FROM Questions Q WHERE Q.subject_id = :subjectId";
$stmt = $pdo->prepare($sql);

// Bind the parameter
$stmt->bindParam(":subjectId", $subjectId, PDO::PARAM_INT);

// Execute the query
$stmt->execute();

// Fetch the results (customize this part based on your needs)
$questions = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if ($questions) {
               echo json_encode($questions);
            } else {
                http_response_code(404); // Not Found
                echo json_encode(['error' => 'No questions found']);
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

    // Validate the request data
    if (!isset($requestData['subject_id']) || !isset($requestData['question_text']) || !isset($requestData['question_type'])) {
        http_response_code(400); // Bad Request
        echo json_encode(['error' => 'Missing required fields']);
        exit;
    }

    // Extract relevant data from the request
    $subjectId = $requestData['subject_id'];
    $questionText = $requestData['question_text'];
    $questionType = $requestData['question_type'];
    $authority = $requestData['authority'];
    $level = $requestData['level'];
    
    // ... (handle image data if applicable)

    try {
        // Insert the new question into the Questions table
        $sql = "INSERT INTO Questions (subject_id, question_text, question_type,authority,level) VALUES (?, ?, ?,?,?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$subjectId, $questionText, $questionType,$authority,$level]);
        
         $question_id = $pdo->lastInsertId();
          // Get the last inserted ID (subject_id)
          http_response_code(201);
    echo json_encode(['question_id' => $question_id]);
    } catch (PDOException $e) {
        http_response_code(500); // Internal Server Error
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $requestData = json_decode(file_get_contents('php://input'), true);
    $subjectId = $requestData['subject_id'];
    $questionText = $requestData['question_text'];
    $questionId = $_GET['id'];
    $questionType = $requestData['question_type'];
    $authority = $requestData['authority'];
    $level = $requestData['level'];
     $image = $requestData['image_data'];

    // Validate the request data
    if (!isset($requestData['subject_id']) || !$questionId) {
        http_response_code(400); // Bad Request
        echo json_encode(['error' => 'Missing required fields']);
        exit;
    }

    // Extract relevant data from the request
    
  
   try {
    $sql = "UPDATE `Questions`
            SET `question_text` = ?, `question_type` = ?, `authority` = ?, `level` = ?, `image_data` = ?
            WHERE `subject_id` = ? AND `question_id` = ?";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$questionText, $questionType, $authority, $level, $image, $subjectId, $questionId]);
    
    echo json_encode(['message' => 'Question updated successfully']);
} catch (PDOException $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}

    // ...
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
     $questionId = $_GET['id'];
      if (!$questionId) {
        http_response_code(400); // Bad Request
        echo json_encode(['error' => 'Missing required fields']);
        exit;
    }
     
   try {
    $sql = "DELETE FROM `Questions` WHERE `question_id`=?";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$questionId]);
    http_response_code(204);
    echo json_encode(['message' => 'Question deleted successfully']);
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
