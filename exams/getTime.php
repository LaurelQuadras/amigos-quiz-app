<?php
// Set the response content type to JSON
header('Content-Type: application/json');
// Set CORS headers to allow requests from any origin

$allowedDomains = ['https://amigos-quiz-app.vercel.app', 'http://localhost'];
$clientOrigin = $_SERVER['HTTP_ORIGIN'];

if (in_array($clientOrigin, $allowedDomains)) {
    header('Access-Control-Allow-Origin: ' . $clientOrigin);
}
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the current timestamp
    $currentTime = date('Y-m-d H:i:s');

    // Create an associative array with the timestamp
    $response = [
        'Time return from gamewithcolors' => $currentTime,
    ];

    // Encode the array as JSON and print it
    echo json_encode($response);
} else {
    // Handle other HTTP methods (e.g., GET, PUT, DELETE)
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => 'Only POST requests are allowed.']);
}
?>
