<script>
    import { useNavigate, useLocation } from "svelte-navigator";
	import { user } from "../../stores/users.js";

    let username;
    let password;
    let message = "";

    const navigate = useNavigate();

    function handleLogin(){
        fetch('http://localhost:8080/auth/log-in', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'username': username,
                'password': password
            })
        })
        .then(response => {
            if (response.status === 200) {
                user.set({ username });
                navigate("/", { replace: true });
            } else if (response.status === 401){
                message = "Wrong Username or Password";
            } else if (response.status === 429){
                message = "Too many requests. Please try again later";
            }
        })
    }
</script>

<div class="neon-sign forms login">
    <h1 class="titles">LOG IN</h1>
    <form on:submit|preventDefault={handleLogin}>
        <label for="username"  style="margin-top: 70px;">Username</label>
        <input type="text" id="username" name="username" required bind:value={username}>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required bind:value={password}>
        <br>
        <br>
        <button type="submit">Log In</button>
        <br>
        <br>
        <p>{message}</p>
    </form>
</div>