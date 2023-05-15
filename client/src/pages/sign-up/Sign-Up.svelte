<script>
    let username;
    let password;
    let email;
    let message = "";

    function handleSignUp(){
        fetch('http://localhost:8080/auth/sign-up', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'username': username,
                'password': password,
                'email': email
            })
        })
        .then(response => {
            if (response.status == 200){
                console.log("yeeha");
            } else if (response.status == 400){
                message = "User already exists";
            }
        })
    }
</script>

<div class="neon-sign forms signup">
    <h1 class="titles">SIGN UP</h1>
    <form on:submit|preventDefault={handleSignUp}>
        <label for="username">Username</label>
        <input type="text" id="username" name="username" required bind:value={username}>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required bind:value={password}>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required bind:value={email}>
        <br>
        <br>
        <button type="submit">Sign Up</button>
        <br>
        <br>
        <p>{message}</p>
    </form>
</div>