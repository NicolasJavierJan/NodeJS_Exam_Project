<script>
    let songs = ["Song one", "Song two", "Song 3", "Song 4", "Song 5"];
    let selectedSongs = [];
    let message;
    let buttonDisable = false;

    function handleSongFetch(){
        songs = [];
        buttonDisable = true;
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
                buttonDisable = false;
            }
        })
        .then(result => {
            songs = result;
            buttonDisable = false;
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

    function handleSongSave(){
        const data = { songs: selectedSongs };
        fetch('http://localhost:8080/songs/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
    </script>

<div class="neon-sign main song-table">
    <h1 class='titles'>Heavy Metal Song Title Creator</h1>
    <h3>With a press of the button, you can get some Machine Learning generated song titles.</h3>
    <h3>The model was trained with over 22 thousand heavy metal song titles. </h3>
    <h3>Give it a try!</h3>
    <button on:click={handleSongFetch} disabled={buttonDisable}>Get Songs!</button>
    {#if message}
        <br>
        <br>
        {message}
        <br>
    {/if}
    <br>
    <br>

    <div class='songs-table'>
        {#if songs.length > 0}
            <table>
                {#each songs as song, index}
                    {#if index % 2 == 0 && songs[index + 1]}
                        <tr>
                            <td>
                                {song}
                                </td>
                                <td>
                                <input class='checkmark' type="checkbox" on:change={(event) => handleChecked(event, song)}>
                            </td>
                            <td>
                                {songs[index + 1]}
                            </td>
                            <td>
                                <input class='checkmark' type="checkbox" on:change={(event) => handleChecked(event, songs[index + 1])}>
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
    <h3>You can save the ones you like the most! Just check the songs you want to save, and press the button to save them!</h3>
    <button on:click={handleSongSave}>Save Songs!</button>
    <br>
    <br>
</div>

<style>

    .checkmark {
        height: 20px;
    }

    .songs-table {
        display: flex;
        justify-content: center;
    }

    table {
        table-layout: fixed;
        width: 80%;
    }

</style>