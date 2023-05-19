<script>
    import toastr from 'toastr';
    import 'toastr/build/toastr.min.css';
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

    async function handleSongSave(){
        const data = {songs: selectedSongs }
        fetch("http://localhost:8080/songs/favourites", {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.status === 200){
                toastr.options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-bottom-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "3000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
                }

                toastr["success"]("The songs have been added to the Gallery!", "Success~!")
            }
        })   

        selectedSongs.forEach(selectedSong => {
            const songIndex = songs.findIndex(song => song.title === selectedSong.title);
            if (songIndex !== -1) {
                songs[songIndex].favorited = true;
            }
        })
    }

</script>

<div class='neon-sign profile song-table'>
    <h1 class='titles'>Hello, {username}!</h1>
    <h3>This are your favourited songs!</h3>
    <h3> You can add your song titles to the Gallery by selecting some songs and pressing the "Show the World" button!</h3>
    <h3>Beware! This action cannot be undone. Give it a try!</h3>

    <div class='songs-table'>
        {#if songs.length > 0}
            <br>
            <table>
                {#each songs as song, index}
                    {#if index % 2 == 0 && songs[index + 1] }
                        <tr>
                            <td>
                                {song.title}
                            </td>
                            <td>
                                {#if !song.favorited}
                                <input class="checkmark" type="checkbox" on:change={(event) => handleChecked(event, song)}>
                                {/if}
                            </td>
                            <td>
                                {songs[index + 1].title}
                            </td>
                            <td>
                                {#if !songs[index + 1].favorited}
                                <input class="checkmark" type="checkbox" on:change={(event) => handleChecked(event, songs[index + 1])}>
                                {/if}
                            </td>
                        </tr>
                    {:else if index % 2 == 0}
                        <tr>
                            <td>
                                {song.title}
                            </td>
                            <td>
                                {#if !song.favorited}
                                <input class='checkmark' type="checkbox" on:change={(event) => handleChecked(event, song)}>
                                {/if}
                            </td>
                        </tr>
                    {/if}
                {/each}
            </table>
        {/if}
    </div>

    <br>
    <button on:click={handleSongSave}   disabled={saveSongsButton}>Show the World!</button>
    <br>
    <br>
</div>