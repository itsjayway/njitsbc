<script>
	import { getContext } from 'svelte';
	let { toggle, current, theme } = getContext('theme');
</script>

<button on:click={toggle}>
	{$theme == 'light' ? '🌙 Dark' : '🌞 Light'}
</button>

<style>
	button {
		background-color: var(--theme-colors-button-primary);
		border-radius: 100%;
		padding: 0;
		cursor: pointer;
		height: 40px;
		width: 80px;
		color: var(--theme-colors-text);
		font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial,
			sans-serif;
	}

	button:hover {
		background-color: var(--theme-colors-button-primary_hover);
	}
</style>
