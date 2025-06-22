import { LitElement, html, css } from 'lit';
import { employeeService } from '../store/employee-service.js';
import '../components/header.js';
import '../components/confirm-modal.js';
import { theme, commonStyles } from '../styles/theme.js';
import { withI18n } from '../localization/i18n.js';

class EmployeeFormPage extends withI18n(LitElement) {
  static properties = {
    employee: { type: Object },
    isEdit: { type: Boolean },
    location: { type: Object },
    isModalOpen: { type: Boolean },
  };

  constructor() {
    super();
    this.employee = {
      firstName: '',
      lastName: '',
      dateOfEmployment: '',
      dateOfBirth: '',
      phone: '',
      email: '',
      department: 'Analytics',
      position: 'Junior',
    };
    this.isEdit = false;
    this.isModalOpen = false;
  }

  connectedCallback() {
    super.connectedCallback();
    const id = this.location.params.id;
    if (id) {
      const employee = employeeService.getEmployee(parseInt(id));
      if (employee) {
        this.employee = { ...employee };
        this.isEdit = true;
      }
    }

    this.handleThemeChange = (e) => this.setAttribute('data-theme', e.detail.theme);
    window.addEventListener('theme-changed', this.handleThemeChange);
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.setAttribute('data-theme', savedTheme);
  }

  disconnectedCallback() {
    window.removeEventListener('theme-changed', this.handleThemeChange);
    super.disconnectedCallback();
  }

  handleInput(e) {
    this.employee = { ...this.employee, [e.target.name]: e.target.value };
  }

  handleKeyDown(e) {
    const { name } = e.target;
    
    if ([8, 9, 27, 13, 46].includes(e.keyCode)) {
      return true;
    }
    
    if (name === 'phone') {
      const allowedChars = /[\d\s\-\+\(\)]/;
      if (!allowedChars.test(e.key)) {
        e.preventDefault();
        return false;
      }
    }
    
    if (name === 'email') {
      const allowedChars = /[a-zA-Z0-9@._\-]/;
      if (!allowedChars.test(e.key)) {
        e.preventDefault();
        return false;
      }
    }
    
    if (name === 'firstName' || name === 'lastName') {
      const allowedChars = /[a-zA-ZğüşıöçĞÜŞİÖÇ\s]/;
      if (!allowedChars.test(e.key)) {
        e.preventDefault();
        return false;
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.isEdit) {
      this.isModalOpen = true;
    } else {
      employeeService.addEmployee(this.employee);
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }

  _confirmUpdate() {
    employeeService.updateEmployee(this.employee);
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
    this._closeModal();
  }

  _closeModal() {
    this.isModalOpen = false;
  }

  static styles = [
    theme,
    commonStyles,
    css`
      :host {
        display: block;
      }
      
      .container {
        min-height: 100vh;
        background-color: var(--bg-primary);
        transition: background-color var(--transition-normal);
      }
      
      .title {
        font-size: var(--font-size-4xl);
        font-weight: var(--font-weight-bold);
        color: var(--primary-color);
        margin-bottom: var(--spacing-8);
      }
      
      .form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-6);
        margin: 0 auto;
        background-color: var(--bg-primary);
        border: 1px solid var(--border-color);
        padding: var(--spacing-8);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-md);
        transition: background-color var(--transition-normal), border-color var(--transition-normal);
      }
      
      .form-group {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-1);
      }

      .form-group.full-width {
        grid-column: 1 / -1;
      }
      
      .form-label {
        display: block;
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
        color: var(--text-primary);
        margin-bottom: var(--spacing-1);
      }
      
      .form-input {
        width: 100%;
        padding: var(--spacing-2) var(--spacing-3);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-md);
        font-family: var(--font-family);
        font-size: var(--font-size-sm);
        background-color: var(--bg-primary);
        color: var(--text-primary);
        box-shadow: var(--shadow-sm);
        transition: border-color var(--transition-fast), background-color var(--transition-fast), color var(--transition-fast);
      }
      
      .form-input:focus {
        outline: none;
        border-color: var(--secondary-color);
        box-shadow: 0 0 0 3px rgb(79 70 229 / 0.1);
      }
      
      .form-select {
        width: 100%;
        padding: var(--spacing-2) var(--spacing-3);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-md);
        font-family: var(--font-family);
        font-size: var(--font-size-sm);
        background-color: var(--bg-primary);
        color: var(--text-primary);
        box-shadow: var(--shadow-sm);
        transition: border-color var(--transition-fast), background-color var(--transition-fast), color var(--transition-fast);
        cursor: pointer;
      }
      
      .form-select:focus {
        outline: none;
        border-color: var(--secondary-color);
        box-shadow: 0 0 0 3px rgb(79 70 229 / 0.1);
      }
      
      .button-group {
        display: flex;
        justify-content: flex-end;
        gap: var(--spacing-4);
        margin-top: var(--spacing-6);
        padding-top: var(--spacing-6);
        border-top: 1px solid var(--border-color);
        grid-column: 1 / -1;
      }
      
      .btn-cancel {
        background-color: var(--bg-secondary);
        color: var(--text-primary);
        padding: var(--spacing-2) var(--spacing-4);
        border-radius: var(--radius-md);
        border: 1px solid var(--border-color);
        cursor: pointer;
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
        transition: background-color var(--transition-fast), border-color var(--transition-fast);
      }
      
      .btn-cancel:hover {
        background-color: var(--gray-100);
        border-color: var(--gray-300);
      }
      
      .btn-submit {
        background-color: var(--primary-color);
        color: var(--white);
        padding: var(--spacing-2) var(--spacing-4);
        border-radius: var(--radius-md);
        border: none;
        cursor: pointer;
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
        transition: background-color var(--transition-fast);
      }
      
      .btn-submit:hover {
        background-color: var(--primary-hover);
      }
      
      @media (max-width: 768px) {
        .form {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-4);
          padding: var(--spacing-4);
          max-width: 600px;
        }
        
        .form-group.full-width {
          grid-column: auto;
        }
        
        .title {
          font-size: var(--font-size-3xl);
        }
        
        .button-group {
          flex-direction: column;
          grid-column: auto;
        }
      }
    `
  ];

  render() {
    return html`
      <div class="container">
        <app-header .showAddButton=${false}></app-header>
        
        <h1 class="title">
          ${this.isEdit ? this.t('editEmployee') : this.t('addNewEmployee')}
        </h1>
        <form @submit=${this.handleSubmit} class="form">
          <div class="form-group">
            <label for="firstName" class="form-label">${this.t('firstName')}</label>
            <input 
              type="text" 
              name="firstName" 
              .value=${this.employee.firstName} 
              @input=${this.handleInput} 
              @keydown=${this.handleKeyDown}
              required 
              class="form-input"
            >
          </div>
          <div class="form-group">
            <label for="lastName" class="form-label">${this.t('lastName')}</label>
            <input 
              type="text" 
              name="lastName" 
              .value=${this.employee.lastName} 
              @input=${this.handleInput} 
              @keydown=${this.handleKeyDown}
              required 
              class="form-input"
            >
          </div>
          <div class="form-group">
            <label for="dateOfEmployment" class="form-label">${this.t('hireDate')}</label>
            <input 
              type="date" 
              name="dateOfEmployment" 
              .value=${this.employee.dateOfEmployment} 
              @input=${this.handleInput} 
              required 
              class="form-input"
            >
          </div>
          <div class="form-group">
            <label for="dateOfBirth" class="form-label">${this.t('dateOfBirth')}</label>
            <input 
              type="date" 
              name="dateOfBirth" 
              .value=${this.employee.dateOfBirth} 
              @input=${this.handleInput} 
              required 
              class="form-input"
            >
          </div>
          <div class="form-group">
            <label for="email" class="form-label">${this.t('email')}</label>
            <input 
              type="email" 
              name="email" 
              .value=${this.employee.email} 
              @input=${this.handleInput} 
              @keydown=${this.handleKeyDown}
              required 
              class="form-input"
            >
          </div>
          <div class="form-group">
            <label for="phone" class="form-label">${this.t('phone')}</label>
            <input 
              type="tel" 
              name="phone" 
              .value=${this.employee.phone} 
              @input=${this.handleInput} 
              @keydown=${this.handleKeyDown}
              required 
              class="form-input"
            >
          </div>
          <div class="form-group">
            <label for="department" class="form-label">${this.t('department')}</label>
            <select 
              name="department" 
              .value=${this.employee.department} 
              @change=${this.handleInput} 
              class="form-select"
            >
              <option value="Analytics">${this.t('analytics')}</option>
              <option value="Tech">${this.t('tech')}</option>
              <option value="Marketing">${this.t('marketing')}</option>
              <option value="Sales">${this.t('sales')}</option>
              <option value="HR">${this.t('hr')}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="position" class="form-label">${this.t('position')}</label>
            <select 
              name="position" 
              .value=${this.employee.position} 
              @change=${this.handleInput} 
              class="form-select"
            >
              <option value="Junior">${this.t('junior')}</option>
              <option value="Senior">${this.t('senior')}</option>
              <option value="Lead">${this.t('lead')}</option>
              <option value="Manager">${this.t('manager')}</option>
              <option value="Director">${this.t('director')}</option>
            </select>
          </div>
          <div class="button-group">
            <button type="button" @click=${() => {
              window.history.pushState({}, '', '/');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }} class="btn-cancel">
              ${this.t('cancel')}
            </button>
            <button type="submit" class="btn-submit">
              ${this.isEdit ? this.t('updateEmployee') : this.t('addEmployee')}
            </button>
          </div>
        </form>
      </div>

      <confirm-modal
        .isOpen=${this.isModalOpen}
        .message=${this.t('confirmUpdate')}
        @proceed=${this._confirmUpdate}
        @cancel=${this._closeModal}
      ></confirm-modal>
    `;
  }
}

customElements.define('employee-form-page', EmployeeFormPage); 