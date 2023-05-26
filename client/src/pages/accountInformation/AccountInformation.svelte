<script>
    import toastr from 'toastr';
    import 'toastr/build/toastr.min.css';

    import { user } from "../../stores/users.js";

    // Fields:
    let username = $user.username;
    let password = "";
    let reEnteredPassword = "";
    // Field disablers:
    let disableFields = false;  
    let reEnterDisabled = true;
    let disableButton = true;
    // Error message:
    let passwordMatchError = "";

    $: {
        // Disable field for password re enter if no password is entered.
        reEnterDisabled = !password;

        // Check if password and password re entered match. Show an error message if they do not.
        passwordMatchError = password !== reEnteredPassword ? 'Passwords must match' : "";

        // Disable the button if passwords don't match and the password length is more than 0.
        disableButton = passwordMatchError === "" && password.length > 0 ? false : true;
    }

    function handleAccountEdit(){
        fetch("http://localhost:8080/account/user", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(response => {
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

                toastr["success"]("Account Information has been saved! You have been logged out.", "Success~!")

                disableFields = true;
                disableButton = true;
                reEnterDisabled = true;

                handleLogOut();
            }

            // Logs out user after changing credentials to force a log in with new credentials.
            function handleLogOut(){
                $user = null;
                fetch('http://localhost:8080/auth/log-out', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json'
                }
                });
            }

        })
    }
</script>

<div class='neon-sign forms profile-information'>
    <h1 class='titles'>EDIT ACCOUNT INFORMATION</h1>
    <form on:submit|preventDefault={handleAccountEdit}>
        <label for="username">Username</label>
        <input type="text" id="username" name="username" bind:value={username} disabled={disableFields}>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" bind:value={password} disabled={disableFields}>
        <label for="re-enter-password">Re-Enter Password</label>
        <input type="password" id="password" name="password" bind:value={reEnteredPassword} disabled={reEnterDisabled}>
        <br>
        <br>
        <br>
        <button type="submit" disabled={disableButton}>Update Account Information</button>
        <p>{passwordMatchError}</p>
    </form>
</div>

<style>
    .forms {
        width: 40em;
        height: 35em;
    }

    label {
        display: block;
        text-align: left;
        margin-left: 160px;
        font-size: 18px;
        margin-bottom: 5px;
        margin-top: 5px;
        }
</style>