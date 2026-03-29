# VilleMap(Nom de l'application web)

Application web cartographique pour explorer les noms de communes en France.

## Fonctionnalités

Recherche de communes par nom (commence par, contient, finit par)
Affichage des communes sur une carte interactive
3 boutons de recherche rapide prédéfinis
Barycentre géographique des résultats
Autocomplétion lors de la saisie
Affichage de la limite géographique de la commune sélectionnée

## Technologies ou frameworks utilisées

PHP + Flight
MySQL (base de données geobase)
Leaflet (carte interactive)
Vue.js (interface utilisateur)

## Installation

1.Cloner le dépôt
2.Lancer MAMP
3.Ouvrir http://localhost/Noms_de_villes

## Fonctionnalité différenciante

Le **barycentre** calcule le centre géographique moyen de toutes les communes trouvées. 
Il place un marqueur sur la carte et recentre la vue sur ce point.

**L'autocomplétion** propose des communes en temps réel lors de la saisie. 
En cliquant sur une suggestion, la limite géographique de la commune s'affiche sur la carte.

## Auteur

Timera Daouda — Master 1 Géomatique
