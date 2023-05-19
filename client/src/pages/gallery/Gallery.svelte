<script>
    import io from "socket.io-client";

    const socket = io("localhost:8080");

    let songs = [];

    socket.emit("give me the songs", "please");

    socket.on("songs", (data) => {
        songs = data[0].songs;
    })

</script>

<div class="neon-sign gallery song-table">
    <h1 class='titles'>GALLERY</h1>
    <h3>These are song titles that have been created by our model and favorited by our users =)</h3>
    <div class="songs-table">
        <br>
        <table>
            {#each songs as song, index}
                {#if index % 2 === 0 && songs[index + 1]}
                <tr>
                    <td>
                        {song}
                    </td>
                    <td>
                        {songs[index + 1]}
                    </td>
                </tr>
                {:else if index % 2 == 0}
                <tr>
                    <td>{song}</td>
                </tr>
                {/if}
            {/each}
        </table>
    </div>
    <br>
</div>