# Xandeum Dashboard - pNode Analytics

Real-time analytics dashboard for monitoring Xandeum Network pNode performance built with Next.js and TypeScript.

![Xandeum Dashboard](https://img.shields.io/badge/Next.js-16.1.0-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-06B6D4?logo=tailwindcss)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react)

## 📋 Project Description

Xandeum Dashboard is a web application specifically designed to monitor and analyze pNode performance within the Xandeum Network. This dashboard provides:

- **Real-time Monitoring**: Monitor pNode status in real-time
- **Deep Analytics**: Charts and metrics for performance analysis
- **Modern UI/UX**: Clean and responsive interface
- **Data Visualization**: Informative charts and data visualization

## 🛠️ Tools & Technologies

This project uses modern technology stack:

### Core Technologies
- **Next.js 16.1.0** - React framework for production
- **React 19.2.3** - Library for building user interfaces
- **TypeScript 5.0** - Typed JavaScript for better development experience
- **Tailwind CSS 4.0** - Utility-first CSS framework

### UI & Styling
- **Radix UI** - Unstyled, accessible UI components
- **Lucide React** - Beautiful & consistent icons
- **Recharts** - Composable charting library
- **Class Variance Authority (CVA)** - Type-safe component variants

### Development Tools
- **ESLint 9** - Code linting and quality
- **PostCSS** - CSS transformations
- **Babel** - JavaScript compiler

### Data & State Management
- **@tanstack/react-table** - Headless table library
- **Tailwind Merge** - Utility for merging tailwind classes

## 📋 Prerequisites

Before starting, make sure your system has:

### Operating System
- **Windows**: Windows 10 or newer
- **macOS**: macOS 10.15 or newer
- **Linux**: Ubuntu 18.04 or newer

### Required Software

#### 1. Node.js
**Required Version**: 18.0 or newer

**Installation Guide**:

**macOS**:
```bash
# Using Homebrew
brew install node

# Or download from nodejs.org
```

**Windows**:
```bash
# Download from nodejs.org or
# Using Chocolatey
choco install nodejs

# Or using nvm for Windows
# Download from github.com/coreybutler/nvm-windows
```

**Linux (Ubuntu/Debian)**:
```bash
# Update package index
sudo apt update

# Install Node.js via NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Or using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

**Verify Installation**:
```bash
node --version
npm --version
```

#### 2. Git
**Installation Guide**:

**macOS**:
```bash
brew install git
```

**Windows**:
```bash
# Download from git-scm.com or
choco install git
```

**Linux**:
```bash
sudo apt install git
```

**Verify**:
```bash
git --version
```

#### 3. Code Editor (Optional)
**Visual Studio Code** (Recommended):
- Download from [code.visualstudio.com](https://code.visualstudio.com)
- Install extensions:
  - TypeScript
  - Tailwind CSS IntelliSense
  - ES7+ React/Redux/React-Native snippets

## 🚀 Installation & Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd xandeum-dashboard
```

### 2. Install Dependencies
```bash
# Install all required dependencies
npm install

# Or using other package managers
# yarn install
# pnpm install
```

### 3. Environment Variables (If needed)
Create `.env.local` file in root directory:
```bash
# API Configuration (example)
NEXT_PUBLIC_API_URL=http://localhost:3001
XANDEUM_RPC_ENDPOINT=your-rpc-endpoint
```

### 4. Run Development Server
```bash
npm run dev
```

Dashboard will run at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
xandeum-dashboard/
├── public/                     # Static assets
│   ├── file.svg               # Icon files
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── api/              # API routes
│   │   │   └── nodes/        # Nodes API endpoint
│   │   │       └── route.ts
│   │   ├── dark-theme.css    # Dark theme styles
│   │   ├── favicon.ico       # App icon
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout
│   │   ├── node-charts.tsx   # Charts component
│   │   └── page.tsx          # Dashboard page
│   ├── components/           # Reusable components
│   │   ├── nodes/           # Node-specific components
│   │   │   └── node-table.tsx
│   │   └── ui/              # UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── metric-card.tsx
│   │       ├── metric-cards.tsx
│   │       ├── refresh-button.tsx
│   │       ├── skeleton.tsx
│   │       ├── table.tsx
│   │       └── typing-effect.tsx
│   ├── lib/                 # Utility libraries
│   │   ├── mockData.ts      # Mock data generator
│   │   ├── utils.ts         # Utility functions
│   │   └── xandeum-service.ts # API service
│   ├── types/               # TypeScript type definitions
│   │   └── xandeum.ts
│   └── utils/               # Additional utilities
├── .gitignore              # Git ignore rules
├── README.md               # Project documentation
├── eslint.config.mjs       # ESLint configuration
├── next.config.ts          # Next.js configuration
├── package-lock.json       # Dependency lock file
├── package.json            # Project dependencies
├── postcss.config.mjs      # PostCSS configuration
├── tailwind.config.mjs     # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 🎯 Key Features

### 1. Dashboard Overview
- **Hero Section** with typing effect animation
- **Real-time Status** pNode with last updated indicator
- **Quick Actions** with refresh button

### 2. Metric Cards
- **Total Nodes**: Total number of pNodes
- **Active Nodes**: Currently active pNodes
- **Inactive Nodes**: Inactive pNodes
- **Healthy Index**: Network health percentage

### 3. Data Visualization
- **Node Status Distribution**: Donut chart for status distribution
- **Node Uptime Distribution**: Horizontal bar chart for uptime
- **Interactive Charts**: Hover effects and tooltips

### 4. Node Table
- **Comprehensive List**: Complete table of all pNodes
- **Sortable Columns**: Sortable columns
- **Status Indicators**: Visual indicators for node status
- **Monospace Display**: Pubkey and IP displayed in monospace font

### 5. UI/UX Features
- **Dark Theme Support**: Dark theme support
- **Responsive Design**: Responsive layout on all devices
- **Loading States**: Skeleton loaders for loading states
- **Error Handling**: Graceful error handling with fallback

## 🖥️ How to Run

### Development Mode
```bash
# Start development server
npm run dev

# Server will run at http://localhost:3000
# Auto reload when files change
```

### Production Build
```bash
# Build for production
npm run build

# Start production server
npm run start

# Or for testing production build
npm run build && npm run start
```

### Linting
```bash
# Run ESLint for code quality
npm run lint
```

## 🔧 Customization

### Changing Mock Data
Edit `src/lib/mockData.ts` file to change mock data used for testing.

### Changing Styling
- **Tailwind Config**: Edit `tailwind.config.mjs`
- **Global Styles**: Edit `src/app/globals.css`
- **Dark Theme**: Edit `src/app/dark-theme.css`

### Adding Components
1. Create new component in `src/components/`
2. Import and use in required pages
3. Update type definitions in `src/types/`

## 📊 API Endpoints

### Nodes API
- **GET** `/api/nodes` - Retrieve data for all pNodes
- **Response**: Array of XandeumPNode objects

```typescript
interface XandeumPNode {
  pubkey: string;
  ip: string;
  version: string;
  status: 'active' | 'inactive' | 'syncing';
  uptime: number;
  blocksProduced: number;
  latency: number;
  location: string;
}
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code ke GitHub
2. Connect repository di [vercel.com](https://vercel.com)
3. Deploy otomatis dengan custom domain support

### Manual Deployment
```bash
# Build for production
npm run build

# Deploy .next folder to hosting server
# Supported services: Netlify, Railway, DigitalOcean App Platform
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🐛 Troubleshooting

### Common Issues

**1. Port Already in Use**
```bash
# Change port
npm run dev -- -p 3001
```

**2. Dependencies Issues**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**3. TypeScript Errors**
```bash
# Restart TypeScript server in VS Code
# Cmd+Shift+P -> TypeScript: Restart TS Server
```

**4. Tailwind Not Working**
```bash
# Restart development server
# Check tailwind.config.mjs configuration
```

## 📝 Development Guidelines

### Code Style
- Use **TypeScript** for type safety
- Follow **ESLint** rules for code consistency
- Use **Tailwind CSS** for styling
- **Component naming**: PascalCase for React components

### Git Workflow
```bash
# Feature branch workflow
git checkout -b feature/new-feature
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature
# Create pull request
```

### Testing
```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 📚 Learning Resources

### Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### Tailwind CSS
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS Components](https://tailwindui.com/)

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Xandeum Dashboard Team**

- GitHub: [@xandeum](https://github.com/xandeum)
- Website: [xandeum.network](https://xandeum.network)

## 🙏 Acknowledgments

- [Next.js Team](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Recharts](https://recharts.org/) for data visualization

---

**Happy Coding! 🚀**

If you have any questions or need help, please create an issue in this repository or contact the development team.
