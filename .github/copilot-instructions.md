# AI Coding Instructions for Elwaqf Elnamy

This is a React TypeScript application for "الوقف النامي" (Waqf Nami) built with Vite, using Arabic RTL layout and modern web technologies.

## Architecture Overview

### Module Structure

- **Feature-based modules**: `src/app/modules/{client,provider,authentication}/`
- **Layout-driven routing**: Each user type has dedicated layouts (`clientLayout`, `authenticationLayout`)
- **Lazy loading**: All routes use `lazy()` with dynamic imports for code splitting
- **Service layer**: Centralized API service with TanStack Query integration

### Key User Flows

- **Client**: Landing page (`/`) → Profile management
- **Provider**: Registration → Profile setup with multi-step forms
- **Authentication**: Login/Register → OTP verification → Password reset flow

## Development Patterns

### Routing Convention

```tsx
// Module routes always export RouteObject[] and path constants
export const clientRoutes: RouteObject[] = [
  /*...*/
];
export const clientRoutePath = { PROFILE: "/profile" };
```

### API Service Pattern

```tsx
// Use centralized AoiService with typed responses
const result = await AoiService.post<PayloadType, ResponseType>(url, data);
// All API calls return ApiResponse<T> wrapper with standardized structure
```

### Component Structure

```tsx
// Components follow Arabic RTL patterns with Ant Design
<Form layout="vertical" className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <Form.Item label="اسم المستخدم" rules={[{required: true, message: "يرجى إدخال اسم المستخدم"}]}>
```

### Authentication Flow

- Token stored in `localStorage` with automatic injection via axios interceptor
- 401 responses trigger automatic logout and redirect to `/auth`
- Guard components use `isAuthenticated()` helper (currently hardcoded to `true`)

## Build & Development

### Commands

```bash
npm run dev      # Vite dev server
npm run build    # TypeScript build + Vite bundle
npm run lint     # ESLint with React 19 + TypeScript rules
```

### Environment Configuration

- Development API: `https://admin.waqfnami.com/api`
- Environment switching via `src/app/enviroments/environemnt.dev.ts`

### Styling System

- **TailwindCSS 4.x** with custom RTL configuration
- **Arabic font**: "Noto Kufi Arabic" applied globally with RTL direction
- **Ant Design 5.x** with custom theme (primary color: `#7ea831`)
- **Component-specific styles**: `.profile` namespace for Collapse customizations

## Dependencies & Integrations

### Core Stack

- **React 19** with React Router 7 (new data router pattern)
- **TanStack Query** for server state management (window focus refetch disabled)
- **Axios** with request/response interceptors for auth and error handling
- **Ant Design** with React 19 compatibility patch

### Docker Deployment

- Multi-stage build: Node.js builder → Nginx runtime
- Static assets served from `/usr/share/nginx/html/`
- Port 80 exposure for production

## Code Quality Rules

### File Organization

- Keep route definitions in `*.routes.tsx` files
- Service files use `*Service.ts` naming
- Component directories include related components (not shared ones)
- Types/interfaces in `*.model.ts` files alongside features

### Arabic/RTL Considerations

- All user-facing text in Arabic
- Form validation messages in Arabic
- RTL-first CSS classes and layout patterns
- Test with Arabic text overflow and long content

### API Integration

- Always type both request payload and response
- Use the `ApiResponse<T>` wrapper interface
- Handle loading/error states with TanStack Query patterns
- Implement optimistic updates for better UX

When working on this codebase, prioritize RTL compatibility, maintain the modular structure, and ensure Arabic text rendering is properly handled across all components.
