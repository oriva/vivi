<?php


require ("PHPMailer.php");
require ("SMTP.php");

$subject = 'Заявка с ViVi!';
$name=''; $phone=''; $question=''; $site='';

if (!empty($_POST["name"])) {
    $name = '<p style = "font-size: 1.2em; color: #333" ><span style = "font-weight: 600" > Имя:</span > '.$_POST['name'].' </p>';
};
if(!empty($_POST["phone"])) {
    $phone = '<p style="font-size: 1.2em; color: #333"><span style="font-weight: 600">Телефон:</span> ' . $_POST['phone'] . '</p>';
};
if(!empty($_POST["question"])) {
    $question = '<p style="font-size: 1.2em; color: #333"><span style="font-weight: 600">Вопрос:</span> ' . $_POST['question'] . '</p>';
}
if(!empty($_POST["site"])) {
    $occupation = '<p style="font-size: 1.2em; color: #333"><span style="font-weight: 600">С сайта:</span> ' . $_POST['site'] . '</p>';
}
$message = '
                <html>
                    <head>
                        <title>' . $subject . '</title>
                    </head>
                    <body style="padding: 20px; border: 1px solid #000">
                        <img src="http://vivi.my/img/icons/button-vivi.png" style="display: block; width: 50px; margin: 20px;">
                        ' . $occupation .'
                        <p style="font-size: 1.2em; color: #333"><span style="font-weight: 600">Тип заявки:</span> ' . $_POST['about-form'] . '</p>'
                        . $name . $phone . $question  .
                    '</body>
                </html>';

$mail = new PHPMailer(true);

$mail->isSMTP(); 
$mail->Host = 'smtp.yandex.ru';  
$mail->SMTPAuth = true;                      
$mail->Username = 'callback@litvinenko.digital'; // Ваш логин в Яндексе. Именно логин, без @yandex.ru
$mail->Password = 'callback123'; // Ваш пароль
$mail->SMTPSecure = 'ssl';                            
$mail->Port = 465;
$mail->setFrom('callback@litvinenko.digital'); // Ваш Email
$mail->addAddress('vivi.my@yandex.ru'); // Email получателя
$mail->addAddress('1formarketing@gmail.com'); // Email получателя
//$mail->addAddress('weelman93@gmail.com'); // Email получателя

$mail->isHTML(true);
$mail->Subject = $subject; // Заголовок письма
$mail->Body    = $message;
$mail->CharSet = 'UTF-8';



if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Успешный человек - успешен во всем!';
}

?>