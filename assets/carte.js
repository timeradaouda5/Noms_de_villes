let map;
let marqueurs;
let listeVilles = [];

Vue.createApp({
    data() {
        return {
            recherche: '',
            mode: 'commence'
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
                    .bindPopup('<strong>' + ville.nom + '</strong>')
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
        }
    }
}).mount('#entete');

