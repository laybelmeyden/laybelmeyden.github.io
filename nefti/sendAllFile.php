<?php
header('Content-type: text/html; charset=utf-8');
$strTo = 'promo.oppo.kz@gmail.com, konvers@birdnbird.kz';

$strSubject = "Новый участник";
$strMessage = "\nФИО: $_POST[name]  \nВозраст: $_POST[years]  \nПол: $_POST[gender]  \nГород: $_POST[city]  \nТелефон: $_POST[numb]  \nE-mail: $_POST[email]  \nМодель продукта: $_POST[model] \nМагазин: $_POST[shop] \nВыбор сертификата: $_POST[sert1]$_POST[sert2]$_POST[sert3]$_POST[sert4]$_POST[sert5]$_POST[sert6]$_POST[sert7]$_POST[sert8] \nIMEI: $_POST[imei] \nДата покупки: $_POST[date] \n\n$_POST[check]";


$strSid = md5(uniqid(time()));
$eol = '\n';


$strHeader = "From: noreply@oppo-promo.kz; \n";
$strHeader .= "Content-Type: multipart/mixed; boundary=\"".$strSid."\"\n\n";

$strMess = 'Content-Type: multipart/mixed; boundary=\"'.$strSid.'\"

--'.$strSid.'
Content-Type: text/plain; charset=utf-8
'.$strMessage.'

';

//*** Attachment ***//
for($i=0;$i<count($_FILES["fileAttach"]["name"]);$i++)
{
    if($_FILES["fileAttach"]["name"][$i] != "")
    {
        $strFilesName = $_FILES["fileAttach"]["name"][$i];
        $strContent = chunk_split(base64_encode(file_get_contents($_FILES["fileAttach"]["tmp_name"][$i])));
        $strMess .= "--".$strSid."\n";
        $strMess .= "Content-Type: application/octet-stream; name=\"".$strFilesName."\"\n";
        $strMess .= "Content-Transfer-Encoding: base64\n";
        $strMess .= "Content-Disposition: attachment; filename=\"".$strFilesName."\"\n\n";
        $strMess .= $strContent."\n\n";
    }
}
$strMess.="
--".$strSid."--";

$result = @mail($strTo,$strSubject,$strMess,$strHeader);
//file_put_contents('filename.txt', print_r($_FILES, true));

$result = mail("$_POST[email]","OPPO","Здравствуйте! Мы получили Вашу заявку на участие, она будет рассмотрена в течение от 2 до 7 дней. Спасибо!", "From: noreply@oppo-promo.kz \r\nContent-type: text/plain; charset=\"utf-8\"\r\n");

if ($result) {
    header("Location:index.html");
}
else{
    header("Location:index.html?status=false");
}
?>