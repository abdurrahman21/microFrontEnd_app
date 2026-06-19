# Material Design 3 - Ready-to-Use Examples

This file contains production-ready components using the new Material Design 3 color system. Copy and paste into your projects!

---

## 1. Hero Section with Overlay

**File:** `projects/shell/src/app/feature/hero.ts`

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Background Image -->
      <img 
        src="https://images.unsplash.com/photo-1488459716781-6818c409f883?w=1200&h=600&fit=crop"
        alt="Farm background"
        class="absolute inset-0 w-full h-full object-cover"
      />
      
      <!-- Overlay -->
      <div class="absolute inset-0 bg-inverse-surface/50 backdrop-blur-sm"></div>
      
      <!-- Content -->
      <div class="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <h1 class="font-headline text-6xl font-extrabold text-inverse-on-surface mb-6 leading-tight">
          Fresh from Farm to Your Home
        </h1>
        
        <p class="text-inverse-on-surface/80 text-xl mb-10 leading-relaxed">
          Buy directly from local farmers. Fresh, organic, and affordable produce delivered with care.
        </p>
        
        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="bg-primary text-on-primary px-10 py-4 rounded-full font-bold text-lg
                         hover:scale-105 active:scale-95 transition-all shadow-lg">
            Shop Now
          </button>
          
          <button class="bg-inverse-surface/30 backdrop-blur border border-inverse-on-surface/30 
                         text-inverse-on-surface px-10 py-4 rounded-full font-bold text-lg
                         hover:bg-inverse-surface/50 active:scale-95 transition-all">
            Learn More
          </button>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class HeroComponent {}
```

---

## 2. Feature Cards Grid

**File:** `projects/shell/src/app/feature/feature-cards.ts`

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-feature-cards',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-20 px-6 bg-surface-container-low">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="font-headline text-4xl font-bold text-primary mb-4">
            Why Choose Us
          </h2>
          <p class="text-on-surface-variant text-lg max-w-2xl mx-auto">
            Experience the difference of farm-fresh products delivered directly to your door
          </p>
        </div>
        
        <!-- Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div *ngFor="let feature of features" 
               class="bg-surface-container rounded-2xl p-8 text-center shadow-sm 
                      hover:shadow-md hover:-translate-y-1 transition-all">
            <!-- Icon Background -->
            <div class="w-16 h-16 bg-tertiary-fixed rounded-2xl flex items-center justify-center 
                        text-3xl mx-auto mb-4 text-on-tertiary-fixed">
              {{ feature.icon }}
            </div>
            
            <!-- Content -->
            <h3 class="font-headline font-bold text-lg text-on-surface mb-3">
              {{ feature.title }}
            </h3>
            <p class="text-on-surface-variant text-sm leading-relaxed">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class FeatureCardsComponent {
  features: Feature[] = [
    {
      icon: '🌱',
      title: 'Farm Fresh',
      description: 'Picked at peak ripeness, delivered within 24 hours'
    },
    {
      icon: '🤝',
      title: 'Direct from Farmers',
      description: 'No middlemen, supporting local agricultural communities'
    },
    {
      icon: '💰',
      title: 'Affordable Prices',
      description: 'Fair trade pricing for everyone'
    },
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Quick and reliable delivery to your doorstep'
    }
  ];
}
```

---

## 3. Navigation Bar

**File:** `projects/shell/src/app/feature/navbar.ts`

```typescript
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/20">
      <div class="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <span class="text-2xl">🌿</span>
          <span class="font-headline text-xl font-bold text-primary">Arboretum</span>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-8">
          <a href="#" class="text-on-surface-variant hover:text-primary transition-colors font-body">
            Shop
          </a>
          <a href="#" class="text-on-surface-variant hover:text-primary transition-colors font-body">
            Categories
          </a>
          <a href="#" class="text-on-surface-variant hover:text-primary transition-colors font-body">
            About
          </a>
          <a href="#" class="text-on-surface-variant hover:text-primary transition-colors font-body">
            Contact
          </a>
        </nav>

        <!-- Actions -->
        <div class="flex items-center gap-4">
          <!-- Cart Button -->
          <button class="relative p-2 text-on-surface-variant hover:text-primary transition-colors">
            🛒
            <span class="absolute top-0 right-0 w-5 h-5 bg-error text-on-error text-xs 
                         rounded-full flex items-center justify-center font-bold">
              0
            </span>
          </button>

          <!-- Sign In / Sign Up -->
          <button class="hidden sm:block text-primary font-bold hover:text-primary-container transition-colors">
            Sign In
          </button>
          
          <button class="bg-primary text-on-primary px-6 py-2 rounded-full font-bold 
                         hover:bg-primary-container hover:text-on-primary-container 
                         active:scale-95 transition-all">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  `,
  styles: []
})
export class NavbarComponent {}
```

---

## 4. Product Card

**File:** `projects/product/src/app/feature/product-card.ts`

```typescript
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  inStock: boolean;
  category: string;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="group bg-surface-container rounded-2xl overflow-hidden shadow-sm 
                hover:shadow-md transition-all hover:-translate-y-1">
      <!-- Image Container -->
      <div class="relative h-56 overflow-hidden bg-surface-container-low">
        <img 
          [src]="product.image"
          [alt]="product.name"
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        <!-- Stock Badge -->
        <span class="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold"
              [ngClass]="product.inStock 
                ? 'bg-primary-fixed text-on-primary-fixed' 
                : 'bg-error-container text-on-error-container'">
          {{ product.inStock ? '✓ In Stock' : '✗ Out of Stock' }}
        </span>

        <!-- Category Badge -->
        <span class="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold 
                     bg-secondary-container text-on-secondary-container">
          {{ product.category }}
        </span>
      </div>

      <!-- Content -->
      <div class="p-4 space-y-3">
        <!-- Title -->
        <h3 class="font-headline font-bold text-on-surface line-clamp-2">
          {{ product.name }}
        </h3>

        <!-- Rating -->
        <div class="flex items-center gap-1">
          <span class="text-secondary-fixed">★</span>
          <span class="text-sm text-on-surface-variant">
            {{ product.rating }}/5 (128 reviews)
          </span>
        </div>

        <!-- Price & Button -->
        <div class="flex justify-between items-center pt-3 border-t border-outline-variant">
          <span class="text-primary font-headline font-bold text-xl">
            \${{ product.price.toFixed(2) }}
          </span>
          
          <button [disabled]="!product.inStock"
                  class="bg-primary text-on-primary px-4 py-2 rounded-lg font-bold text-sm
                         hover:bg-primary-container hover:text-on-primary-container
                         disabled:bg-surface-container disabled:text-on-surface-variant
                         active:scale-95 transition-all">
            Add Cart
          </button>
        </div>
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

## 5. Search Form

**File:** `projects/product/src/app/feature/search-form.ts`

```typescript
import { Component, signal } from '@angular/core';
import { CommonModule, FormsModule } from '@angular/common';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form (submit)="onSearch()" class="w-full max-w-2xl mx-auto mb-8">
      <div class="bg-surface-container rounded-2xl p-2 flex items-center shadow-md 
                  border border-outline-variant focus-within:border-primary focus-within:ring-2 
                  focus-within:ring-primary/30 transition-all">
        <!-- Search Icon -->
        <span class="text-2xl px-4">🔍</span>

        <!-- Input -->
        <input 
          type="text"
          [(ngModel)]="searchTerm"
          name="search"
          placeholder="Search vegetables, fruits, grains..."
          class="flex-1 bg-transparent border-none focus:ring-0 text-on-surface py-3 
                 outline-none font-body"
        />

        <!-- Filter Button -->
        <button type="button" 
                class="text-on-surface-variant hover:text-primary px-4 py-2 transition-colors">
          ⚙️
        </button>

        <!-- Search Button -->
        <button type="submit"
                class="bg-secondary-container text-on-secondary-container px-8 py-3 
                       rounded-xl font-bold ml-2 hover:bg-secondary hover:text-on-secondary
                       active:scale-95 transition-all">
          Search
        </button>
      </div>

      <!-- Advanced Options -->
      <div class="flex flex-wrap gap-2 mt-4 text-sm">
        <button type="button" class="text-primary hover:underline">
          ⬇️ Price: Low to High
        </button>
        <button type="button" class="text-primary hover:underline">
          ↑ In Stock Only
        </button>
        <button type="button" class="text-primary hover:underline">
          ⭐ Top Rated
        </button>
      </div>
    </form>
  `,
  styles: []
})
export class SearchFormComponent {
  searchTerm = signal('');

  onSearch() {
    console.log('Search:', this.searchTerm());
  }
}
```

---

## 6. Sign Up Form

**File:** `projects/auth/src/app/feature/signup-form.ts`

```typescript
import { Component, signal } from '@angular/core';
import { CommonModule, FormsModule } from '@angular/common';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  agreeToTerms: boolean;
}

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()" class="max-w-md mx-auto bg-surface-container rounded-2xl p-8 shadow-lg">
      <!-- Header -->
      <div class="text-center mb-8">
        <h2 class="font-headline text-3xl font-bold text-on-surface mb-2">
          Create Account
        </h2>
        <p class="text-on-surface-variant">
          Join our farming community today
        </p>
      </div>

      <!-- Full Name -->
      <div class="mb-5">
        <label class="font-label text-sm font-bold text-on-surface block mb-2">
          Full Name
        </label>
        <input 
          type="text"
          [(ngModel)]="formData.fullName"
          name="fullName"
          required
          class="w-full px-4 py-3 rounded-lg border border-outline-variant 
                 bg-surface-container-lowest text-on-surface
                 focus:border-primary focus:ring-2 focus:ring-primary/30 
                 transition-all font-body"
          placeholder="John Doe"
        />
      </div>

      <!-- Email -->
      <div class="mb-5">
        <label class="font-label text-sm font-bold text-on-surface block mb-2">
          Email Address
        </label>
        <input 
          type="email"
          [(ngModel)]="formData.email"
          name="email"
          required
          class="w-full px-4 py-3 rounded-lg border border-outline-variant 
                 bg-surface-container-lowest text-on-surface
                 focus:border-primary focus:ring-2 focus:ring-primary/30 
                 transition-all font-body"
          placeholder="you@example.com"
        />
      </div>

      <!-- Password -->
      <div class="mb-5">
        <label class="font-label text-sm font-bold text-on-surface block mb-2">
          Password
        </label>
        <input 
          type="password"
          [(ngModel)]="formData.password"
          name="password"
          required
          class="w-full px-4 py-3 rounded-lg border border-outline-variant 
                 bg-surface-container-lowest text-on-surface
                 focus:border-primary focus:ring-2 focus:ring-primary/30 
                 transition-all font-body"
          placeholder="••••••••"
        />
      </div>

      <!-- Confirm Password -->
      <div class="mb-6">
        <label class="font-label text-sm font-bold text-on-surface block mb-2">
          Confirm Password
        </label>
        <input 
          type="password"
          [(ngModel)]="formData.confirmPassword"
          name="confirmPassword"
          required
          class="w-full px-4 py-3 rounded-lg border border-outline-variant 
                 bg-surface-container-lowest text-on-surface
                 focus:border-primary focus:ring-2 focus:ring-primary/30 
                 transition-all font-body"
          placeholder="••••••••"
        />
        <div *ngIf="formData.password && formData.password !== formData.confirmPassword"
             class="mt-2 text-error-container text-sm flex items-center gap-2">
          ⚠️ Passwords don't match
        </div>
      </div>

      <!-- Terms Checkbox -->
      <div class="mb-6 flex items-center gap-3">
        <input 
          type="checkbox"
          [(ngModel)]="formData.agreeToTerms"
          name="terms"
          id="terms"
          class="w-5 h-5 rounded accent-primary"
        />
        <label for="terms" class="text-sm text-on-surface-variant font-body">
          I agree to the 
          <a href="#" class="text-primary font-bold hover:underline">Terms of Service</a>
          and 
          <a href="#" class="text-primary font-bold hover:underline">Privacy Policy</a>
        </label>
      </div>

      <!-- Submit Button -->
      <button 
        type="submit"
        [disabled]="!formData.agreeToTerms || formData.password !== formData.confirmPassword"
        class="w-full bg-primary text-on-primary py-3 rounded-lg font-bold font-headline text-lg
               hover:bg-primary-container hover:text-on-primary-container
               disabled:bg-surface-container disabled:text-on-surface-variant
               active:scale-95 transition-all">
        Create Account
      </button>

      <!-- Sign In Link -->
      <p class="text-center text-on-surface-variant mt-6 font-body">
        Already have an account? 
        <a href="/auth/signin" class="text-primary font-bold hover:underline">
          Sign in here
        </a>
      </p>
    </form>
  `,
  styles: []
})
export class SignupFormComponent {
  formData = signal<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    agreeToTerms: false
  });

  onSubmit() {
    const data = this.formData();
    console.log('Form submitted:', data);
    // Handle form submission
  }
}
```

---

## 7. Alert/Notification

**File:** `projects/shell/src/app/feature/alert.ts`

```typescript
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type AlertType = 'success' | 'error' | 'warning' | 'info';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rounded-lg p-4 flex gap-3 items-start border"
         [ngClass]="getAlertClasses()">
      <span class="text-2xl flex-shrink-0">{{ getIcon() }}</span>
      
      <div class="flex-1">
        <h4 class="font-bold font-headline" [ngClass]="getTitleClass()">
          {{ title }}
        </h4>
        <p class="text-sm mt-1" [ngClass]="getTextClass()">
          {{ message }}
        </p>
      </div>

      <button (click)="onClose()"
              class="text-xl flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity">
        ✕
      </button>
    </div>
  `,
  styles: []
})
export class AlertComponent {
  @Input() type: AlertType = 'info';
  @Input() title = 'Alert';
  @Input() message = '';
  @Input() closeable = true;

  onClose() {
    console.log('Alert closed');
  }

  getAlertClasses(): string {
    const base = 'rounded-lg p-4 flex gap-3 items-start border';
    
    switch (this.type) {
      case 'success':
        return `${base} bg-primary-fixed text-on-primary-fixed border-primary-fixed`;
      case 'error':
        return `${base} bg-error-container text-on-error-container border-error`;
      case 'warning':
        return `${base} bg-secondary-container text-on-secondary-container border-secondary`;
      case 'info':
      default:
        return `${base} bg-tertiary-fixed text-on-tertiary-fixed border-tertiary`;
    }
  }

  getTitleClass(): string {
    switch (this.type) {
      case 'success': return 'text-on-primary-fixed';
      case 'error': return 'text-on-error-container';
      case 'warning': return 'text-on-secondary-container';
      default: return 'text-on-tertiary-fixed';
    }
  }

  getTextClass(): string {
    return this.getTitleClass();
  }

  getIcon(): string {
    switch (this.type) {
      case 'success': return '✓';
      case 'error': return '✕';
      case 'warning': return '⚠';
      default: return 'ℹ';
    }
  }
}
```

---

## Usage Examples

```typescript
// In your component
<app-alert 
  type="success"
  title="Success!"
  message="Your order has been placed successfully"
/>

<app-alert 
  type="error"
  title="Error"
  message="Failed to process payment"
/>

<app-alert 
  type="warning"
  title="Warning"
  message="Stock is running low"
/>
```

---

**Copy these components and start building beautiful Material Design 3 interfaces!** 🎨✨
