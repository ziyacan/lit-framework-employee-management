import { LitElement, html, css } from 'lit'
import { router } from './router/router.js'
import { theme, commonStyles } from './styles/theme.js'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
class AppShell extends LitElement {
  static styles = [
    theme,
    commonStyles,
    css`
      :host {
        display: block;
        margin: 0 auto;
        font-family: var(--font-family);
        min-height: 100vh;
        background-color: var(--bg-primary);
        color: var(--text-primary);
        transition: background-color var(--transition-normal), color var(--transition-normal);
        padding: var(--spacing-4);
      }

      main {
        border-radius: var(--radius-lg);
        background-color: var(--bg-primary);
        transition: background-color var(--transition-normal);
        min-height: calc(100vh - 2rem);
        padding: var(--spacing-4);
      }

      #outlet {
        min-height: 400px;
        background-color: var(--bg-primary);
        transition: background-color var(--transition-normal);
      }

      @media (max-width: 768px) {
        :host {
          padding: var(--spacing-2);
        }
        
        main {
          padding: var(--spacing-2);
        }
      }

      .logo {
        height: 6em;
        padding: 1.5em;
        will-change: filter;
        transition: filter 300ms;
      }
      .logo:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
      }
      .logo.lit:hover {
        filter: drop-shadow(0 0 2em #325cffaa);
      }

      .card {
        padding: 2em;
        background-color: var(--bg-primary);
        border: 1px solid var(--border-color);
        transition: background-color var(--transition-normal), border-color var(--transition-normal);
      }

      .read-the-docs {
        color: var(--text-secondary);
      }

      a {
        font-weight: 500;
        color: var(--primary-color);
        text-decoration: inherit;
      }
      a:hover {
        color: var(--primary-hover);
      }

      ::slotted(h1) {
        font-size: 3.2em;
        line-height: 1.1;
        color: var(--text-primary);
      }

      button {
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        background-color: var(--bg-secondary);
        color: var(--text-primary);
        cursor: pointer;
        transition: border-color 0.25s, background-color var(--transition-fast), color var(--transition-fast);
      }
      button:hover {
        border-color: var(--primary-color);
      }
      button:focus,
      button:focus-visible {
        outline: 4px auto -webkit-focus-ring-color;
      }
    `
  ]

  constructor() {
    super();
    this.initializeTheme();
  }

  connectedCallback() {
    super.connectedCallback();
    this.handleThemeChange = (e) => this.setAttribute('data-theme', e.detail.theme);
    window.addEventListener('theme-changed', this.handleThemeChange);
  }

  disconnectedCallback() {
    window.removeEventListener('theme-changed', this.handleThemeChange);
    super.disconnectedCallback();
  }

  initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.setAttribute('data-theme', savedTheme);
  }

  firstUpdated() {
    router.setOutlet(this.shadowRoot.querySelector('#outlet'))
  }

  render() {
    return html`
      <main>
        <div id="outlet"></div>
      </main>
    `
  }
}

customElements.define('app-shell', AppShell)
