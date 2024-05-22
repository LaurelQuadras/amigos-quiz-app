<?php
header('Content-Type: application/json');

require_once 'db_config.php';

class SubjectsAPI {
    private $pdo = null;
    private $stmt = null;

    function __construct() {
        $this->pdo = new PDO(
            "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET,
            DB_USER,
            DB_PASSWORD,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ]
        );
    }

    function __destruct() {
        if ($this->stmt !== null) {
            $this->stmt = null;
        }
        if ($this->pdo !== null) {
            $this->pdo = null;
        }
    }

    function query($sql, $data): void {
        $this->stmt = $this->pdo->prepare($sql);
        $this->stmt->execute($data);
    }

    // Read (GET)
    function getSubjects($search_name,$search_user) {
/*        header('Content-Type: application/json');
// Set CORS headers to allow requests from any origin

$allowedDomains = ['https://amigos-quiz-app.vercel.app', 'http://localhost'];
$clientOrigin = $_SERVER['HTTP_ORIGIN'];

if (in_array($clientOrigin, $allowedDomains)) {
    header('Access-Control-Allow-Origin: ' . $clientOrigin);
}
header('Access-Control-Allow-Methods: GET,PUT,DELETE');
header('Access-Control-Allow-Headers: Content-Type');*/
        try {
            if($search_user === null){
                 http_response_code(400); // Bad Request
               echo json_encode(['error' => 'user is  required fields']);
               exit;
            }
            if ($search_name !== null) {
                $this->query("SELECT Subjects.subject_id, Subjects.subject_name, Subjects.subject_description,
       Subjects.authority, Subjects.tutor_user_id, Subjects.create_time,subject_subsections.id as subsectionID,
       subject_subsections.subsection_name, subject_subsections.subsection_description
FROM Subjects
LEFT JOIN subject_subsections ON Subjects.subject_id = subject_subsections.subject_id

WHERE tutor_user_id = ? AND subject_name LIKE ?", [$search_user,"%$search_name%"]);
            } else {
                $this->query("SELECT Subjects.subject_id, Subjects.subject_name, Subjects.subject_description,
       Subjects.authority, Subjects.tutor_user_id, Subjects.create_time,subject_subsections.id as subsectionID,
       subject_subsections.subsection_name, subject_subsections.subsection_description
FROM Subjects
LEFT JOIN subject_subsections ON Subjects.subject_id = subject_subsections.subject_id WHERE tutor_user_id = ? ", [$search_user]);
            }
            $subjects = $this->stmt->fetchAll();
            if (empty($subjects)) {
                http_response_code(404); // Not Found
                echo json_encode(['error' => 'No subjects found']);
            } else {
                echo json_encode($subjects);
            }
        } catch (PDOException $e) {
            http_response_code(500); // Internal Server Error
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
    }

    // Create (POST)
    function addSubject($subject_name, $subject_description,$subject_section,$user,$authority,$topicName,$topicDesc,$subject_id) {
         
        try {
        if($subject_description !== null && $subject_name !==null){
           $this->query("INSERT INTO `Subjects` (`subject_name`, `subject_description`,`tutors_users_id`,`authority`) VALUES (?, ?,?,?)", [$subject_name, $subject_description,$user,$authority]);
           $subject_id = $this->pdo->lastInsertId();
           echo json_encode(['subject_id' => $subject_id]);
        }
          
        } catch (PDOException $e) {
            http_response_code(500); // Internal Server Error
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
    }

    // Update (PUT)
    function updateSubject($subject_id, $subject_name,$subject_description,$user) {
          header("Access-Control-Allow-Origin: *");
            header("Access-Control-Allow-Methods: PUT"); // A
        try {
            $this->query("UPDATE `Subjects` SET `subject_name`=?,`subject_description`=? WHERE `subject_id`=?", [$subject_name,$subject_description, $subject_id]);
            echo json_encode(['message' => 'Subject updated successfully']);
        } catch (PDOException $e) {
            http_response_code(500); // Internal Server Error
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
    }

    // Delete (DELETE)
    function deleteSubject($subject_id) {
          header("Access-Control-Allow-Origin: *");
            header("Access-Control-Allow-Methods: DELETE"); // A
        try {
            $this->query("DELETE FROM `Subjects` WHERE `subject_id`=?", [$subject_id]);
            echo json_encode(['message' => 'Subject deleted successfully']);
        } catch (PDOException $e) {
            http_response_code(500); // Internal Server Error
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
    }
}

// Usage example:
$subjectsAPI = new SubjectsAPI();


// Handle API requests based on HTTP method
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Content-Type: application/json');
// Set CORS headers to allow requests from any origin
$allowedDomains = ['https://amigos-quiz-app.vercel.app', 'http://localhost'];
$clientOrigin = $_SERVER['HTTP_ORIGIN'];
    // Handle OPTIONS request (e.g., CORS preflight)
    // Set appropriate headers for CORS
    header('Access-Control-Allow-Origin: ' . $clientOrigin);
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header('Access-Control-Allow-Headers: Content-Type');

    $search_name = isset($_GET['name']) ? $_GET['name'] : null;
    $search_user = isset($_GET['user']) ? $_GET['user'] : null;
    $subjectsAPI->getSubjects($search_name,$search_user);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
     $input = json_decode(file_get_contents("php://input"), true);
$allowedDomains = ['https://amigos-quiz-app.vercel.app', 'http://localhost'];
$clientOrigin = $_SERVER['HTTP_ORIGIN'];
    // Handle OPTIONS request (e.g., CORS preflight)
    // Set appropriate headers for CORS
    header('Access-Control-Allow-Origin: ' . $clientOrigin);
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header('Access-Control-Allow-Headers: Content-Type');
    $subject_name = $input['subject_name'];
    $subject_description = $input['subject_description'];
    $user = $input['user'];
    $authority= $input['authority'];
    $topicName= $_GET['topic_name'];
    $topicDesc= $input['topic_descripton'];
    $subject_id= $input['subject_id'];
 
    // Validate input (ensure required fields are present)
    if ($topicName === null && (!isset($subject_name )|| !isset($user))) {
        http_response_code(400); // Bad Request
        echo json_encode(['error' => 'subject_name and user are  required fields']);
        exit;
    }
     if ($topicName !== null && ($topicDesc ===null|| $subject_id === null)) {
        http_response_code(400); // Bad Request
        echo json_encode(['error' => 'Subjetcts Subsection Description and subject id is Mandatory, or Delete Subsection']);
        exit;
    }

    // Call the addSubject method
   

    $subjectsAPI->addSubject($subject_name, $subject_description,$subject_section,$user,$authority,$topicName,$topicDesc,$subject_id);

} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
  
     // Parse request data
    $input = json_decode(file_get_contents("php://input"), true);

    // Validate input (ensure required fields are present)
if (!isset($_GET['id']) ||
(!isset($input['subject_name']) && !isset($input['subject_description']))) 
{        http_response_code(400); // Bad Request
        echo json_encode(['error' => 'Missing required fields ',$input['id'],$input['subject_name'],$input['subject_description']]);
        exit;
    }

    // Call the updateSubject method
    $subject_id = $_GET['id'];
    $subject_name = $input['subject_name'];
    $subject_description = $input['subject_description'];
    $user=$input['turtor_user'];

    $subjectsAPI->updateSubject($subject_id, $subject_name, $subject_description,$user);
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $allowedDomains = ['https://amigos-quiz-app.vercel.app', 'http://localhost'];
$clientOrigin = $_SERVER['HTTP_ORIGIN'];
error_log(" user with id $userid logged in time : $currentTime ,  \n ",3,'logs/trends');
if (in_array($clientOrigin, $allowedDomains)) {
    header('Access-Control-Allow-Origin: ' . $clientOrigin);
}
header('Access-Control-Allow-Methods: GET, POST,PUT,DELETE');
header('Access-Control-Allow-Headers: Content-Type');
      $subject_id = $_GET['id'];
      echo $subject_id;
     if (!isset($subject_id) ) {
        http_response_code(400); // Bad Request
        echo json_encode(['error' => 'Missing required fields in Delete']);
        exit;
    }
   
     $subjectsAPI->deleteSubject($subject_id);
} elseif ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
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
?>
