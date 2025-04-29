<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");


$file_path = '/var/www/html/homework/angularwords.txt';


$word_list = file($file_path);

$rand_word = $word_list[array_rand($word_list)];

header('Content-Type: application/json');
echo json_encode(["word" => $rand_word]);



/* $json = file_get_contents($file_path);
$rand_word = json_decode($json, true);

echo $rand_word; */

