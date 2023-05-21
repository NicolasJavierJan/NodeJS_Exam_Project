<script>
  import { onMount } from "svelte";
  import L from "leaflet";

  let countries = [];

  onMount(() => {

    // Get the COUNT of how many users each country has
    fetch("http://localhost:8080/admin/userCountries", {
        method: 'GET',
        credentials: 'include',
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(response => response.json())
    .then(result => {
        countries = result; 
    })

    // Initialize the map
    const map = L.map("map").setView([0, 0], 2);

    // Add a tile layer with the OpenStreetMap provider by Leaflet.
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "Map data &copy; OpenStreetMap contributors",
    }).addTo(map);

    // Load the GeoJSON data
    fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
      .then((response) => response.json())
      .then((data) => {
        // Add the GeoJSON layer to the map
        L.geoJSON(data, {
          // The style function is called for each feature (country). This is taken care of by the Leaflet Library.
          style: (feature) => {
            // Get the country name from the feature properties
            const countryName = feature.id;
            
            // Get users by Country:
            const userCount = getUserCountByCountry(countryName);

            // Define the color based on the user count
            const color = getColor(userCount);

            // Return the style object with the fill color
            return {
              fillColor: color,
              weight: 1,
              opacity: 1,
              color: "white",
              fillOpacity: 0.7,
            };
          },
        }).addTo(map);
      });
  });

  function getUserCountByCountry(countryName) {
     const country = countries.find((country) => country.country === countryName);
     if (country){
        return country.number;
     } else {
        return 0;
     }
  }

  function getColor(userCount) {
    // Define the color scale based on the user count
    // For now, maxUserCount equals one because I don't have that many Users.
    const maxUserCount = 1;
    const minColorValue = 0;
    const maxColorValue = 255;

    // Calculate the color value based on the user count
    const redValue = Math.round((userCount / maxUserCount) * maxColorValue);

    // Convert the color value to a hexadecimal representation
    const color = `rgb(${redValue}, 0, 0)`;

    return color;
  }
</script>
<div id="container">
  <div id="map"></div>
</div>

<style>
    #map {
        height: 100%;
        width: 80%;
        margin: auto;
    }

    #container {
        height: 400px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>