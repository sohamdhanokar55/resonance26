# APV Resonance 2K26

A modern, interactive event management and promotion website for APV (Agnel Parliament of Values) Resonance 2K26. Built with cutting-edge web technologies to deliver an engaging user experience with smooth animations, responsive design, and comprehensive event information.

## 🎯 Project Overview

APV Resonance is an event showcase platform designed to promote and manage events organized by the Agnel Parliament of Values. The website features event schedules, registration capabilities, guidelines, and comprehensive event information with a beautiful, interactive interface.

## 🛠️ Tech Stack

### Frontend Framework & Build Tools

- **React 18.3** - Modern UI library for building interactive components
- **TypeScript 5.8** - Type-safe JavaScript for better development experience
- **Vite 5.4** - Fast build tool and dev server with HMR support
- **React Router DOM 6.30** - Client-side routing for multi-page navigation

### UI & Styling

- **Tailwind CSS 3.4** - Utility-first CSS framework for responsive design
- **Shadcn/ui** - High-quality, accessible React components
- **Radix UI** - Unstyled, accessible primitives for building design systems
- **Lucide React** - Beautiful, consistent icon library

### Animation & Motion

- **Framer Motion 12.29** - Production-ready animation library
- **TailwindCSS Animate** - Pre-built animation utilities

### State Management & Data Fetching

- **TanStack React Query 5.83** - Data synchronization and caching
- **React Hook Form 7.61** - Efficient, flexible form state management
- **Zod 3.25** - TypeScript-first schema validation

### Additional Libraries

- **Next Themes 0.3** - Theme management (dark/light mode support)
- **Recharts 2.15** - Composable charting library for data visualization
- **Embla Carousel React 8.6** - Headless carousel for React
- **Sonner 1.7** - Toast notifications
- **Date-fns 3.6** - Modern date utility library
- **jsPDF & jsPDF AutoTable 4.0** - PDF generation for documents
- **Vaul 0.9** - Drawer component library

### Development Tools

- **ESLint 9.32** - Code quality and consistency
- **Vitest 3.2** - Unit testing framework
- **@Testing Library** - Testing utilities for React components
- **JSDOM 20.0** - DOM implementation for testing
- **TypeScript ESLint** - TypeScript linting support

## 📁 Project Structure

```
Resonance/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── ui/             # Shadcn/ui component library
│   │   ├── Header.tsx      # Navigation header with mobile menu
│   │   ├── HeroSection.tsx # Animated hero with scroll effects
│   │   ├── AboutSection.tsx
│   │   ├── EventsSection.tsx
│   │   ├── EventSchedule.tsx
│   │   ├── EventCard.tsx
│   │   ├── EventModal.tsx
│   │   ├── EventRegistration.tsx
│   │   ├── GuidelinesSection.tsx
│   │   ├── DocumentsSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── Footer.tsx
│   │   └── ScrollToReveal.tsx
│   ├── pages/              # Page components
│   │   ├── Index.tsx       # Home page (main landing page)
│   │   ├── EventRegistration.tsx # Event registration page
│   │   └── NotFound.tsx    # 404 page
│   ├── hooks/              # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/                # Utility functions
│   │   └── utils.ts
│   ├── test/               # Test files
│   │   ├── example.test.ts
│   │   └── setup.ts
│   ├── App.tsx             # Root app component
│   ├── main.tsx            # Application entry point
│   ├── App.css
│   └── index.css
├── public/                 # Static assets
│   ├── robots.txt
│   ├── Photos/
│   └── Team/
├── vite.config.ts          # Vite configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── eslint.config.js        # ESLint configuration
├── postcss.config.js       # PostCSS configuration
├── components.json         # Shadcn/ui configuration
├── package.json            # Project dependencies
└── README.md               # This file
```

## 🎨 Key Features

### 1. **Responsive Design**

- Mobile-first approach
- Fully responsive across all devices
- Adaptive navigation with mobile menu

### 2. **Smooth Animations**

- Scroll-triggered animations
- Framer Motion integration for sophisticated motion effects
- Parallax scrolling effects
- Fade-in and slide animations

### 3. **Interactive Components**

- Event cards with hover effects
- Modal dialogs for event details
- Carousel for showcasing photos
- Form validation with React Hook Form

### 4. **Event Management**

- Event schedule display
- Event registration page
- Event filtering and categorization
- Modal-based event details

### 5. **Accessible UI**

- Built on Radix UI primitives
- WCAG compliant components
- Keyboard navigation support
- Screen reader friendly

### 6. **Dark Mode Support**

- Theme switching capability
- Persistent theme preference
- Seamless dark/light mode transitions

### 7. **Performance Optimized**

- Code splitting with Vite
- Lazy loading components
- Optimized bundle size
- Fast Hot Module Replacement (HMR)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm, yarn, or bun package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Resonance
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

   The application will be available at `http://localhost:8080/resonance`

## 📦 Available Scripts

| Command              | Description                       |
| -------------------- | --------------------------------- |
| `npm run dev`        | Start development server with HMR |
| `npm run build`      | Build for production              |
| `npm run build:dev`  | Build in development mode         |
| `npm run preview`    | Preview production build locally  |
| `npm run lint`       | Run ESLint to check code quality  |
| `npm run test`       | Run tests once                    |
| `npm run test:watch` | Run tests in watch mode           |

## 🔧 Configuration

### Vite Configuration

- Base path: `/resonance/`
- Development server: localhost:8080
- HMR overlay disabled for better UX
- SWC compiler for fast transpilation

### Tailwind CSS

- Configured with custom theme in `tailwind.config.ts`
- Custom color scheme including crimson tones
- Animation utilities included

### TypeScript

- Strict mode enabled
- React JSX support
- Path alias `@/` for `src/` directory

## 📝 Component Guidelines

### Creating New Components

1. Use functional components with React hooks
2. Apply TypeScript for type safety
3. Use Tailwind CSS for styling
4. Import UI components from `@/components/ui`
5. Use Framer Motion for animations when needed

### Form Handling

- Use React Hook Form for form state
- Use Zod for validation schemas
- Integrate with Shadcn/ui form components

### State Management

- Use React Query for server state
- Use React hooks for local state
- Use context for theme management

## 🧪 Testing

Run tests with:

```bash
npm run test           # Single run
npm run test:watch    # Watch mode
```

Test configuration is in `vitest.config.ts` with JSDOM support for DOM testing.

## 🌐 Routing

Routes are configured in `src/App.tsx`:

- `/` - Home page with all sections
- `/:slug` - Event registration page (dynamic)
- `*` - 404 Not Found page

Base path is `/resonance/` for deployment.

## 📱 Responsive Breakpoints

The project uses Tailwind's default breakpoints:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🎯 Development Workflow

1. **Development**: Use `npm run dev` for hot reloading
2. **Linting**: Run `npm run lint` to check code quality
3. **Testing**: Write tests in `src/test/` directory
4. **Building**: Use `npm run build` for production bundle
5. **Deployment**: Deploy the `dist/` folder

## 📦 Production Build

```bash
npm run build
```

This generates an optimized production build in the `dist/` directory ready for deployment.

## 🔐 Security

- TypeScript for type safety
- ESLint for code quality
- Dependency auditing with npm/yarn
- Regular updates of dependencies

## 📄 License

This project is part of the APV Resonance 2K26 event management system.

## 👥 Contributing

When contributing to this project:

1. Follow the code style enforced by ESLint
2. Write TypeScript with proper type annotations
3. Use meaningful commit messages
4. Test new features thoroughly
5. Update documentation as needed

## 🤝 Support

For issues, questions, or suggestions, please refer to the project documentation or contact the development team.

---

**Last Updated**: February 2026  
**Version**: 0.0.0  
**Status**: Active Development
