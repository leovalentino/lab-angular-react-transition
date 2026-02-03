# Renault Core UI - React Frontend Architecture

A high-performance, scalable React application built with TypeScript, Vite, and modern frontend tools for Renault's vehicle management system.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Type check
npm run type-check

# Format code
npm run format
```

The development server will start at `http://localhost:5176`

## 🔧 Troubleshooting

### Can't access http://localhost:5173/

1. **Check if the server is running:**
   ```bash
   # Make sure you're in the project directory
   npm run dev
   ```

2. **Port may be in use:**
   ```bash
   # On Linux/macOS
   lsof -i :5176
   # On Windows
   netstat -ano | findstr :5176
   
   # Kill the process if needed, or change the port in vite.config.ts
   ```

3. **Clear npm cache and reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm cache clean --force
   npm install
   ```

4. **Check for TypeScript errors:**
   ```bash
   npm run type-check
   ```

5. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

6. **If using a different port, update vite.config.ts:**
   ```javascript
   server: {
     port: 3000, // Change to desired port
   }
   ```

## 📁 Project Structure (Clean Architecture - Bottom-Up)

```
src/
├── api/                    # HTTP services (Axios abstraction)
│   └── BaseService.ts     # Angular HttpClient equivalent
├── components/
│   ├── common/            # Atomic UI components (Button, Input, etc.)
│   └── layout/            # Shell, Navbar, Sidebar
├── hooks/                 # Custom React hooks
│   └── useAuth.ts         # Authentication logic
├── pages/                 # Route-level components
│   ├── Dashboard.tsx
│   └── Login.tsx
├── store/                 # State management (Zustand)
│   └── useAuthStore.ts    # Authentication store
├── types/                 # TypeScript interfaces
│   └── index.ts
├── App.tsx                # Root component with routing
└── main.tsx               # Application entry point
```

## 🛠 Technology Stack

| Technology | Purpose | Angular Equivalent |
|------------|---------|-------------------|
| **React 18** | UI Library | Angular Framework |
| **TypeScript** | Type Safety | TypeScript |
| **Vite** | Build Tool & Dev Server | Angular CLI |
| **React Router 6** | Client-side Routing | Angular Router |
| **Zustand** | State Management | NgRx/Service with BehaviorSubject |
| **TanStack React Query** | Server State Management | RxJS + HttpClient caching |
| **Axios** | HTTP Client | Angular HttpClient |
| **Tailwind CSS** | Utility-first CSS | Angular Material / SCSS |
| **Lucide React** | Icon Library | Angular Material Icons |

## 🔄 React vs Angular Comparison

### Architecture Approach

| Aspect | React (This Project) | Angular |
|--------|---------------------|---------|
| **Philosophy** | Library - "Bring your own architecture" | Framework - "Batteries included" |
| **Component Model** | Functional Components with Hooks | Class-based Components with Decorators |
| **State Management** | Zustand (minimalist) + React Query | NgRx (RxJS-based) / Services |
| **HTTP Layer** | Axios with BaseService class | HttpClient with Interceptors |
| **Dependency Injection** | Props drilling, Context API, Zustand | Hierarchical DI system |
| **Learning Curve** | Gradual (learn concepts incrementally) | Steep (need to learn entire framework) |
| **Bundle Size** | ~40-100KB (React core) | ~150-500KB (full framework) |

### Code Comparison Examples

#### 1. **HTTP Service**

**React (Axios + BaseService):**
```typescript
// Angular-like HttpClient abstraction
class VehicleService extends BaseService {
  async getVehicles(): Promise<Vehicle[]> {
    return this.get<Vehicle[]>('/vehicles');
  }
}
```

**Angular (HttpClient):**
```typescript
@Injectable()
export class VehicleService {
  constructor(private http: HttpClient) {}
  
  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>('/api/vehicles');
  }
}
```

#### 2. **State Management**

**React (Zustand):**
```typescript
// Simple store creation
export const useVehicleStore = create((set) => ({
  vehicles: [],
  setVehicles: (vehicles) => set({ vehicles }),
}));
```

**Angular (NgRx):**
```typescript
// Requires actions, reducers, effects, selectors
export const loadVehicles = createAction('[Vehicles] Load');
export const loadVehiclesSuccess = createAction(
  '[Vehicles] Load Success',
  props<{ vehicles: Vehicle[] }>()
);
```

#### 3. **Component with Data Fetching**

**React (Functional Component + Hooks):**
```tsx
const VehicleList = () => {
  const { data: vehicles, isLoading } = useQuery({
    queryKey: ['vehicles'],
    queryFn: fetchVehicles,
  });
  
  return isLoading ? <Spinner /> : <List items={vehicles} />;
};
```

**Angular (Class Component):**
```typescript
@Component({
  selector: 'app-vehicle-list',
  template: `<app-spinner *ngIf="loading"></app-spinner>`
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  loading = false;
  
  ngOnInit() {
    this.loadVehicles();
  }
}
```

## 🎯 Key Design Decisions

### 1. **Why Zustand over Redux?**
- Minimal boilerplate (Java developers appreciate less ceremony)
- No action creators, reducers, or middleware required
- Built-in TypeScript support
- Similar mental model to Angular Services with BehaviorSubject

### 2. **Why TanStack React Query?**
- Replaces Angular's RxJS-based caching patterns
- Automatic background refetching, caching, and synchronization
- DevTools for debugging server state
- Less manual cache management compared to Angular services

### 3. **Why Vite over Create React App?**
- Faster builds and Hot Module Replacement (HMR)
- Better developer experience (closer to Angular CLI speed)
- Built-in TypeScript support without ejecting

### 4. **Why Tailwind CSS?**
- Utility-first approach reduces CSS conflicts
- Consistent design system
- Faster UI development (similar to Angular's utility classes)

## 📊 Performance Optimizations

1. **Code Splitting**: React Router 6 supports automatic code splitting
2. **Tree Shaking**: Vite eliminates unused code
3. **Memoization**: React.memo and useMemo prevent unnecessary re-renders
4. **Lazy Loading**: Components load on-demand
5. **Image Optimization**: Vite handles modern image formats

## 🔧 Development Workflow

### For Angular Developers Transitioning to React:

1. **Components**: Think of React functional components as Angular components without decorators
2. **Services**: Use custom hooks or Zustand stores instead of Angular services
3. **RxJS Observables**: Use TanStack React Query for server state, Zustand for client state
4. **Templates**: JSX is similar to Angular templates but uses JavaScript expressions
5. **Directives**: Use conditional rendering (`&&`, ternary) instead of `*ngIf`, `*ngFor`

### Recommended Learning Path:
1. Master React hooks (useState, useEffect, useContext)
2. Learn React Query for data fetching (replaces RxJS streams)
3. Understand Zustand for global state (replaces NgRx/Service patterns)
4. Practice JSX syntax (similar to Angular templates)

## 🧪 Testing Strategy

```bash
# Recommended testing setup (to be added)
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

- **Unit Tests**: Vitest + Testing Library
- **Integration Tests**: React Testing Library
- **E2E Tests**: Cypress or Playwright

## 📈 Migration Tips from Angular

1. **Start Small**: Migrate one feature at a time
2. **Shared Logic**: Convert Angular services to React hooks or Zustand stores
3. **Components**: Rewrite Angular templates as JSX
4. **Routing**: Map Angular routes to React Router routes
5. **Forms**: Use React Hook Form (similar to Angular Reactive Forms)

## 🤝 Contributing

1. Follow TypeScript strict mode (no `any` types)
2. Use functional components with arrow functions
3. Implement error boundaries for graceful error handling
4. Write meaningful component and hook documentation
5. Follow the established directory structure

## 📞 Support

For Renault internal teams:
- Frontend Architecture Team: `frontend-arch@renault.com`
- Documentation: [Internal Confluence Link]
- Component Library: `@renault/ui-kit`

---

**Built with ❤️ by Renault Digital Innovation Team**
