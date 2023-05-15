<script>
  import Home from "./pages/home/Home.svelte";
import LogIn from "./pages/log-in/Log-In.svelte";
  import Main from "./pages/main/Main.svelte";
  import SignUp from "./pages/sign-up/Sign-Up.svelte";

  import { Router, Link, Route } from "svelte-navigator";

</script>

<Router>
  <nav>
    <Link to="/">HOME</Link>
    <Link to="/sign-up">SIGN UP</Link>
    <Link to="/log-in">LOG IN</Link>
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
</Router>
