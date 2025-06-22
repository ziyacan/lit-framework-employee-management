import { LitElement, html, css } from 'lit';
import { theme, commonStyles } from '../styles/theme.js';
import { withI18n } from '../localization/i18n.js';

class NotFoundPage extends withI18n(LitElement) {
  static styles = [
    theme,
    commonStyles,
    css`
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: var(--gray-50);
        font-family: var(--font-family);
      }
      
      .error-container {
        text-align: center;
        padding: var(--spacing-8);
        background-color: var(--white);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        max-width: 500px;
        margin: 0 var(--spacing-4);
      }
      
      .error-code {
        font-size: 6rem;
        font-weight: var(--font-weight-bold);
        color: var(--primary-color);
        margin: 0;
        line-height: 1;
      }
      
      .error-message {
        font-size: var(--font-size-2xl);
        font-weight: var(--font-weight-semibold);
        color: var(--gray-900);
        margin: var(--spacing-4) 0;
      }
      
      .error-description {
        font-size: var(--font-size-lg);
        color: var(--gray-600);
        margin-bottom: var(--spacing-6);
        line-height: 1.5;
      }
      
      .back-button {
        background-color: var(--primary-color);
        color: var(--white);
        padding: var(--spacing-3) var(--spacing-6);
        border-radius: var(--radius-md);
        border: none;
        cursor: pointer;
        font-size: var(--font-size-base);
        font-weight: var(--font-weight-medium);
        text-decoration: none;
        display: inline-block;
        transition: background-color var(--transition-fast);
      }
      
      .back-button:hover {
        background-color: var(--primary-hover);
      }
      
      @media (max-width: 768px) {
        .error-container {
          padding: var(--spacing-6);
          margin: 0 var(--spacing-2);
        }
        
        .error-code {
          font-size: 4rem;
        }
        
        .error-message {
          font-size: var(--font-size-xl);
        }
        
        .error-description {
          font-size: var(--font-size-base);
        }
      }
    `
  ];

  render() {
    return html`
      <div class="error-container">
        <h1 class="error-code">404</h1>
        <h2 class="error-message">${this.t('notFound')}</h2>
        <p class="error-description">
          ${this.t('pageNotFound')}
        </p>
        <a href="/" class="back-button">${this.t('goHome')}</a>
      </div>
    `;
  }
}

customElements.define('not-found-page', NotFoundPage); 