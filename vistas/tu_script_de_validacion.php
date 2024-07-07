<?php
// Tu clave secreta de reCAPTCHA
$secret = '6Ldh7wkqAAAAAIcGeZBR13dpsry3KyRmPkol2LI4';

// La respuesta de reCAPTCHA enviada por el formulario
$response = $_POST['g-recaptcha-response'];

// La IP del usuario
$remoteip = $_SERVER['REMOTE_ADDR'];

// Enviar solicitud a la API de reCAPTCHA de Google
$url = 'https://www.google.com/recaptcha/api/siteverify';
$data = [
    'secret' => $secret,
    'response' => $response,
    'remoteip' => $remoteip
];

$options = [
    'http' => [
        'method' => 'POST',
        'header' => 'Content-Type: application/x-www-form-urlencoded',
        'content' => http_build_query($data)
    ]
];

$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);
$resultJson = json_decode($result);

// Verificar la respuesta
if ($resultJson->success != true) {
    echo 'reCAPTCHA validation failed. Please try again.';
} else {
    // Validación exitosa. Proceder con la autenticación del usuario
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    // Aquí puedes realizar la validación del usuario (ej. comprobar en la base de datos)
    // Ejemplo de autenticación simple:
    if ($username === 'usuario_valido' && $password === 'contraseña_valida') {
        echo 'success';
    } else {
        echo 'Credenciales inválidas';
    }
}
?>
