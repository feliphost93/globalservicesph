<?php
// Initialize response array
$response = array(
    'success' => false,
    'message' => ''
);

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validate form data
    if (
        isset($_POST['nombre']) && !empty($_POST['nombre']) &&
        isset($_POST['email']) && !empty($_POST['email']) &&
        isset($_POST['asunto']) && !empty($_POST['asunto']) &&
        isset($_POST['mensaje']) && !empty($_POST['mensaje'])
    ) {
        // Get form data and sanitize inputs
        $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
        $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
        $asunto = filter_var($_POST['asunto'], FILTER_SANITIZE_STRING);
        $mensaje = filter_var($_POST['mensaje'], FILTER_SANITIZE_STRING);
        
        // Validate email
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $response['message'] = 'Por favor ingrese un correo electrónico válido.';
            echo json_encode($response);
            exit;
        }
        
        // Set recipient email (Change this to your email address)
        $para = 'felipeesquivel993@gmail.com';
        
        // Email headers
        $headers = "From: $nombre <$email>" . "\r\n";
        $headers .= "Reply-To: $email" . "\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
        $headers .= "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
               
        // Send email
        $enviado = @mail($para, "Nuevo contacto: $asunto",  $mensaje, $headers);
        
        // Check if email was sent successfully
        if ($enviado) {
            $response['success'] = true;
            $response['message'] = '¡Gracias! Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo lo antes posible.';
        } else {
            $response['message'] = 'Lo sentimos, ha ocurrido un error al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.';
            
            // Log the error (optional)
            error_log("Error al enviar correo: " . error_get_last()['message']);
        }
    } else {
        $response['message'] = 'Por favor, completa todos los campos del formulario.';
    }
} else {
    $response['message'] = 'Método de solicitud no válido.';
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>
