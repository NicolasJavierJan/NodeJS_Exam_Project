<script>
  import PrivateRoute from "./components/PrivateRoute.svelte";
  import Home from "./pages/home/Home.svelte";
  import LogIn from "./pages/log-in/Log-In.svelte";
  import Main from "./pages/main/Main.svelte";
  import SignUp from "./pages/sign-up/Sign-Up.svelte";

  import { Router, Link, Route } from "svelte-navigator";

  import { user } from "./stores/users.js";
</script>

<Router>
  
  <nav>
    <Link to="/">HOME</Link>
    <Link to="/sign-up">SIGN UP</Link>
    <Link to="/log-in">LOG IN</Link>
    {#if $user}
    <!-- TODO ADD PROFILE PAGE ADD PROFILE PAGE TODO ADD PROFILE PAGE TODO TODO TODO ADD PROFILE PAGE & LOGOUT-->
    <Link to="/main">SONG CREATOR</Link>
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
  <!--
  <PrivateRoute path="/main" let:location>
    <Main />
  </PrivateRoute>
  -->
  <Route path="/main">
    <Main />
  </Route>
</Router>
