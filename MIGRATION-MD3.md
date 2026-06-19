# Migration Guide: Material Design 3 Color System

## What Changed?

Your Tailwind configuration was updated from a generic green/purple/orange palette to the **Material Design 3 (MD3) semantic color system**. This provides better accessibility, consistency, and flexibility.

---

## Before → After Examples

### Button Component

**BEFORE:**
```html
<button class="bg-green-600 text-white hover:bg-green-700">
  Click me
</button>
```

**AFTER:**
```html
<button class="bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container">
  Click me
</button>
```

**Benefits:**
- ✅ Semantic naming (everyone understands "primary")
- ✅ Built-in contrast compliance (on-primary text is guaranteed readable)
- ✅ Dark mode ready (colors automatically adjust)
- ✅ Easier maintenance (one source of truth)

---

### Card Component

**BEFORE:**
```html
<div class="bg-white rounded-lg shadow-md p-4 border border-gray-200">
  <h3 class="text-gray-900">Title</h3>
  <p class="text-gray-600">Description</p>
</div>
```

**AFTER:**
```html
<div class="bg-surface-container rounded-xl shadow-md p-4 border border-outline-variant">
  <h3 class="text-on-surface font-headline">Title</h3>
  <p class="text-on-surface-variant font-body">Description</p>
</div>
```

**Benefits:**
- ✅ Proper elevation through surface containers
- ✅ Consistent spacing with Tailwind
- ✅ Semantic color relationships
- ✅ Easy dark mode support

---

### Input Field

**BEFORE:**
```html
<input 
  class="px-4 py-2 border border-gray-300 rounded-lg 
         focus:border-green-600 focus:ring-2 focus:ring-green-100"
/>
```

**AFTER:**
```html
<input 
  class="px-4 py-2 border border-outline-variant rounded-lg 
         bg-surface-container-lowest text-on-surface
         focus:border-primary focus:ring-2 focus:ring-primary/30"
/>
```

**Benefits:**
- ✅ Proper contrast in focus states
- ✅ Uses surface containers for proper layering
- ✅ Color consistency throughout app

---

### Status Badge

**BEFORE:**
```html
<!-- In stock -->
<span class="bg-green-100 text-green-800 px-3 py-1 rounded-full">
  In Stock
</span>

<!-- Out of stock -->
<span class="bg-red-100 text-red-800 px-3 py-1 rounded-full">
  Out of Stock
</span>
```

**AFTER:**
```html
<!-- In stock -->
<span class="bg-primary-fixed text-on-primary-fixed px-3 py-1 rounded-full">
  In Stock
</span>

<!-- Out of stock -->
<span class="bg-error-container text-on-error-container px-3 py-1 rounded-full">
  Out of Stock
</span>
```

**Benefits:**
- ✅ Proper accessibility (WCAG compliant contrast)
- ✅ Uses fixed variants for status indicators
- ✅ Error colors automatically understood as errors

---

### Section Header

**BEFORE:**
```html
<div class="bg-gray-50 border-b border-gray-200 p-4">
  <h2 class="text-gray-900 text-2xl font-bold">Section</h2>
  <p class="text-gray-600">Description</p>
</div>
```

**AFTER:**
```html
<div class="bg-surface-container-low border-b border-outline-variant p-4">
  <h2 class="text-on-surface font-headline text-2xl font-bold">Section</h2>
  <p class="text-on-surface-variant">Description</p>
</div>
```

**Benefits:**
- ✅ Proper elevation hierarchy
- ✅ Semantic surface roles
- ✅ Consistent typography with font families

---

## Common Color Mappings

### Backgrounds
```
OLD → NEW
---------
bg-white              → bg-surface or bg-surface-container-lowest
bg-gray-50            → bg-surface-container-low
bg-gray-100           → bg-surface-container
bg-gray-200           → bg-surface-container-high
bg-black/bg-gray-900  → bg-inverse-surface
```

### Text
```
OLD → NEW
---------
text-gray-900         → text-on-surface
text-gray-600         → text-on-surface-variant
text-white            → text-on-primary (on colored backgrounds)
text-green-900        → text-primary
```

### Borders
```
OLD → NEW
---------
border-gray-300       → border-outline-variant
border-gray-400       → border-outline
border-gray-200       → border-outline-variant
```

### Alerts
```
OLD → NEW
---------
bg-red-50             → bg-error-container
text-red-900          → text-on-error-container
bg-red-600            → bg-error
text-white (on error) → text-on-error
```

---

## Component Updates Guide

### Update Your Product Card

**File:** `projects/product/src/app/feature/product-card.ts`

```typescript
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-surface-container rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <!-- Image -->
      <div class="relative h-48 rounded-xl overflow-hidden mb-4">
        <img 
          [src]="product.image" 
          [alt]="product.name"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <!-- Stock badge -->
        <span 
          class="absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold transition-all"
          [ngClass]="product.inStock 
            ? 'bg-primary-fixed text-on-primary-fixed' 
            : 'bg-error-container text-on-error-container'"
        >
          {{ product.inStock ? '✓ In Stock' : '✗ Out of Stock' }}
        </span>
      </div>

      <!-- Product Info -->
      <h3 class="font-headline font-bold text-lg text-on-surface mb-2">
        {{ product.name }}
      </h3>
      
      <!-- Price & Action -->
      <div class="flex justify-between items-center pt-4 border-t border-outline-variant">
        <span class="text-primary font-black text-xl">\${{ product.price }}</span>
        <button 
          class="bg-primary text-on-primary px-4 py-2 rounded-lg font-bold
                 hover:bg-primary-container hover:text-on-primary-container
                 active:scale-95 transition-all"
        >
          Add to Cart
        </button>
      </div>
    </div>
  `,
  styles: []
})
export class ProductCardComponent {
  @Input() product!: Product;
}
```

---

### Update Your Product Grid

**File:** `projects/product/src/app/feature/product-grid.ts`

```typescript
import { Component, signal } from '@angular/core';
import { CommonModule, FormsModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Search Bar -->
      <div class="mb-8 max-w-md">
        <input 
          type="text"
          placeholder="Search products..."
          [(ngModel)]="searchTerm"
          (input)="filterProducts()"
          class="w-full px-4 py-3 rounded-lg border border-outline-variant
                 bg-surface-container-lowest text-on-surface
                 focus:border-primary focus:ring-2 focus:ring-primary/30
                 transition-all"
        />
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ng-container *ngFor="let product of filteredProducts()">
          <app-product-card [product]="product" />
        </ng-container>
      </div>

      <!-- Empty State -->
      <div *ngIf="filteredProducts().length === 0" 
           class="text-center py-12">
        <p class="text-on-surface-variant text-lg">
          No products found
        </p>
      </div>
    </div>
  `,
  styles: []
})
export class ProductGridComponent {
  searchTerm = signal('');
  products = signal<Product[]>([
    // ... your products
  ]);

  filteredProducts = signal<Product[]>([]);

  constructor() {
    this.filterProducts();
  }

  filterProducts() {
    const term = this.searchTerm().toLowerCase();
    this.filteredProducts.set(
      this.products().filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
      )
    );
  }
}
```

---

### Update Your Auth Form

**File:** `projects/auth/src/app/feature/auth-form.ts`

```typescript
import { Component, signal } from '@angular/core';
import { CommonModule, FormsModule } from '@angular/common';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form class="max-w-md mx-auto bg-surface-container rounded-2xl p-8 shadow-lg">
      <!-- Title -->
      <h2 class="font-headline text-2xl font-bold text-on-surface mb-6">
        Create Account
      </h2>

      <!-- Email -->
      <div class="mb-4">
        <label class="font-label text-sm font-bold text-on-surface block mb-2">
          Email Address
        </label>
        <input 
          type="email"
          [(ngModel)]="formData.email"
          name="email"
          class="w-full px-4 py-3 rounded-lg border border-outline-variant
                 bg-surface-container-lowest text-on-surface
                 focus:border-primary focus:ring-2 focus:ring-primary/30
                 transition-all"
          placeholder="you@example.com"
        />
      </div>

      <!-- Password -->
      <div class="mb-4">
        <label class="font-label text-sm font-bold text-on-surface block mb-2">
          Password
        </label>
        <input 
          type="password"
          [(ngModel)]="formData.password"
          name="password"
          class="w-full px-4 py-3 rounded-lg border border-outline-variant
                 bg-surface-container-lowest text-on-surface
                 focus:border-primary focus:ring-2 focus:ring-primary/30
                 transition-all"
          placeholder="••••••••"
        />
      </div>

      <!-- Name -->
      <div class="mb-6">
        <label class="font-label text-sm font-bold text-on-surface block mb-2">
          Full Name
        </label>
        <input 
          type="text"
          [(ngModel)]="formData.name"
          name="name"
          class="w-full px-4 py-3 rounded-lg border border-outline-variant
                 bg-surface-container-lowest text-on-surface
                 focus:border-primary focus:ring-2 focus:ring-primary/30
                 transition-all"
          placeholder="John Doe"
        />
      </div>

      <!-- Submit -->
      <button 
        type="submit"
        (click)="onSubmit()"
        class="w-full bg-primary text-on-primary py-3 rounded-lg font-bold
               hover:bg-primary-container hover:text-on-primary-container
               active:scale-95 transition-all"
      >
        Sign Up
      </button>

      <!-- Sign in link -->
      <p class="text-center text-on-surface-variant mt-4">
        Already have an account?
        <a href="#" class="text-primary font-bold hover:underline">Sign in</a>
      </p>
    </form>
  `,
  styles: []
})
export class AuthFormComponent {
  formData = {
    email: '',
    password: '',
    name: ''
  };

  onSubmit() {
    console.log('Form submitted:', this.formData);
    // Handle form submission
  }
}
```

---

## Next Steps

1. **Review `MD3-COLOR-SYSTEM.md`** - Full color reference
2. **Update your components** - Use the examples above
3. **Test dark mode** - Add `dark` class to `<html>`
4. **Verify accessibility** - Check contrast with inspector
5. **Start developing** - Use semantic color roles everywhere

---

## Need Help?

- **Color System Details:** See `MD3-COLOR-SYSTEM.md`
- **Tailwind Docs:** https://tailwindcss.com
- **Material Design 3:** https://m3.material.io
- **Accessibility:** https://webaim.org/articles/contrast/

---

**Your app is now using professional Material Design 3 colors! 🎨**
