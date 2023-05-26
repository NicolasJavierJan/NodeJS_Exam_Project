<script> 
    import { Bar } from "svelte-chartjs";
    import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
    
    Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

    let songsCreated = 0;
    let songsFavorited = 0;
    let data;
    let percentage;

    fetch("http://localhost:8080/admin/userSongsCreated", {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(response => response.json())
    .then(result => {
        // Get how many songs were created in total: 
        songsCreated = result[0].number;
    })

    fetch("http://localhost:8080/admin/userSongsFavorited", {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(response => response.json())
    .then(result => {
        // Get how many songs were favorited: 
        songsFavorited = result[0].number;
    })

    $: 
    { 
        percentage = ((songsFavorited / songsCreated) * 100).toFixed(2);
        data = 
        {
            labels: ['Songs Created', 'Songs Favorited'],
            datasets: [
                {
                    label: 'Model Acceptance',
                    data: [songsCreated, songsFavorited],
                    backgroundColor: [
                        'rgba(255, 0, 0, 0.7)',
                        'rgba(0,  0, 255, 0.7)'
                    ],
                    borderWitdh: 2
                },
            ],
        }
    };



</script>

<h1 class="titles">MODEL ACCEPTANCE: {percentage}%</h1>
<div id="container">
    <div id="barChart">
        <Bar {data} class="barChart"></Bar>
    </div>
</div>

<style>
    #barChart {
        background-color: white;
        height: 100%;
        width: 60%;
        margin: auto;
    }

    #container {
        height: 400px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>