<script>
	import Link from './Link.svelte';
	import ToggleLightDark from './ToggleLightDark.svelte';
</script>

<div class="navbar">
	<div class="brand">
		<h1>NJITSBC</h1>
	</div>
	<div class="row">
		<ul>
			<Link text="HOME" link="/" />
			<Link text="ABOUT" link="/about" />
			<Link text="TEAM" link="/team" />
			<Link text="VIDEOS" link="/videos" />
		</ul>
		<ToggleLightDark />
	</div>
</div>

<style>
	.navbar {
		background-color: var(--theme-colors-primary);
		top: 0;
		z-index: 1;
	}

	ul {
		display: flex;
		justify-content: space-around;
		list-style-type: none;
		padding: 0;
	}

	.brand {
		padding: 10px;
		font-size: 1.5rem;
		font-weight: bold;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 75px;
		position: relative;
	}

	.row {		
		background-color: var(--theme-colors-primary_dark);
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		position: sticky;
		top: 0;
		z-index: 1;
	}
</style>
