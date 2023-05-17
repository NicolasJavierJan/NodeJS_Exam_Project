<script>
    import { user } from "../../stores/users.js";

    let username = $user.username;
    let songs = "";

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
<ul>
{#each songs as song}
<li>{song}</li>
{/each}
</ul>