import { LitElement, html, css } from 'lit';
import { employeeService } from '../store/employee-service.js';
import '../components/employee-table.js';
import '../components/employee-card-list.js';
import '../components/header.js';
import '../components/confirm-modal.js';
import { theme, commonStyles } from '../styles/theme.js';
import { withI18n } from '../localization/i18n.js';

class EmployeeListPage extends withI18n(LitElement) {
  static properties = {
    employees: { type: Array },
    view: { type: String },
    searchQuery: { type: String },
    currentPage: { type: Number },
    isModalOpen: { type: Boolean },
    employeeToDelete: { type: Object },
  };

  constructor() {
    super();
    this.employees = [];
    this.view = 'table';
    this.searchQuery = '';
    this.currentPage = 1;
    this.itemsPerPage = 8;
    this.isModalOpen = false;
    this.employeeToDelete = null;
    this.addEventListener('edit-employee', this._handleEdit);
    this.addEventListener('delete-employee', this._handleDelete);
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadEmployees();

    this.handleThemeChange = (e) => this.setAttribute('data-theme', e.detail.theme);
    window.addEventListener('theme-changed', this.handleThemeChange);
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.setAttribute('data-theme', savedTheme);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('edit-employee', this._handleEdit);
    this.removeEventListener('delete-employee', this._handleDelete);
    window.removeEventListener('theme-changed', this.handleThemeChange);
  }
  
  _loadEmployees() {
    this.employees = employeeService.getEmployees();
    this.requestUpdate();
  }

  _handleEdit(e) {
    const employee = e.detail;
    window.history.pushState({}, '', `/employees/edit/${employee.id}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  _handleDelete(e) {
    this.employeeToDelete = e.detail;
    this.isModalOpen = true;
  }

  _confirmDelete() {
    if (this.employeeToDelete) {
      employeeService.deleteEmployee(this.employeeToDelete.id);
      this._loadEmployees();
    }
    this._closeModal();
  }

  _closeModal() {
    this.isModalOpen = false;
    this.employeeToDelete = null;
  }

  static styles = [
    theme,
    commonStyles,
    css`
      :host {
        display: block;
      }
      
      .title {
        font-size: var(--font-size-4xl);
        font-weight: var(--font-weight-bold);
        color: var(--text-primary);
        margin-bottom: var(--spacing-8);
        transition: color var(--transition-normal);
      }
      
      .controls {
        margin-bottom: var(--spacing-4);
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--spacing-4);
      }
      
      .search-container {
        flex: 1;
        max-width: 400px;
      }
      
      .search-input {
        width: 100%;
        padding: var(--spacing-2) var(--spacing-4);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-sm);
        font-family: var(--font-family);
        font-size: var(--font-size-sm);
        background-color: var(--bg-primary);
        color: var(--text-primary);
        transition: border-color var(--transition-fast), background-color var(--transition-fast), color var(--transition-fast);
      }
      
      .search-input:focus {
        outline: none;
        border-color: var(--secondary-color);
        box-shadow: 0 0 0 3px rgb(79 70 229 / 0.1);
      }
      
      .view-buttons {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
      
      .view-button {
        padding: var(--spacing-2);
        background-color: var(--bg-primary);
        border: 1px solid var(--border-color);
        color: var(--text-primary);
        cursor: pointer;
        transition: all var(--transition-fast);
        font-size: var(--font-size-sm);
      }
      
      .view-button.active {
        background-color: var(--primary-color);
        color: #ffffff;
        border-color: var(--primary-color);
      }
      
      .view-button:first-child {
        border-top-left-radius: var(--radius-md);
        border-bottom-left-radius: var(--radius-md);
      }
      
      .view-button:last-child {
        border-top-right-radius: var(--radius-md);
        border-bottom-right-radius: var(--radius-md);
      }
      
      .view-button:hover:not(.active) {
        background-color: var(--bg-secondary);
      }
      
      .pagination {
        margin-top: var(--spacing-8);
        display: flex;
        justify-content: center;
        align-items: center;
        gap: var(--spacing-2);
      }
      
      .pagination-button {
        padding: var(--spacing-1) var(--spacing-3);
        border-radius: var(--radius-md);
        background-color: var(--bg-primary);
        border: 1px solid var(--border-color);
        color: var(--text-primary);
        cursor: pointer;
        font-size: var(--font-size-sm);
        transition: all var(--transition-fast);
      }
      
      .pagination-button:hover:not(:disabled) {
        background-color: var(--bg-secondary);
        border-color: var(--gray-400);
      }
      
      .pagination-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      .pagination-info {
        margin: 0 var(--spacing-2);
        color: var(--text-secondary);
        font-size: var(--font-size-sm);
      }
      
      @media (max-width: 768px) {
        .controls {
          flex-direction: column;
          align-items: stretch;
          gap: var(--spacing-3);
        }
        
        .search-container {
          max-width: none;
        }
        
        .view-buttons {
          justify-content: center;
        }
        
        .title {
          font-size: var(--font-size-3xl);
        }
      }
    `
  ];

  render() {
    const filteredEmployees = this.employees.filter(employee =>
        `${employee.firstName} ${employee.lastName} ${employee.email}`
        .toLowerCase()
        .includes(this.searchQuery.toLowerCase())
    );

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredEmployees.length / this.itemsPerPage);

    return html`
      <div class="container">
        <app-header></app-header>

        <h1 class="title">${this.t('employeeList')}</h1>

        <div class="controls">
          <div class="search-container">
            <input 
              type="text" 
              placeholder="${this.t('searchEmployees')}" 
              class="search-input"
              .value=${this.searchQuery}
              @input=${(e) => this.searchQuery = e.target.value}
            >
          </div>
          <div class="view-buttons">
            <button 
              class="view-button ${this.view === 'table' ? 'active' : ''}"
              @click=${() => this.view = 'table'}
            >
              ${this.t('table')}
            </button>
            <button 
              class="view-button ${this.view === 'cards' ? 'active' : ''}"
              @click=${() => this.view = 'cards'}
            >
              ${this.t('cards')}
            </button>
          </div>
        </div>

        ${this.view === 'table' 
          ? html`<employee-table .employees=${paginatedEmployees}></employee-table>`
          : html`<employee-card-list .employees=${paginatedEmployees}></employee-card-list>`
        }

        ${totalPages > 1 ? html`
          <div class="pagination">
            <button 
              class="pagination-button"
              ?disabled=${this.currentPage === 1}
              @click=${() => this.currentPage = Math.max(1, this.currentPage - 1)}
            >
              ${this.t('previous')}
            </button>
            <span class="pagination-info">
              ${this.t('page')} ${this.currentPage} ${this.t('of')} ${totalPages}
            </span>
            <button 
              class="pagination-button"
              ?disabled=${this.currentPage === totalPages}
              @click=${() => this.currentPage = Math.min(totalPages, this.currentPage + 1)}
            >
              ${this.t('next')}
            </button>
          </div>
        ` : ''}
      </div>
      
      <confirm-modal
        .isOpen=${this.isModalOpen}
        .message=${this.employeeToDelete ? this.t('confirmDelete', { name: `${this.employeeToDelete.firstName} ${this.employeeToDelete.lastName}` }) : ''}
        @proceed=${this._confirmDelete}
        @cancel=${this._closeModal}
      ></confirm-modal>
    `;
  }
}

customElements.define('employee-list-page', EmployeeListPage); 