# Micro Frontend Application - Setup Guide

This workspace contains multiple Angular applications integrated using **Module Federation** (Webpack 5).

## Project Structure

The workspace consists of:

- **shell** (Port 4200) - Host/Container application that loads remote microfrontends
- **dashboard** (Port 4201) - Remote microfrontend exposing Dashboard component
- **product** (Port 4202) - Remote microfrontend exposing Product component
- **order** (Port 4203) - Remote microfrontend exposing Order component
- **cart** (Port 4204) - Remote microfrontend exposing Cart component
- **auth** (Port 4205) - Remote microfrontend exposing Auth component

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Individual Applications

Start the shell (host) application:
```bash
npm run start:shell
# or
npm start
```

In separate terminals, start the remote applications:
```bash
npm run start:product
npm run start:order
npm run start:cart
npm run start:auth
npm run start:dashboard
```

### 3. Run All Applications Together
Use the Module Federation dev server to run all apps simultaneously:
```bash
npm run run:all
```

This command will start all services on their respective ports.

## Available Scripts

### Shell (Host)
- `npm run start:shell` - Start shell on port 4200
- `npm run build:shell` - Build shell for production

### Product
- `npm run start:product` - Start product on port 4202
- `npm run build:product` - Build product for production

### Order
- `npm run start:order` - Start order on port 4203
- `npm run build:order` - Build order for production

### Cart
- `npm run start:cart` - Start cart on port 4204
- `npm run build:cart` - Build cart for production

### Auth
- `npm run start:auth` - Start auth on port 4205
- `npm run build:auth` - Build auth for production

### Build All
```bash
npm run build:all
```

Builds all applications for production.

## Architecture

### Module Federation Configuration

Each application has a `webpack.config.js` that configures Module Federation:

- **Remote Apps** (product, order, cart, auth, dashboard) expose their root component
- **Host App** (shell) loads the exposed components from remotes dynamically

### Exposing Components

Each remote app exposes its main component:

```typescript
exposes: {
  './Component': './projects/[app]/src/app/app.ts',
}
```

### Shared Dependencies

Common Angular packages are shared between host and remotes using `shareAll()` to prevent duplicate bundle downloads:

- `@angular/core`
- `@angular/common`
- `@angular/router`
- `rxjs`
- And other common dependencies

## Integration in Shell (Host)

To load a remote component in the shell app:

```typescript
import { loadRemoteEntry, loadRemoteModule } from './app/mf-loader';

// Load the remote entry point
await loadRemoteEntry('http://localhost:4202/remoteEntry.js');

// Load the component
const ProductComponent = await loadRemoteModule('product', './Component');
```

Or use dynamic import with lazy loading in routes:

```typescript
const routes: Routes = [
  {
    path: 'product',
    loadComponent: () => import('product/Component')
      .then(m => m.App)
  }
];
```

## Development Tips

1. **Keep each app in its own terminal** during development for easier debugging
2. **Check browser console** for module federation errors
3. **Ensure ports don't conflict** - each app uses a different port
4. **Clear browser cache** if you encounter stale remoteEntry.js files

## Production Build

To build all applications for production:

```bash
npm run build:all
```

Outputs will be in:
- `dist/shell/` - Host application
- `dist/product/` - Product app
- `dist/order/` - Order app
- `dist/cart/` - Cart app
- `dist/auth/` - Auth app
- `dist/dashboard/` - Dashboard app

## Troubleshooting

### remoteEntry.js not found
- Ensure the remote app is running on the correct port
- Check that `publicHost` in `angular.json` matches the actual URL

### Shared library version mismatch
- Verify that all apps use compatible versions of Angular
- Check `webpack.config.js` shared configuration

### CORS errors
- This typically occurs when running on different domains
- For development, ensure all apps are on localhost

## Architecture Overview

```
┌─────────────────────────────┐
│   Shell (Host) - 4200       │
│ ┌─────────────────────────┐ │
│ │   Navigation/Layout     │ │
│ │                         │ │
│ │  ┌─────────────────┐    │ │
│ │  │ Remote Component│    │ │
│ │  │ (Dynamically    │    │ │
│ │  │  Loaded)        │    │ │
│ │  └─────────────────┘    │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
         │
    ┌────┴────┬──────┬──────┬──────┐
    │         │      │      │      │
┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│Prod. │ │Order │ │Cart  │ │Auth  │ │Dash. │
│4202  │ │4203  │ │4204  │ │4205  │ │4201  │
└──────┘ └──────┘ └──────┘ └──────┘ └──────┘
(Remote Apps)
```

## Next Steps

1. Update the shell app to consume and display remote components
2. Add shared services for cross-app communication
3. Implement proper error boundaries for remote component failures
4. Add authentication/state management across microfrontends
5. Deploy to a production environment with appropriate URL configurations

## Resources

- [Angular Documentation](https://angular.io)
- [Module Federation Guide](https://webpack.js.org/concepts/module-federation/)
- [@angular-architects/module-federation](https://github.com/angular-architects/module-federation-plugin)
