<script>
  import { get_root_for_style, set_data_contenteditable_dev } from "svelte/internal";

    let songs = [];
    let selectedSongs = [];
    let message = '';

    function handleSongFetch(){
        fetch('http://localhost:8080/run', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(response => {
            if (response.status === 200){
                return response.json();
            } else if (response.status === 500){
                message = "There has been an error. Please try again."
            }
        })
        .then(result => {
            songs = result;
        })
    }

    // Adds the checked songs to an array.
    // If the song is unchecked, it filters the array (creates a new array with all the songs that have 
    // a different title that the one being unchecked)
    function handleChecked(event, song){
        if (event.target.checked){
            if (!selectedSongs.includes(song)) {
                selectedSongs.push(song);
            }
        } else {
            selectedSongs = selectedSongs.filter((selectedSong) => selectedSong !== song);
        }
        console.log(selectedSongs);
    }
    </script>

<h1>Heavy Metal Song Title Creator</h1>

<button on:click={handleSongFetch}>Get Songs!</button>

{message}

{#if songs.length > 0}
    <table class="songs-table">
        {#each songs as song, index}
            {#if index % 2 == 0 && songs[index + 1]}
                <tr>
                    <td>
                        <input class='checkmark' type="checkbox" on:change={(event) => handleChecked(event, song)}>
                        {song}
                    </td>
                    <td>
                        <input class='checkmark' type="checkbox" on:change={(event) => handleChecked(event, songs[index + 1])}>
                        {songs[index + 1]}
                    </td>
                </tr>
            {:else if index % 2 == 0}
                <tr>
                    <td>
                        <input class='checkmark' type="checkbox" on:change={(event) => handleChecked(event, song)}>
                        {song}
                    </td>
                </tr>
            {/if}
        {/each}
    </table>
{/if}

<style>

    .checkmark {
        height: 20px;
    }

</style>