<script>
	import { useNavigate, useLocation } from "svelte-navigator";
	import { user } from "../stores/users.js";

	const navigate = useNavigate();
	const location = useLocation();

	// If the user is not logged in or if the user is logged in but not admin -> Navigate to Log-In page.
	$: if (!$user || $user.username !== "admin") {
		navigate("/log-in", {
			state: { from: $location.pathname },
			replace: true,
		});
	}
</script>

{#if $user && $user.username === "admin"}
	<slot />
{/if}