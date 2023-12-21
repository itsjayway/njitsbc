<script>
	export let text = 'Link';
	export let link = '#';
</script>

<li>
	<a href={link}>{text}</a>
</li>

<style>
	li {
        padding: 10px;
        font-size: 1.5rem;
        font-weight: bold;
    }
    li a {
        text-decoration: none;
        color: #cccccc;
    }

    li a:hover {
        color: var(--theme-colors-secondary);
    }
</style>
