<?php

declare(strict_types=1);

require_once 'flight/Flight.php';

// Connexion BDD
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




Flight::route('/villes', function() {
    $link = Flight::get('link');
    $recherche = $_GET['search'] ?? '';
    $mode   = $_GET['mode']   ?? 'commence';

    if ($mode === 'commence') {
        $texteRecherche = $recherche . '%';
    } elseif ($mode === 'termine') {
        $texteRecherche = '%' . $recherche;
    } else {
        $texteRecherche = '%' . $recherche . '%';
    }

    $sql = "SELECT nom,
                ST_X(ST_GeomFromText(ST_AsText(ST_Centroid(geometry)),4326)) AS lon,
                ST_Y(ST_GeomFromText(ST_AsText(ST_Centroid(geometry)),4326)) AS lat
            FROM communes 
            WHERE nom LIKE '$texteRecherche' LIMIT 10";

                    
    $resultat = mysqli_query($link, $sql);
    $villes = mysqli_fetch_all($resultat, MYSQLI_ASSOC);

    Flight::json($villes);
});

Flight::start();