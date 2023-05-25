<script>
	import { useNavigate, useLocation } from "svelte-navigator";
	import { user } from "../stores/users.js";

	const navigate = useNavigate();
	const location = useLocation();

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