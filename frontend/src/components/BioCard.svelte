<script>
	export let name = 'Name';
	export let image = 'https://via.placeholder.com/150';
</script>

<a href="https://www.instagram.com/njitsbc/">
	<div class="card">
		<h4><b>{name}</b></h4>
		<img src={image} alt="Avatar" style="width:100%" />
	</div>
</a>

<style>
	.card {
		position: relative;
		width: 200px;
		height: 200px;
		transition: 0.3s;
	}

	.card img {
		width: 100%;
		height: 100%;
		transition: 0.3s;
		object-fit: cover;
	}

	h4 {
		position: absolute;
		bottom: 0;
		background-color: var(--theme-colors-transparent);
		color: var(--theme-colors-transparent-text);
		z-index: 1;
		width: 50%;
		transition: 0.3s;
	}

	.card:hover h4 {
		background-color: var(--theme-colors-secondary);
		color: var(--theme-colors-primary);
	}
</style>
