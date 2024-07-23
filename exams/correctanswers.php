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
    if ($_GET['question_id']) {
        // Retrieve a specific answer by ID
        // Example: /answers?id=123

        // Get the answer ID from the query string
        $answerId = $_GET['question_id'];

        try {
            // Query the database to retrieve the answer with the specified ID
            $sql = "SELECT * FROM CorrectAnswers WHERE question_id = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$answerId]);
            $answer = $stmt->fetchAll();

            if ($answer) {
                // answer found, return it as a JSON response
                echo json_encode($answer);
            } else {
                http_response_code(404); // Not Found
                echo json_encode(['error' => 'answer not found']);
            }
        } catch (PDOException $e) {
            http_response_code(500); // Internal Server Error
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
    } else {
        // Retrieve all answers
        // Example: /answers

        try {
            // Query the database to retrieve all answers
            $sql = "SELECT * FROM CorrectAnswers";
            $stmt = $pdo->query($sql);
            $answers = $stmt->fetchAll();

            if ($answers) {
                // answers found, return them as a JSON response
                echo json_encode($answers);
            } else {
                http_response_code(404); // Not Found
                echo json_encode(['error' => 'No answers found']);
            }
        } catch (PDOException $e) {
            http_response_code(500); // Internal Server Error
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Handle POST requests (create a new answer)
    // Example: /answers

    // Parse the request body (assuming it's in JSON format)
    $requestData = json_decode(file_get_contents('php://input'), true);

    // Validate the request data
    if (!isset($requestData['question_id']) || !isset($requestData['answer_id'])) {
        http_response_code(400); // Bad Request
        echo json_encode(['error' => 'Missing required fields']);
        exit;
    }

    // Extract relevant data from the request
    $questionId = $requestData['question_id'];
    $answerId = $requestData['answer_id'];

    try {
        // Insert the new answer into the answers table
        $sql = "INSERT INTO CorrectAnswers (question_id, answer_id) VALUES (?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$questionId, $answerId]);
      
          // Get the last inserted ID (subject_id)
    echo json_encode(['success' => 'Coorect answer set succesfully']);
    } catch (PDOException $e) {
        http_response_code(500); // Internal Server Error
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Handle PUT requests (update a answer)
    // Example: /answers?id=123
    // Implement your logic here
    // ...
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Handle DELETE requests (delete a answer)
    // Example: /answers?id=123
    // Implement your logic here
    // ...
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => 'Invalid request method']);
}

// Close the database connection
$pdo = null;
?>
