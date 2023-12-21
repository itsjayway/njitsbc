<script>
	import { ThemeWrapper } from 'svelte-themer';
	import { themes } from '../theme';

	import main from './main.jpg';

	import Link from '../components/Navbar/Link.svelte';
	import ToggleLightDark from '../components/Navbar/ToggleLightDark.svelte';
	import About from '../components/About.svelte';
	import Team from '../components/Team.svelte';
	import Videos from '../components/Videos.svelte';
</script>

<ThemeWrapper {themes}>
	<main>
		<div class="navbar">
			<div class="brand">
				<h1>NJITSBC</h1>
			</div>
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
		<img class="main" src={main} alt="main" />
		<div class="landing">
			<h1>WELCOME BACK</h1>
		</div>
		<About />
		<Team />
		<Videos />
	</main>
</ThemeWrapper>

<style>
	:global(html) {
		background-color: var(--theme-colors-background);
		color: var(--theme-colors-text, initial);
		font-family: Georgia, 'Times New Roman', Times, serif;
	}
	.main {
		height: 74vh;
		object-fit: cover;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.landing {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100%;
		text-align: center;
		transform: translate(-50%, -50%);

		background-color: var(--theme-colors-transparent);
		color: var(--theme-colors-transparent-text);
	}
	:global(body) {
		margin: 0;
		overflow-x: hidden;
	}

	.navbar {
		background-color: var(--theme-colors-primary);
		top: 0;
		z-index: 2;
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
		z-index: 2;
	}
</style>
