import { css } from 'lit';

export const theme = css`
  :host {
    /* Light theme colors */
    --primary-color: #ea580c;
    --primary-hover: #c2410c;
    --secondary-color: #4f46e5;
    --secondary-hover: #3730a3;
    --danger-color: #dc2626;
    --danger-hover: #991b1b;
    --success-color: #16a34a;
    --success-hover: #15803d;
    
    /* Light theme neutral colors */
    --white: #ffffff;
    --gray-50: #f9fafb;
    --gray-100: #f3f4f6;
    --gray-200: #e5e7eb;
    --gray-300: #d1d5db;
    --gray-400: #9ca3af;
    --gray-500: #6b7280;
    --gray-600: #4b5563;
    --gray-700: #374151;
    --gray-800: #1f2937;
    --gray-900: #111827;
    
    /* Background and text colors for light theme */
    --bg-primary: #ffffff;
    --bg-secondary: #f9fafb;
    --text-primary: #111827;
    --text-secondary: #6b7280;
    --border-color: #e5e7eb;
    
    /* Typography */
    --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    --font-size-xs: 0.75rem;
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.5rem;
    --font-size-3xl: 1.875rem;
    --font-size-4xl: 2.25rem;
    
    /* Font weights */
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    
    /* Spacing */
    --spacing-1: 0.25rem;
    --spacing-2: 0.5rem;
    --spacing-3: 0.75rem;
    --spacing-4: 1rem;
    --spacing-5: 1.25rem;
    --spacing-6: 1.5rem;
    --spacing-8: 2rem;
    --spacing-10: 2.5rem;
    --spacing-12: 3rem;
    
    /* Border radius */
    --radius-sm: 0.25rem;
    --radius-md: 0.375rem;
    --radius-lg: 0.5rem;
    --radius-xl: 0.75rem;
    
    /* Shadows */
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    
    /* Transitions */
    --transition-fast: 150ms ease-in-out;
    --transition-normal: 250ms ease-in-out;
    --transition-slow: 300ms ease-in-out;
  }

  /* Dark theme */
  :host([data-theme="dark"]) {
    /* Dark theme colors */
    --bg-primary: #0f172a;
    --bg-secondary: #1e293b;
    --text-primary: #f8fafc;
    --text-secondary: #cbd5e1;
    --border-color: #334155;
    
    /* Dark theme neutral colors */
    --white: #0f172a;
    --gray-50: #1e293b;
    --gray-100: #334155;
    --gray-200: #475569;
    --gray-300: #64748b;
    --gray-400: #94a3b8;
    --gray-500: #cbd5e1;
    --gray-600: #e2e8f0;
    --gray-700: #f1f5f9;
    --gray-800: #f8fafc;
    --gray-900: #ffffff;
    
    /* Dark theme shadows */
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.4);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.4);
  }
`;

export const commonStyles = css`
  /* Reset and basic styles */
  * {
    box-sizing: border-box;
  }
  
  /* Button styles */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-2) var(--spacing-4);
    border-radius: var(--radius-md);
    border: none;
    font-family: var(--font-family);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    cursor: pointer;
    transition: all var(--transition-fast);
    text-decoration: none;
  }
  
  .btn-primary {
    background-color: var(--primary-color);
    color: #ffffff;
  }
  
  .btn-primary:hover {
    background-color: var(--primary-hover);
  }
  
  .btn-secondary {
    background-color: var(--secondary-color);
    color: #ffffff;
  }
  
  .btn-secondary:hover {
    background-color: var(--secondary-hover);
  }
  
  .btn-danger {
    background-color: var(--danger-color);
    color: #ffffff;
  }
  
  .btn-danger:hover {
    background-color: var(--danger-hover);
  }
  
  .btn-outline {
    background-color: transparent;
    border: 1px solid var(--border-color);
    color: var(--text-primary);
  }
  
  .btn-outline:hover {
    background-color: var(--bg-secondary);
  }
  
  /* Form elements */
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
  
  .form-label {
    display: block;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--text-primary);
    margin-bottom: var(--spacing-1);
  }
  
  /* Card styles */
  .card {
    background-color: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    padding: var(--spacing-6);
    transition: background-color var(--transition-normal), border-color var(--transition-normal);
  }
  
  /* Table styles */
  .table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .table th {
    padding: var(--spacing-3) var(--spacing-6);
    text-align: left;
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background-color: var(--bg-secondary);
    border-bottom: 1px solid var(--border-color);
  }
  
  .table td {
    padding: var(--spacing-4) var(--spacing-6);
    border-bottom: 1px solid var(--border-color);
    font-size: var(--font-size-sm);
    color: var(--text-primary);
  }
  
  .table tbody tr:hover {
    background-color: var(--bg-secondary);
  }

  .theme-toggle {
    width: 2.5rem;
    height: 2.5rem;
  }
`; 