let map;
let marqueurs;
let listeVilles = [];

Vue.createApp({
    data() {
        return {
            recherche: '',
            mode: 'commence',
            suggestions: []
        };

    },
     mounted() {
        map = L.map('map', {
            center: [46.23, 2.2],
            zoom: 6,
            layers: [
                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                }),
            ],
        });
        marqueurs = L.layerGroup().addTo(map);
    },
    methods: {
        lancerRecherche() {
            fetch('/villes?mode=' + this.mode + '&search=' + this.recherche)
                .then(reponse => reponse.json())
                .then(villes => {
                    marqueurs.clearLayers();
                    listeVilles = villes;

                    if (villes.length === 0) {
                        alert('Aucune ville trouvée !');
                        return;
                    }

                    villes.forEach(ville => {
                L.marker([ville.lat, ville.lon])
                    .bindPopup('<strong>' + ville.nom + '</strong><br>' + ville.insee)
                    .addTo(marqueurs);
            });

            map.fitBounds(marqueurs.getLayers().map(m => m.getLatLng()));
                });
        },
        rechercheRapide(mode, recherche) {
            this.mode = mode;
            this.recherche = recherche;
            this.lancerRecherche();
        },
        afficherBarycentre() {
            if (listeVilles.length === 0) {
                alert('Lancez dabord une recherche !');
                return;
            }
            let totalLat = 0;
            let totalLon = 0;
            listeVilles.forEach(ville => {
                totalLat += parseFloat(ville.lat);
                totalLon += parseFloat(ville.lon);
            });
            let moyLat = totalLat / listeVilles.length;
            let moyLon = totalLon / listeVilles.length;
            L.marker([moyLat, moyLon])
                .bindPopup(' Barycentre de ' + listeVilles.length + ' villes')
                .addTo(marqueurs)
                .openPopup();
            map.setView([moyLat, moyLon], 8);
        },
        autocomplete() {
    if (this.recherche.length < 2) {
        this.suggestions = [];
        return;
    }
    fetch('/villes?mode=commence&search=' + this.recherche)
        .then(r => r.json())
        .then(villes => {
            this.suggestions = villes;
        });
},
choisir(suggestion) {
    this.recherche = suggestion.nom;
    this.suggestions = [];
    if (suggestion.geojson) {
                let contour = L.geoJSON(JSON.parse(suggestion.geojson)).addTo(marqueurs);
                L.marker([suggestion.lat, suggestion.lon])
    .bindPopup('<strong>' + suggestion.nom + '</strong><br>' + suggestion.insee)
    .addTo(marqueurs)
    .openPopup();
                map.fitBounds(contour.getBounds());
            }
}
    }
}).mount('#entete');

