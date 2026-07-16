<script>
  import { Check } from '@lucide/svelte';
  import { THEME_OPTIONS, THEME_COLORS } from '$lib/preferences.js';

  let { isOpen = false, onClose, currentTheme, onSelect } = $props();

  function handleSelect(value) {
    onSelect(value);
    onClose();
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') onClose();
  }

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  let mounted = $state(false);
  $effect(() => {
    if (isOpen) {
      mounted = true;
      document.body.style.overflow = 'hidden';
    } else {
      mounted = false;
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  });
</script>

<svelte:window onkeydown={handleKeydown} />

{#if mounted}
  <div
    class="overlay"
    class:visible={isOpen}
    onclick={handleBackdropClick}
    onkeydown={(e) => { if (e.key === 'Escape') onClose(); }}
    role="dialog"
    aria-modal="true"
    aria-label="Choose a theme"
    tabindex="-1"
  >
    <div class="modal" class:open={isOpen}>
      <div class="header">
        <h2 class="title">Choose a theme</h2>
        <button class="close-btn" onclick={onClose} aria-label="Close theme selector">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div class="grid">
        {#each THEME_OPTIONS as opt (opt.value)}
          {@const colors = THEME_COLORS[opt.value]}
          {@const isSelected = opt.value === currentTheme}
          <div
            class="card"
            class:selected={isSelected}
            data-theme={opt.value}
            role="button"
            tabindex="0"
            onclick={() => handleSelect(opt.value)}
            onkeydown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSelect(opt.value);
              }
            }}
            style="background-color: {colors.surface}"
          >
            <div class="swatches">
              <span class="swatch" style="background-color: {colors.surfaceSecondary}"></span>
              <span class="swatch" style="background-color: {colors.border}"></span>
              <span class="swatch" style="background-color: {colors.success}"></span>
              <span class="swatch" style="background-color: {colors.danger}"></span>
            </div>

            <p class="name" style="color: {colors.text}">
              {opt.label.split(' ')[0]}
            </p>
            {#if opt.label.includes(' ')}
              <p class="name name-sub" style="color: {colors.text}">
                {opt.label.split(' ').slice(1).join(' ')}
              </p>
            {/if}

            <p class="sample" style="color: {colors.textMuted}">Aa</p>

            {#if isSelected}
              <div class="check" style="background-color: {colors.text}">
                <Check class="check-icon" style="color: {colors.surface}" size={12} />
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
  .overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .overlay.visible {
    opacity: 1;
  }

  .modal {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    width: min(90vw, 64rem);
    max-height: 85vh;
    display: flex;
    flex-direction: column;
    transform: scale(0.95) translateY(20px);
    opacity: 0;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  .modal.open {
    transform: scale(1) translateY(0);
    opacity: 1;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--border);
  }

  .title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text);
    font-family: var(--font-family-sans);
  }

  .close-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 6px;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .close-btn:hover {
    background: var(--surface-secondary);
    color: var(--text);
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.75rem;
    padding: 1.5rem;
    overflow-y: auto;
  }

  @media (min-width: 640px) {
    .grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 768px) {
    .grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .card {
    position: relative;
    border-radius: 12px;
    padding: 1rem;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    border: 1px solid transparent;
  }

  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }

  .card:active {
    transform: scale(0.97);
  }

  .card.selected {
    border-color: var(--text);
    outline: 2px solid var(--text);
    outline-offset: 2px;
  }

  .swatches {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    margin-bottom: 0.75rem;
  }

  .swatch {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    display: block;
  }

  .name {
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.25;
    margin: 0;
    font-family: var(--font-family-sans);
  }

  .name-sub {
    margin-top: 0;
  }

  .sample {
    font-size: 0.75rem;
    margin: 0.5rem 0 0;
    font-family: var(--font-family-sans);
  }

  .check {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>
