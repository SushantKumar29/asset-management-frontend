# Digital Asset Management - Frontend

A modern, responsive React frontend for the Digital Asset Management & Media Intelligence Platform. Provides an intuitive interface for managing assets, tracking usage, and accessing analytics insights.

## Project Overview

This frontend application serves as the user interface for the Digital Asset Management platform, enabling users to:

- **Manage Assets** - Upload, view, organize, and delete digital assets
- **Track Metadata** - View and edit asset metadata, tags, and classifications
- **Monitor Usage** - Track asset views, downloads, and sharing across teams
- **View Analytics** - Access dashboards with usage trends and performance metrics
- **Background Jobs** - Monitor async processing tasks and their status
- **Admin Functions** - Manage users, permissions, and system configuration

## Tech Stack

| Category             | Technology                   | Purpose                      |
| -------------------- | ---------------------------- | ---------------------------- |
| **Framework**        | React 18                     | UI library                   |
| **Build Tool**       | Vite                         | Fast development and builds  |
| **Language**         | TypeScript 5                 | Type safety                  |
| **State Management** | Redux Toolkit                | Global state management      |
| **Routing**          | React Router v6              | Client-side routing          |
| **UI Components**    | shadcn/ui                    | Accessible component library |
| **Styling**          | Tailwind CSS                 | Utility-first CSS            |
| **HTTP Client**      | Axios                        | API requests                 |
| **Forms**            | React Hook Form              | Form handling                |
| **Validation**       | Zod                          | Schema validation            |
| **Testing**          | Jest + React Testing Library | Unit and integration tests   |
| **Linting**          | ESLint + Prettier            | Code quality                 |
| **Git Hooks**        | Husky + lint-staged          | Pre-commit checks            |

## Folder Structure

```
asset-management-frontend/
│
├── public/ # Static assets
│ ├── favicon.svg
│ └── icons.svg
│
├── src/
│ ├── app/ # Redux store configuration
│ │ └── store.ts
│ │
│ ├── components/ # Reusable UI components
│ │ ├── asset/ # Asset-related components
│ │ ├── dashboard/ # Dashboard widgets
│ │ ├── forms/ # Form components
│ │ ├── jobs/ # Background jobs components
│ │ ├── ui/ # shadcn/ui base components
│ │ ├── Dashboard.tsx # Main dashboard layout
│ │ ├── Footer.tsx # Global footer
│ │ └── Navbar.tsx # Global navigation
│ │
│ ├── constants/ # Application constants
│ │ ├── assets.ts # Asset-related constants
│ │ ├── auth.ts # Authentication constants
│ │ └── path.ts # Route paths
│ │
│ ├── lib/ # Utility libraries
│ │ ├── axios.ts # Axios instance configuration
│ │ ├── formatters.ts # Date, currency, file size formatters
│ │ ├── utils.ts # General utilities
│ │ └── validations/ # Zod validation schemas
│ │
│ ├── pages/ # Page components
│ │ ├── assets/ # Asset management pages
│ │ ├── AdminJobsPage.tsx # Admin job monitoring
│ │ ├── HomePage.tsx # Landing page
│ │ ├── LoginPage.tsx # Login page
│ │ └── SignupPage.tsx # Registration page
│ │
│ ├── router/ # Routing configuration
│ │ └── AppRoutes.tsx
│ │
│ ├── shared/ # Shared resources
│ │ ├── components/ # Shared components
│ │ ├── types/ # TypeScript interfaces
│ │ └── ui/ # Shared UI elements
│ │
│ ├── slices/ # Redux Toolkit slices
│ │ ├── analytics/ # Analytics state
│ │ ├── assets/ # Asset state
│ │ ├── auth/ # Authentication state
│ │ └── ...
│ │
│ ├── tests/ # Test files
│ │ ├── components/ # Component tests
│ │ ├── pages/ # Page tests
│ │ └── store/ # Redux store tests
│ │
│ ├── App.tsx # Root component
│ ├── main.tsx # Application entry point
│ ├── index.css # Global styles (Tailwind)
│ └── setupTests.ts # Test setup configuration
│
├── .env.example # Environment variables example
├── .eslint.config.js # ESLint configuration
├── .gitignore # Git ignore rules
├── commitlint.config.js # Commit message convention
├── components.json # shadcn/ui configuration
├── index.html # HTML entry point
├── jest.config.js # Jest configuration
├── package.json # Dependencies and scripts
├── README.md # Documentation
├── tsconfig.json # TypeScript configuration
├── tsconfig.app.json # App-specific TS config
├── tsconfig.node.json # Node-specific TS config
├── tsconfig.test.json # Test-specific TS config
└── vite.config.ts # Vite configuration
```

## 🚀 Setup & Installation

### Prerequisites

```
Node.js 18+
npm 9+
```

### Step 1: Clone Repository

```
git clone https://github.com/SushantKumar29/asset-management-frontend.git
cd asset-management-frontend
```

### Step 2: Install Dependencies

```
npm install
```

### Step 3: Configure Environment Variables

```
# .env
VITE_API_BASE_URL=http://localhost:3000/api
```

### Step 4: Start Development Server

```
npm run dev
```

The application will be available at http://localhost:5173

### Step 5: Build for Production

```
npm run build
```

The built files will be in the dist/ directory.

## Available Scripts

```
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build locally

# Testing
npm test                 # Run tests once
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage report

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
```

## Contributing

1. Fork the repository
2. Create feature branch (git checkout -b feature/amazing-feature)
3. Commit changes (git commit -m 'feat: add amazing feature')
4. Push to branch (git push origin feature/amazing-feature)
5. Open Pull Request

### Commit Convention

This project follows Conventional Commits:

- feat: New feature
- fix: Bug fix
- docs: Documentation
- conf: Configuration
- style: Code style (formatting, missing semicolons)
- refactor: Code refactoring
- test: Adding tests
- perf: Performance improvement
- revert: Revert a previous commit
- build: Build system or dependencies
- ci: CI configuration changes

## License

Copyright (c) 2026 Susanta Kumar.

Permission is hereby granted, free of charge, to any person obtaining a copy

## Authors

Susanta Kumar - Initial work

## Acknowledgments

React team for amazing framework

Vite for fast builds

shadcn/ui for component library

Tailwind CSS for utility classes

Redux Toolkit for state management
