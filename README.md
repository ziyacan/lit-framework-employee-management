# Employee Management System

A modern, responsive employee management application built with LitElement (JavaScript) for ING Hubs Frontend interview project.

## 🌐 Live Demo

**[View Live Demo](https://lit-framework-employee-management.vercel.app/)**

## 📋 Overview

This is a comprehensive employee management system designed for HR professionals to manage company employee information. The application provides full CRUD (Create, Read, Update, Delete) operations with a modern, responsive interface.

## ✨ Features

### 🔍 Employee Management
- **List View**: Display employees in both list and table formats
- **Search & Pagination**: Advanced filtering and pagination support
- **Add Employee**: Complete form with validation for new employee registration
- **Edit Employee**: Update existing employee information
- **Delete Employee**: Safe deletion with confirmation dialogs

### 🎨 User Experience
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Theme**: Toggle between themes with persistent preference
- **Internationalization**: Full support for English and Turkish languages
- **Modern UI**: Clean, intuitive interface with smooth transitions

### 📊 Employee Data Fields
- First Name & Last Name
- Hire Date & Birth Date
- Phone Number & Email Address
- Department (Analytics, Tech)
- Position (Junior, Medior, Senior)

## 🛠️ Technology Stack

- **Frontend Framework**: [LitElement](https://lit.dev/) (JavaScript)
- **Routing**: [Vaadin Router](https://vaadin.com/router)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **State Management**: Custom implementation with browser storage
- **Styling**: CSS with CSS Custom Properties for theming
- **Deployment**: [Vercel](https://vercel.com/)

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ziyacan/lit-framework-employee-management.git
   cd lit-framework-employee-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
employee-management-lit/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── confirm-modal.js
│   │   ├── employee-card-list.js
│   │   ├── employee-table.js
│   │   └── header.js
│   ├── pages/              # Page components
│   │   ├── employee-form-page.js
│   │   ├── employee-list.js
│   │   └── not-found.js
│   ├── router/             # Routing configuration
│   │   └── router.js
│   ├── store/              # Data management
│   │   └── employee-service.js
│   ├── localization/       # Internationalization
│   │   ├── i18n.js
│   │   └── translations.js
│   ├── styles/             # Global styles and themes
│   │   └── theme.js
│   └── app-shell.js        # Main application shell
├── public/                 # Static assets
├── index.html              # Entry point
└── package.json
```

## 🎯 Key Features Implementation

### State Management
- Browser-based storage using localStorage
- Reactive data updates across components
- No external state management libraries required

### Routing
- Client-side routing with Vaadin Router
- Clean URL structure
- Navigation guards and error handling

### Internationalization
- Dynamic language switching
- HTML lang attribute integration
- Comprehensive translation system

### Responsive Design
- Mobile-first approach
- CSS Grid and Flexbox layouts
- Breakpoint-based responsive design

## 🌍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

This project is created for the ING Hubs Frontend interview process.

---

**Built with ❤️ using LitElement** 