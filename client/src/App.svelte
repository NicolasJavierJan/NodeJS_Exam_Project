<script>
  import PrivateRoute from "./components/PrivateRoute.svelte";
  import Home from "./pages/home/Home.svelte";
  import LogIn from "./pages/log-in/Log-In.svelte";
  import Main from "./pages/main/Main.svelte";
  import SignUp from "./pages/sign-up/Sign-Up.svelte";
  import Profile from "./pages/profile/Profile.svelte";
  import Gallery from "./pages/gallery/Gallery.svelte";
  import ProfileInformation from "./pages/profileInformation/ProfileInformation.svelte";
  import AdminPanel from "./pages/adminPanel/AdminPanel.svelte";
  import AdminRoute from "./components/AdminRoute.svelte";
  import AccountInformation from "./pages/accountInformation/AccountInformation.svelte";

  import { Router, Link, Route } from "svelte-navigator";

  import { user } from "./stores/users.js";
  
  

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
</script>

<Router>  
  <nav>
    <Link to="/">HOME</Link>
    <Link to="/gallery">GALLERY</Link>
    <Link to="/sign-up">SIGN UP</Link>
    <Link to="/log-in">LOG IN</Link>
    {#if $user && $user.username !== "admin"}
    <Link to="/main">SONG CREATOR</Link>
    <Link to="#" on:click={handleLogOut} style="float: right;">LOGOUT</Link>
    <Link to="/profile" style="float: right;">PROFILE</Link>
    {:else if $user && $user.username === "admin"}
    <Link to="#" on:click={handleLogOut} style="float: right">LOGOUT</Link>
    <Link to="/adminPanel" style="float: right;">ADMIN PANEL</Link>
    {/if}
  </nav>  

  <Route path="/">
    <Home />
  </Route>
  <Route path="/log-in">
    <LogIn />
  </Route>
  <Route path="/sign-up">
    <SignUp />
  </Route>
  <PrivateRoute path="/main" let:location>
    <Main />
  </PrivateRoute>
  <PrivateRoute path="/profile" let:location>
    <Profile />
  </PrivateRoute>
  <Route path="/gallery">
    <Gallery />
  </Route>
  <PrivateRoute path="/profileInformation" let:location>
    <ProfileInformation />
  </PrivateRoute>
  <PrivateRoute path="/accountInformation" let:location>
    <AccountInformation />
  </PrivateRoute>
  <AdminRoute path="/adminPanel">
    <AdminPanel />
  </AdminRoute>
</Router>