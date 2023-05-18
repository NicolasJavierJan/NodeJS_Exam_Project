<script>
    import toastr from 'toastr';
    import 'toastr/build/toastr.min.css';

    let songs = [];
    let selectedSongs = [];
    let message;
    let buttonDisable = false;
    let saveSongsButton = true;

    function handleSongFetch(){
        songs = [];
        buttonDisable = true;

        randomToast();
        const interval = setInterval(randomToast, 4500);

        fetch('http://localhost:8080/run', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(response => {
            clearInterval(interval);
            if (response.status === 200){
                return response.json();
            } else if (response.status === 500){
                message = "There has been an error. Please try again.";
                buttonDisable = false;
            }
        })
        .then(result => {
            songs = result;
            buttonDisable = false;
            if (songs.length === 0){
                message = "There has been an error. Please try again";
            }
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
        if (selectedSongs.length > 0){
            saveSongsButton = false;
        } else {
            saveSongsButton = true;
        }
    }

    function handleSongSave(){
        const data = { songs: selectedSongs };
        fetch('http://localhost:8080/songs', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

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

        toastr["success"]("The songs have been saved.", "Success~!")

        songs = [];
        selectedSongs = [];
        saveSongsButton = true;
    }

    function randomToast() {
        const titles = ["Fetching Songs", "Please be patient...", "Don't go anywhere!", "We will be ready shortly!", "Please stay here", "Don't leave me now", "It will just take a little longer", "Please keep waiting a little longer"];
        const bodies = ["The model is working", "The monkeys are writing", "We are plugging in the server", "We are extinguishing some fires in the server room", "An employee brought a cobra today and it escaped", "We are asking ChatGPT for some song titles", "Machine learning is hard.", "We are having some troubles making the model cooperate with us", "Our robot overlords are displeased today"];

        const randomTitle = titles[Math.floor(Math.random() * titles.length)];
        const randomBody = bodies[Math.floor(Math.random() * bodies.length)];

        toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-full-width",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
        }

        toastr["info"](randomBody, randomTitle);
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
            <br>
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
    <h3>You can save the ones you like the most! Just check the songs you want to save, and press the button to save them!</h3>
    <button on:click={handleSongSave} disabled={saveSongsButton}>Save Songs!</button>
    <br>
    <br>
</div>

<style>

</style>