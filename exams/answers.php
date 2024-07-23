<?php
// answers_api.php

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
    // Handle GET requests
    // Handle GET requests
     $questionId = $_GET['question_id'];
      if($questionId === null){
                 http_response_code(400); // Bad Request
               echo json_encode(['error' => 'question_id is  required fields']);
               exit;
            }
    if ($questionId) {

        try {
            // Query the database to retrieve the answer with the specified ID
            $sql = "SELECT A.answer_id,	A.question_id,	A.answer_text FROM Answers A WHERE A.question_id = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$questionId]);
            $answers = $stmt->fetchAll();

            if ($answers) {
         
                echo json_encode($answers);
            } else {
                http_response_code(404); // Not Found
                echo json_encode(['error' => 'answer not found']);
            }
        } catch (PDOException $e) {
            http_response_code(500); // Internal Server Error
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
       
    $requestData = json_decode(file_get_contents('php://input'), true);

    // Validate the request data
    if (!isset($requestData['question_id']) || !isset($requestData['answer_text'])) {
        http_response_code(400); // Bad Request
        echo json_encode(['error' => 'Missing required fields']);
        exit;
    }

    // Extract relevant data from the request
    $questionId = $requestData['question_id'];
    $answerText = $requestData['answer_text'];

    try {
        // Insert the new answer into the answers table
        $sql = "INSERT INTO Answers (question_id, answer_text) VALUES (?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$questionId, $answerText]);
       $answer_id = $pdo->lastInsertId();
        http_response_code(201);
          // Get the last inserted ID (subject_id)
    echo json_encode(['answer_id' => $answer_id, 'answerText' => $answerText]);
    } catch (PDOException $e) {
        http_response_code(500); // Internal Server Error
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
     $requestData = json_decode(file_get_contents('php://input'), true);
     $answerId = $_GET['id'];
     $anserText = $requestData['answer_text'];
      if (!isset($anserText) || !$answerId) {
        http_response_code(400); // Bad Request
        echo json_encode(['error' => 'Missing required fields']);
        exit;
    }
       try {
    $sql = "UPDATE `Answers`
            SET `answer_text` = ?
            WHERE `answer_id` = ? ";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$anserText, $answerId]);
     http_response_code(200);
    echo json_encode(['message' => 'Answer updated successfully']);
} catch (PDOException $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
    
    // ...
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
   $answerId = $_GET['id'];
    if (!$answerId) {
        http_response_code(400); // Bad Request
        echo json_encode(['error' => 'Missing required fields']);
        exit;
    }
    
         try {
   $sql="DELETE FROM `Answers` WHERE `answer_id`=?";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$answerId]);
     http_response_code(204);
     
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
