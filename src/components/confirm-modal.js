import { LitElement, html, css } from 'lit';
import { theme, commonStyles } from '../styles/theme.js';
import { withI18n } from '../localization/i18n.js';

class ConfirmModal extends withI18n(LitElement) {
  static properties = {
    isOpen: { type: Boolean },
    message: { type: String },
    title: { type: String },
  };

  constructor() {
    super();
    this.isOpen = false;
    this.message = '';
    this.title = 'areYouSure';
    
    this.handleThemeChange = (e) => this.setAttribute('data-theme', e.detail.theme);
    window.addEventListener('theme-changed', this.handleThemeChange);
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.setAttribute('data-theme', savedTheme);
  }

  disconnectedCallback() {
    window.removeEventListener('theme-changed', this.handleThemeChange);
    super.disconnectedCallback();
  }

  static styles = [
    theme,
    commonStyles,
    css`
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
      }
      .modal-overlay.open {
        opacity: 1;
        visibility: visible;
      }
      .modal-content {
        background-color: var(--bg-primary);
        padding: var(--spacing-8);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-xl);
        width: 90%;
        max-width: 400px;
        text-align: center;
        transform: scale(0.95);
        transition: transform 0.3s ease, background-color 0.3s ease, color 0.3s ease;
        position: relative;
      }
      .modal-overlay.open .modal-content {
        transform: scale(1);
      }
      .modal-title {
        font-size: var(--font-size-2xl);
        font-weight: var(--font-weight-bold);
        color: var(--primary-color);
        margin-bottom: var(--spacing-4);
      }
      .modal-text {
        font-size: var(--font-size-md);
        color: var(--text-secondary);
        margin-bottom: var(--spacing-6);
      }
      .modal-buttons {
        display: flex;
        justify-content: center;
        gap: var(--spacing-4);
      }
      .btn {
        padding: var(--spacing-2) var(--spacing-6);
        border-radius: var(--radius-md);
        border: none;
        cursor: pointer;
        font-size: var(--font-size-md);
        font-weight: var(--font-weight-medium);
        transition: background-color var(--transition-fast);
      }
      .btn-proceed {
        background-color: var(--primary-color);
        color: var(--white);
      }
      .btn-proceed:hover {
        background-color: var(--primary-hover);
      }
      .btn-cancel {
        background-color: transparent;
        color: var(--text-primary);
        border: 1px solid var(--border-color);
      }
      .btn-cancel:hover {
        background-color: var(--bg-secondary);
      }
      .close-button {
        position: absolute;
        top: var(--spacing-4);
        right: var(--spacing-4);
        background: transparent;
        border: none;
        font-size: var(--font-size-2xl);
        cursor: pointer;
        color: var(--text-secondary);
        padding: 0;
        line-height: 1;
      }
    `,
  ];

  render() {
    if (!this.isOpen) return html``;

    return html`
      <div class="modal-overlay ${this.isOpen ? 'open' : ''}" @click=${this._handleOverlayClick}>
        <div class="modal-content">
          <button class="close-button" @click=${this._handleCancel}>&times;</button>
          <h2 class="modal-title">${this.t(this.title)}</h2>
          <p class="modal-text">${this.message}</p>
          <div class="modal-buttons">
            <button class="btn btn-cancel" @click=${this._handleCancel}>${this.t('cancel')}</button>
            <button class="btn btn-proceed" @click=${this._handleProceed}>${this.t('proceed')}</button>
          </div>
        </div>
      </div>
    `;
  }

  _handleOverlayClick(e) {
    if (e.target.classList.contains('modal-overlay')) {
      this._handleCancel();
    }
  }
  
  _handleProceed() {
    this.dispatchEvent(new CustomEvent('proceed', { bubbles: true, composed: true }));
    this.isOpen = false;
  }

  _handleCancel() {
    this.dispatchEvent(new CustomEvent('cancel', { bubbles: true, composed: true }));
    this.isOpen = false;
  }
}

customElements.define('confirm-modal', ConfirmModal); 