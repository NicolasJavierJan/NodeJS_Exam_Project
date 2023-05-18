<script>
    import io from "socket.io-client";

    const socket = io("localhost:8080");

    let songs = [];

    socket.emit("give me the songs", "please");

    socket.on("songs", (data) => {
        songs = data[0].songs;
    })

</script>

{songs}