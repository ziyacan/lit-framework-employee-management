import { LitElement, html, css } from 'lit';
import { theme, commonStyles } from '../styles/theme.js';
import { withI18n } from '../localization/i18n.js';

class EmployeeTable extends withI18n(LitElement) {
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
      
      .table-container {
        background-color: var(--bg-primary);
        box-shadow: var(--shadow-md);
        border-radius: var(--radius-lg);
        overflow-x: auto;
        border: 1px solid var(--border-color);
        transition: background-color var(--transition-normal), border-color var(--transition-normal);
      }
      
      .table {
        min-width: 100%;
        border-collapse: collapse;
      }
      
      .table thead {
        background-color: var(--bg-secondary);
      }
      
      .table th {
        padding: var(--spacing-3) var(--spacing-6);
        text-align: left;
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-medium);
        color: var(--text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        border-bottom: 1px solid var(--border-color);
      }
      
      .table tbody {
        background-color: var(--bg-primary);
      }
      
      .table tr {
        border-bottom: 1px solid var(--border-color);
        transition: background-color var(--transition-fast);
      }
      
      .table tr:hover {
        background-color: var(--bg-secondary);
      }
      
      .table td {
        padding: var(--spacing-4) var(--spacing-6);
        white-space: nowrap;
        font-size: var(--font-size-sm);
        vertical-align: middle;
        color: var(--text-primary);
      }
      
      .name-cell {
        font-weight: var(--font-weight-semibold);
        color: var(--text-primary);
      }
      
      .data-cell {
        color: var(--text-secondary);
      }
      
      .actions {
        font-weight: var(--font-weight-medium);
        white-space: nowrap;
      }
      
      .actions button {
        padding: var(--spacing-2) var(--spacing-3);
        border-radius: var(--radius-md);
        cursor: pointer;
        margin-right: var(--spacing-2);
        border: none;
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
        transition: all var(--transition-fast);
      }
      
      .edit-button {
        background-color: var(--secondary-color);
        color: #ffffff;
      }
      
      .edit-button:hover {
        background-color: var(--secondary-hover);
        transform: translateY(-1px);
      }
      
      .delete-button {
        background-color: var(--danger-color);
        color: #ffffff;
      }
      
      .delete-button:hover {
        background-color: var(--danger-hover);
        transform: translateY(-1px);
      }
      
      @media (max-width: 1024px) {
        .table-container {
          overflow-x: auto;
        }
        
        .table {
          min-width: 800px;
        }
      }
      
      @media (max-width: 768px) {
        .table th,
        .table td {
          padding: var(--spacing-2) var(--spacing-3);
        }
        
        .actions button {
          padding: var(--spacing-1) var(--spacing-2);
          font-size: var(--font-size-xs);
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
      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">${this.t('firstName')}</th>
              <th scope="col">${this.t('lastName')}</th>
              <th scope="col">${this.t('hireDate')}</th>
              <th scope="col">${this.t('dateOfBirth')}</th>
              <th scope="col">${this.t('phone')}</th>
              <th scope="col">${this.t('email')}</th>
              <th scope="col">${this.t('department')}</th>
              <th scope="col">${this.t('position')}</th>
              <th scope="col">${this.t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            ${this.employees.map(
              (employee) => html`
                <tr>
                  <td class="name-cell">${employee.firstName}</td>
                  <td class="data-cell">${employee.lastName}</td>
                  <td class="data-cell">${employee.dateOfEmployment}</td>
                  <td class="data-cell">${employee.dateOfBirth}</td>
                  <td class="data-cell">${employee.phone}</td>
                  <td class="data-cell">${employee.email}</td>
                  <td class="data-cell">${employee.department}</td>
                  <td class="data-cell">${employee.position}</td>
                  <td class="actions">
                    <button @click=${() => this._editEmployee(employee)} class="edit-button">
                      ${this.t('edit')}
                    </button>
                    <button @click=${() => this._deleteEmployee(employee)} class="delete-button">
                      ${this.t('delete')}
                    </button>
                  </td>
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
    `;
  }
}

customElements.define('employee-table', EmployeeTable); 