<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nom de ville</title>

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossorigin=""/>

    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
     crossorigin=""></script>


      <link rel="stylesheet" href="assets/carte.css">
</head>
<body>
 
 
<div id="header">
<h1>Bienvenue sur VilleMap 🗺️</h1>
</div>

<div id="contenu">

<div id="entete">
<h2>🔍 Recherche d'adresses</h2>
        <form>

          <input type="text" id="search" placeholder="Taper un nom de ville..."/>   
        <div id="options">
        <select id="mode">
            <option value="commence">Commence par</option>
            <option value="contient">Contient</option>
            <option value="termine">Finit par</option>
        </select>
        
            <button type="button" onclick="rechercher()">🔍 Rechercher</button>
        </div>
       

        
    </form>

    <button type="button" onclick="rechercheRapide('commence', 'K')">Commence par K</button>
    <button type="button" onclick="rechercheRapide('termine', 'orge')">Finit par orge</button>
    <button type="button" onclick="rechercheRapide('termine', 'ac')">Finit par ac</button>
    </div>
    <div id="map"></div> 
 </div>
</div>


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="assets/carte.js"></script>
</body>
</html>