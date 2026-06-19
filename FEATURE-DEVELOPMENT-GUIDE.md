# Feature Development Guide

This guide helps you add features and customize each microfrontend app.

## App Component Structure

Each app follows this structure:

```
projects/[app]/
├── src/
│   ├── app/
│   │   ├── app.ts          ← Main component (exported, hosts features)
│   │   ├── app.html        ← Main template
│   │   ├── app.scss        ← Main styles
│   │   ├── app.config.ts   ← Angular config + providers
│   │   ├── app.routes.ts   ← Router configuration
│   │   └── feature/        ← Feature modules (create as needed)
│   │       ├── list.ts
│   │       ├── detail.ts
│   │       └── ...
│   ├── bootstrap.ts        ← Bootstraps the app
│   ├── main.ts             ← Entry point (lazy loads bootstrap)
│   ├── styles.scss         ← Global styles
│   └── index.html          ← HTML template
├── webpack.config.js       ← Module Federation config
└── webpack.prod.config.js
```

## Adding Features to a Remote App

### Example: Add Product List Feature to Product App

#### 1. Create Feature Component

Create: `projects/product/src/app/feature/product-list.ts`

```typescript
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="product-list">
      <h2>Products</h2>
      <ul>
        <li *ngFor="let product of products()">
          {{ product.name }} - ${{ product.price }}
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .product-list { padding: 20px; }
    ul { list-style: none; }
  `]
})
export class ProductListComponent {
  products = signal([
    { id: 1, name: 'Product 1', price: 99.99 },
    { id: 2, name: 'Product 2', price: 149.99 },
    { id: 3, name: 'Product 3', price: 199.99 },
  ]);
}
```

#### 2. Update App Routes

Edit: `projects/product/src/app/app.routes.ts`

```typescript
import { Routes } from '@angular/router';
import { ProductListComponent } from './feature/product-list';

export const routes: Routes = [
  {
    path: 'list',
    component: ProductListComponent
  }
];
```

#### 3. Update App Component

Edit: `projects/product/src/app/app.ts`

```typescript
import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-remote-root',
  imports: [RouterModule, CommonModule],
  standalone: true,
  template: `
    <div class="app-container">
      <h1>{{ title() }} Application</h1>
      
      <nav>
        <a [routerLink]="['/list']">Product List</a>
      </nav>
      
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('product');
}
```

## Exposing Additional Components from Remote

Update `webpack.config.js` to expose multiple components:

```javascript
const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'product',
  exposes: {
    './Component': './projects/product/src/app/app.ts',
    './ProductList': './projects/product/src/app/feature/product-list.ts',
    './ProductService': './projects/product/src/app/services/product.service.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});
```

Then in shell, use:

```typescript
// Load specific exported component
const ProductList = await import('product/ProductList').then(m => m.ProductListComponent);
```

## Creating Shared Services

### 1. Create Service

Create: `projects/product/src/app/services/product.service.ts`

```typescript
import { Injectable, signal } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = signal<Product[]>([
    { id: 1, name: 'Product 1', price: 99.99 },
    { id: 2, name: 'Product 2', price: 149.99 },
  ]);

  getProducts() {
    return this.products.asReadonly();
  }

  addProduct(product: Product) {
    this.products.update(p => [...p, product]);
  }
}
```

### 2. Use in Component

```typescript
import { Component, inject } from '@angular/core';
import { ProductService } from './services/product.service';

@Component({...})
export class ProductListComponent {
  private productService = inject(ProductService);
  products = this.productService.getProducts();
}
```

### 3. Share Service Across Apps

Create a shared library (optional):

```
libs/
└── shared-services/
    └── src/
        └── lib/
            └── product.service.ts
```

## Using HTTP Client

### 1. Add HttpClient to Config

Edit: `projects/[app]/src/app/app.config.ts`

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
  ],
};
```

### 2. Use in Service

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

  getProducts() {
    return this.http.get('/api/products');
  }
}
```

## State Management (Optional)

Consider using:
- **Signals API** (built-in Angular, used in examples)
- **RxJS** (reactive programming)
- **NgRx** (for complex state)

### Simple Signal Example

```typescript
import { signal, computed } from '@angular/core';

export class StateService {
  private items = signal([]);
  private filter = signal('');

  items$ = computed(() => 
    this.items().filter(item => 
      item.name.includes(this.filter())
    )
  );

  setFilter(f: string) { this.filter.set(f); }
}
```

## Testing

### Add Tests

Create: `projects/[app]/src/app/app.spec.ts`

```typescript
import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  it('should render title', () => {
    TestBed.configureTestingModule({
      imports: [App],
    });
    const fixture = TestBed.createComponent(App);
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('Application');
  });
});
```

### Run Tests

```bash
ng test --project product
```

## Styling Tips

### Global Styles
Edit: `projects/[app]/src/styles.scss`

```scss
// Global variables
$primary-color: #2c3e50;
$secondary-color: #3498db;

// Global styles
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
}
```

### Component Styles
In component `@Component` decorator:

```typescript
@Component({
  selector: 'app-list',
  standalone: true,
  styles: [`
    .list-container {
      padding: 20px;
      background: var(--bg-color, #fff);
    }
  `]
})
```

## Communication Between Apps

### 1. Using Window Object (Simple)

```typescript
// In remote app
export function notifyShell(data: any) {
  window.dispatchEvent(new CustomEvent('remote-action', { detail: data }));
}

// In shell app
window.addEventListener('remote-action', (e: any) => {
  console.log('Remote action:', e.detail);
});
```

### 2. Using Service (Better)

Create a shared service in a library and inject it in both apps.

### 3. Using RxJS Subject

Create shared subject in a library for cross-app communication.

## Performance Optimization

1. **Lazy Load Components** - Use `loadComponent` in routes
2. **OnPush Change Detection** - Add to components
3. **Unsubscribe Properly** - Use `takeUntil` or `async` pipe
4. **Tree Shake Unused Code** - Use standalone components

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ...
})
```

## Deployment Considerations

1. Each app builds independently → separate deployments
2. Update `publicHost` in `angular.json` for production URLs
3. Update `webpack.config.js` remotes to production URLs
4. Consider CDN for static assets
5. Implement proper error handling for failed remote loads

## Checklist for New Feature

- [ ] Create component/service
- [ ] Add routes if needed
- [ ] Update main app component
- [ ] Expose in webpack.config.js if needed
- [ ] Add tests
- [ ] Update styles
- [ ] Test in isolation
- [ ] Test in host app (if remote)
- [ ] Document component interface

---

Happy developing! 🚀
