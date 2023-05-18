<script>
    import { user } from "../../stores/users.js";

    let username = $user.username;
    let songs = [];
    let selectedSongs = [];
    let saveSongsButton = true;

    fetch("http://localhost:8080/songs", {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(result => {
        songs = result[0].songs;
    })

    function handleChecked(event, song){
        if (event.target.checked){
            if (!selectedSongs.includes(song)) {
                selectedSongs.push(song);
            }
        } else {
            selectedSongs = selectedSongs.filter((selectedSong) => selectedSong !== song);
        }
        if (selectedSongs.length > 0){
            saveSongsButton = false;
        } else {
            saveSongsButton = true;
        }
        console.log(selectedSongs); 
    }

    function handleSongSave(){
        const data = {songs: selectedSongs }
        fetch("http://localhost:8080/songs/favourites", {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
    }

</script>

<h1>Hello, {username}!</h1>
<h3>This are your favourited songs!</h3>
<p> You can add your song titles to the Gallery by selecting some songs and pressing the "Show the World" button!</p>
<p>Give it a try!</p>

<div class='songs-table'>
    {#if songs.length > 0}
        <br>
        <table>
            {#each songs as song, index}
                {#if index % 2 == 0 && songs[index + 1] }
                    <tr>
                        <td>
                            {song}
                        </td>
                        <td>
                            <input class="checkmark" type="checkbox" on:change={(event) => handleChecked(event, song)}>
                        </td>
                        <td>
                            {songs[index + 1]}
                        </td>
                        <td>
                            <input class="checkmark" type="checkbox" on:change={(event) => handleChecked(event, songs[index + 1])}>
                        </td>
                    </tr>
                {:else if index % 2 == 0}
                    <tr>
                        <td>
                            {song}
                        </td>
                        <td>
                            <input class='checkmark' type="checkbox" on:change={(event) => handleChecked(event, song)}>
                        </td>
                    </tr>
                {/if}
            {/each}
        </table>
    {/if}
</div>

<br>
<button on:click={handleSongSave}   disabled={saveSongsButton}>Show the World!</button>