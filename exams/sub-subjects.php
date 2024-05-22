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
    if (isset($_GET['id'])) {
        // Retrieve a specific question by ID
        // Example: /questions?id=123

        // Get the question ID from the query string
        $questionId = $_GET['id'];
       echo json_encode($questionId);
       echo json_encode($subjectId);
        try {
          $sql = "SELECT * FROM subject_subsections WHERE id = :questionId AND subject_id = :subjectId";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(":questionId", $questionId, PDO::PARAM_INT);
        // Assuming you have a $subjectId variable defined elsewhere
        $stmt->bindParam(":subjectId", $subjectId, PDO::PARAM_INT);
        $stmt->execute();
        $question = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($question) {
            // Question found, return it as a JSON response
                // Question found, return it as a JSON response
                echo json_encode($question);
            } else {
                http_response_code(404); // Not Found
                echo json_encode(['error' => 'Sub Section not found']);
            }
        } catch (PDOException $e) {
            http_response_code(500); // Internal Server Error
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
    } else {
        // Retrieve all questions
        // Example: /questions
           
        try {
           $sql = "SELECT * FROM subject_subsections WHERE subject_id = :subjectId";
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

 // Extract relevant data from the request
    $subjectId = $requestData['subject_id'];
    $subsectionName = $requestData['subsection_name'];
    $subsectionDescription = $requestData['subsection_description'];
  
    // Validate the request data
    if ($subjectId === null || $subsectionName === null ) {
        http_response_code(400); // Bad Request
        echo json_encode(['error' => 'Missing subsection Name or subsection Description ']);
        exit;
    }

   
    // ... (handle image data if applicable)

    try {
        // Insert the new question into the Questions table
        $sql = "INSERT INTO subject_subsections (subject_id, subsection_name, subsection_description) VALUES (?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$subjectId, $subsectionName, $subsectionDescription]);
        
         $question_id = $pdo->lastInsertId();
          // Get the last inserted ID (subject_id)
          http_response_code(201);
    echo json_encode(['id' => $question_id]);
    } catch (PDOException $e) {
        http_response_code(500); // Internal Server Error
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $requestData = json_decode(file_get_contents('php://input'), true);
    $subjectId = $requestData['subject_id'];
    $subsectionName = $requestData['subsection_name'];
    $subsectionDescription = $requestData['subsection_description'];
    $subId =$_GET['id'];

    // Validate the request data
    if ($subId === null || $subjectId === null || $subsectionName === null ) {
        http_response_code(400); // Bad Request
        echo json_encode(['error' => 'Missing subsection id or  subsection Name or subsection Description ']);
        exit;
    }

    // Extract relevant data from the request
    
  
   try {
    $sql = "UPDATE `subject_subsections`
            SET `subsection_name` = ?, `subsection_description` = ? 
            WHERE `subject_id` = ? AND `id` = ?";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$subsectionName, $subsectionDescription, $subjectId, $subId]);
    
    echo json_encode(['message' => 'Sub Section updated successfully']);
} catch (PDOException $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}

    // ...
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
     $allowedDomains = ['https://amigos-quiz-app.vercel.app', 'http://localhost'];
$clientOrigin = $_SERVER['HTTP_ORIGIN'];
error_log(" user with id $userid logged in time : $currentTime ,  \n ",3,'logs/trends');
if (in_array($clientOrigin, $allowedDomains)) {
    header('Access-Control-Allow-Origin: ' . $clientOrigin);
}
header('Access-Control-Allow-Methods: GET, POST,PUT,DELETE');
header('Access-Control-Allow-Headers: Content-Type');
     $questionId = $_GET['id'];
      if (!$questionId) {
        http_response_code(400); // Bad Request
        echo json_encode(['error' => 'Missing required fields']);
        exit;
    }
     
   try {
    $sql = "DELETE FROM `subject_subsections` WHERE `id`=?";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$questionId]);
    http_response_code(204);
    echo json_encode(['message' => 'Subsection deleted successfully']);
} catch (PDOException $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
    
}elseif ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
     $allowedDomains = ['https://amigos-quiz-app.vercel.app', 'http://localhost'];
$clientOrigin = $_SERVER['HTTP_ORIGIN'];
    // Handle OPTIONS request (e.g., CORS preflight)
    // Set appropriate headers for CORS
    header('Access-Control-Allow-Origin: ' . $clientOrigin);
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(200); // OK response for OPTIONS
    exit;
}
else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => 'Invalid request method']);
}

// Close the database connection
$pdo = null;
?>
