<?php 

$footerName = $_POST['footerName'];
$footerPhone = $_POST['footerPhone'];
$footerAsk = $_POST['footerAsk'];

// Load Composer's autoloader
require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
    //Server settings
    $mail->SMTPDebug = 0;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'webstmails@gmail.com';                     // SMTP username
    $mail->Password   = 'N88l8x^N@x';                               // SMTP password
    $mail->SMTPSecure = 'ssl';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 465;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

    //Recipients
    $mail->setFrom('webstmails@gmail.com', 'Stanislav');
    $mail->addAddress('stanislav.iushkevich@gmail.com');     // Add a recipient

    // Content
    $mail->CharSet = "UTF-8";
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'New request from website';
    $mail->Body    = "Вопрос от ${footerName}, с тел ${footerPhone}, спрашивает: ${footerAsk}.";

    $mail->send();
    header('Location: thanks.html');
} catch (Exception $e) {
    echo "Письмо не отправлено, ошибка. Mailer Error: {$mail->ErrorInfo}";
}