<script>
  import { Palette } from '@lucide/svelte';
  import { THEME_OPTIONS, THEME_COLORS } from '$lib/preferences.js';
  import ThemeSelectorModal from './ThemeSelectorModal.svelte';

  let { theme: currentTheme, onSelect } = $props();

  let isOpen = $state(false);
  const colors = $derived(THEME_COLORS[currentTheme]);
  const label = $derived(THEME_OPTIONS.find((opt) => opt.value === currentTheme)?.label ?? currentTheme);
</script>

<button
  class="theme-toggle"
  onclick={() => isOpen = true}
  aria-label="Select theme"
>
  <Palette size={20} />
  <span class="label">{label}</span>
  <span class="dot" style="background-color: {colors.text}"></span>
</button>

<ThemeSelectorModal
  {isOpen}
  onClose={() => isOpen = false}
  currentTheme={currentTheme}
  {onSelect}
/>

<style>
  .theme-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 0.375rem 0.75rem;
    cursor: pointer;
    color: var(--text);
    font-size: 0.875rem;
    font-family: var(--font-family-sans);
    transition: background-color 0.15s, border-color 0.15s;
    white-space: nowrap;
    max-width: 160px;
  }

  .theme-toggle:hover {
    background: var(--border);
  }

  .label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100px;
  }

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    flex-shrink: 0;
    display: block;
  }
</style>
