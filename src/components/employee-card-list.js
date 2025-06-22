import { LitElement, html, css } from 'lit';
import { theme, commonStyles } from '../styles/theme.js';
import { withI18n } from '../localization/i18n.js';

class EmployeeCardList extends withI18n(LitElement) {
  static properties = {
    employees: { type: Array },
  };

  connectedCallback() {
    super.connectedCallback();
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
      :host {
        display: block;
      }
      
      .card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: var(--spacing-4);
      }
      
      .employee-card {
        background-color: var(--bg-primary);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-md);
        padding: var(--spacing-6);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: transform var(--transition-fast), box-shadow var(--transition-fast), background-color var(--transition-normal), border-color var(--transition-normal);
      }
      
      .employee-card:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
      }
      
      .employee-name {
        font-weight: var(--font-weight-bold);
        font-size: var(--font-size-xl);
        margin-bottom: var(--spacing-2);
        color: var(--text-primary);
      }
      
      .employee-info {
        color: var(--text-secondary);
        font-size: var(--font-size-sm);
        margin-bottom: var(--spacing-1);
        line-height: 1.5;
      }
      
      .employee-info strong {
        font-weight: var(--font-weight-semibold);
        color: var(--text-primary);
      }
      
      .actions {
        display: flex;
        justify-content: flex-end;
        gap: var(--spacing-2);
        margin-top: var(--spacing-4);
        padding-top: var(--spacing-4);
        border-top: 1px solid var(--border-color);
      }
      
      .edit-button {
        background-color: var(--secondary-color);
        color: #ffffff;
        padding: var(--spacing-2) var(--spacing-3);
        border-radius: var(--radius-md);
        border: none;
        cursor: pointer;
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
        transition: background-color var(--transition-fast);
      }
      
      .edit-button:hover {
        background-color: var(--secondary-hover);
      }
      
      .delete-button {
        background-color: var(--danger-color);
        color: #ffffff;
        padding: var(--spacing-2) var(--spacing-3);
        border-radius: var(--radius-md);
        border: none;
        cursor: pointer;
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
        transition: background-color var(--transition-fast);
      }
      
      .delete-button:hover {
        background-color: var(--danger-hover);
      }
      
      @media (max-width: 768px) {
        .card-grid {
          grid-template-columns: 1fr;
          gap: var(--spacing-3);
        }
        
        .employee-card {
          padding: var(--spacing-4);
        }
      }
    `
  ];

  _editEmployee(employee) {
    this.dispatchEvent(new CustomEvent('edit-employee', { 
      detail: employee, 
      bubbles: true, 
      composed: true 
    }));
  }

  _deleteEmployee(employee) {
    this.dispatchEvent(new CustomEvent('delete-employee', { 
      detail: employee, 
      bubbles: true, 
      composed: true 
    }));
  }

  render() {
    return html`
      <div class="card-grid">
        ${this.employees.map(
          (employee) => html`
            <div class="employee-card">
              <div>
                <div class="employee-name">${employee.firstName} ${employee.lastName}</div>
                <p class="employee-info"><strong>${this.t('email')}:</strong> ${employee.email}</p>
                <p class="employee-info"><strong>${this.t('phone')}:</strong> ${employee.phone}</p>
                <p class="employee-info"><strong>${this.t('department')}:</strong> ${employee.department}</p>
                <p class="employee-info"><strong>${this.t('position')}:</strong> ${employee.position}</p>
              </div>
              <div class="actions">
                <button @click=${() => this._editEmployee(employee)} class="edit-button">
                  ${this.t('edit')}
                </button>
                <button @click=${() => this._deleteEmployee(employee)} class="delete-button">
                  ${this.t('delete')}
                </button>
              </div>
            </div>
          `
        )}
      </div>
    `;
  }
}

customElements.define('employee-card-list', EmployeeCardList); 