<script>
	import BioCard from './BioCard.svelte';

	export let team = [
		{
			name: 'Enis',
			image:
				'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2Fc1%2Fb1%2Fa3%2Fc1b1a3ad61ee93ae64a82310c5345ae7.jpg&f=1&nofb=1&ipt=4afcaedbfa138dd67a0a94431ab1552efb0b5166799b3ccd77b9b11ce0ec6a93&ipo=images'
		},
		{
			name: 'Doug',
			image:
				'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fisorepublic.com%2Fwp-content%2Fuploads%2F2018%2F11%2Flondon-skater.jpg&f=1&nofb=1&ipt=1daf6240b05a44b783bcebf5a019d1c98e1d516790d0f786b85ec6257bb15d4a&ipo=images'
		},
		{
			name: 'Matt',
			image:
				'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F3f%2Fcf%2F73%2F3fcf734c570199e5734e7d7bbec8562f.jpg&f=1&nofb=1&ipt=655f9b614ae1f5bbff5fc41225117c264cfbf3a2cd2dae1097ecf7f7cc358148&ipo=images'
		},
		{
			name: 'Stephen',
			image:
				'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F3.bp.blogspot.com%2F-exO6TPX6lM0%2FUDAQLf8ZZ_I%2FAAAAAAAAFkQ%2FbC0G4bQDhu0%2Fs1600%2Fskater_edited-1.jpg&f=1&nofb=1&ipt=df50a7a10dbbc4dfe1a41b8c3905ad99d86fe3221938ae7b674c36bef61c31c3&ipo=images'
		},
		{
			name: 'Nick',
			image:
				'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F4.bp.blogspot.com%2F-vhUCHpJ3ngQ%2FVem8BSoDWOI%2FAAAAAAAAAB4%2FNjhCjHuEnUQ%2Fs1600%2F1339135.jpg&f=1&nofb=1&ipt=54bed6297c7d572736411fbca60eaf9e5e300f42982827bef51e4894f579529e&ipo=images'
		},
		{
			name: 'Arne',
			image:
				'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fcb%2F4f%2F3a%2Fcb4f3aad1aab74cbb9074d5c7ce45931.jpg&f=1&nofb=1&ipt=85cf48e625a81d181e9fee43125c4719f2d6c759081dfa1dcc55d9dee1e36cc6&ipo=images'
		}
	];
</script>

<div class="main">
	<h1>Meet the Team</h1>
	<div class="team-grid">
		{#each team as member}
			<BioCard name={member.name} image={member.image} />
		{/each}
	</div>
</div>

<style>
	.main {
		display: flex;
		flex-direction: column;
		text-align: center;
		align-items: center;
	}
	.team-grid {
		width: 60%;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 0fr));
		justify-content: center;
	}
</style>
