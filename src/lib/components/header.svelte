<script>
	import { theme } from '$lib/stores/theme.js';
	import ThemeSelectorButton from './ThemeSelectorButton.svelte';

	function handleSelect(value) {
		theme.set(value);
	}
</script>

<header class="header">
	<div class="header-content">
		<div class="header-title">
			<h1 class="title">devtools.germaniii.com</h1>
			<p class="subtitle">your all-in-one developer toolbox</p>
		</div>
		<ThemeSelectorButton theme={$theme} onSelect={handleSelect} />
	</div>
</header>

<style>
	.header {
		height: 100%;
		text-align: center;
		padding: 1em 0;
		background: var(--surface);
		border-bottom: 1px solid var(--border);
		box-shadow: var(--shadow);
	}

	.header-content {
		display: grid;
		grid-template-columns: 1fr auto;
		justify-content: space-between;
		align-items: center;
		margin: 0 auto;
		padding: 0 2em;
	}

	.title {
		font-size: 1.8em;
		font-weight: 700;
		color: var(--text);
		letter-spacing: -0.02em;
		margin-bottom: 0.1em;
		font-family: var(--font-family-sans);
	}

	.subtitle {
		font-size: 0.9em;
		color: var(--text-secondary);
		font-weight: 400;
		margin: 0;
		font-family: var(--font-family-sans);
	}

	@media (max-width: 768px) {
		.header-content {
			padding: 0 1em;
		}

		.title {
			font-size: 1.3em;
		}

		.subtitle {
			font-size: 0.8em;
		}
	}
</style>
