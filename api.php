<?php
$file = 'todos.json';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($file)) {
        $json = file_get_contents($file);
        $todos = json_decode($json, true);
    } else {
        $todos = [];
    }
    echo json_encode($todos);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (isset($input['text'])) {
        $todos = json_decode(file_get_contents($file), true);
        $todos[] = $input;
        file_put_contents($file, json_encode($todos));
    } elseif (isset($input['todos'])) {
        file_put_contents($file, json_encode($input['todos']));
        $todos = $input['todos'];
    }
    echo json_encode($todos);
}
?>