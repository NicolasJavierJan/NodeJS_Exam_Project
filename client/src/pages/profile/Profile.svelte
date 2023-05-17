<script>
    import { user } from "../../stores/users.js";

    let username = $user.username;
    let songs = [];

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

    
</script>

<h1>Hello, {username}!</h1>
<h3>This are your favourited songs!</h3>

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
                            <input class="checkmark" type="checkbox">
                        </td>
                        <td>
                            {songs[index + 1]}
                        </td>
                        <td>
                            <input class="checkmark" type="checkbox">
                        </td>
                    </tr>
                {:else if index % 2 == 0}
                    <tr>
                        <td>
                            {song}
                        </td>
                        <td>
                            <input class='checkmark' type="checkbox">
                        </td>
                    </tr>
                {/if}
            {/each}
        </table>
    {/if}
</div>