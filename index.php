<?php

declare(strict_types=1);

require_once 'flight/Flight.php';

$link = mysqli_connect('localhost', 'root', 'root', 'geobase');


if (!$link) {
    die("Erreur connexion MySQL : " . mysqli_connect_error());
}

mysqli_set_charset($link, 'utf8');

// stocker une variable globale
Flight::set('link', $link);
// récupérer la variable
Flight::get('link');


Flight::route('/', function() {
    Flight::render('accueil');
});

Flight::start();