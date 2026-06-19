# Tailwind CSS Configuration Guide for Angular Microfrontend

This guide explains how to set up and configure Tailwind CSS in your Angular 20 microfrontend workspace.

## Quick Setup (5 minutes)

### Step 1: Install Dependencies

```bash
npm install -D tailwindcss postcss autoprefixer
```

### Step 2: Initialize Tailwind Configuration

```bash
npx tailwindcss init -p
```

This creates:
- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS configuration

### Step 3: Configure Template Paths

Edit `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./projects/shell/src/**/*.{html,ts}",
    "./projects/product/src/**/*.{html,ts}",
    "./projects/order/src/**/*.{html,ts}",
    "./projects/cart/src/**/*.{html,ts}",
    "./projects/auth/src/**/*.{html,ts}",
    "./projects/dashboard/src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### Step 4: Add Tailwind Directives to Global Styles

Edit each app's `src/styles.scss`:

```scss
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Optional: Your global styles here */
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
```

### Step 5: Update angular.json

Ensure each project has proper style configuration in `angular.json`:

```json
"build": {
  "builder": "ngx-build-plus:browser",
  "options": {
    "styles": [
      "projects/[app]/src/styles.scss"
    ],
    "inlineStyleLanguage": "scss"
  }
}
```

### Step 6: Start Development Server

```bash
npm run start:product
# or any app
```

## Complete Setup Files

### 1. tailwind.config.js (Root)

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./projects/shell/src/**/*.{html,ts}",
    "./projects/product/src/**/*.{html,ts}",
    "./projects/order/src/**/*.{html,ts}",
    "./projects/cart/src/**/*.{html,ts}",
    "./projects/auth/src/**/*.{html,ts}",
    "./projects/dashboard/src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        secondary: {
          50: '#f5f3ff',
          500: '#a78bfa',
          600: '#9333ea',
          700: '#7e22ce',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
```

### 2. postcss.config.js (Root)

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### 3. Global Styles Template (for each app)

Edit `projects/[app]/src/styles.scss`:

```scss
/* Tailwind CSS Directives */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Base Styles */
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom Components (optional) */
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors;
  }

  .btn-secondary {
    @apply px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors;
  }

  .card {
    @apply bg-white rounded-lg shadow-md p-6 dark:bg-gray-800;
  }
}

/* Custom Utilities (optional) */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}
```

## Using Tailwind in Components

### Basic Example: Product Card Component

```typescript
// projects/product/src/app/feature/product-card.ts

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card hover:shadow-lg transition-shadow">
      <img 
        [src]="product.image" 
        alt="product" 
        class="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {{ product.name }}
      </h3>
      <p class="text-gray-600 dark:text-gray-300 mb-4">
        {{ product.description }}
      </p>
      <div class="flex justify-between items-center">
        <span class="text-2xl font-bold text-green-600">
          ${{ product.price }}
        </span>
        <button class="btn-primary">
          Add to Cart
        </button>
      </div>
    </div>
  `,
  styles: []
})
export class ProductCardComponent {
  @Input() product!: any;
}
```

### Using Tailwind with Inline Styles

```typescript
@Component({
  selector: 'app-hero',
  template: `
    <section class="min-h-screen bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center">
      <div class="text-center text-white px-4">
        <h1 class="text-5xl md:text-6xl font-bold mb-4">
          Welcome to Our Store
        </h1>
        <p class="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Fresh produce delivered to your door
        </p>
        <button class="btn-primary bg-white text-green-600 hover:bg-gray-100">
          Get Started
        </button>
      </div>
    </section>
  `
})
export class HeroComponent {}
```

## Tailwind CSS Classes Reference

### Spacing
```html
<!-- Margin: m-4 (1rem) -->
<div class="m-4">Margin all sides</div>

<!-- Padding: p-6 (1.5rem) -->
<div class="p-6">Padding all sides</div>

<!-- Margin X-axis: mx-auto -->
<div class="mx-auto">Center horizontally</div>
```

### Flexbox
```html
<!-- Flex container -->
<div class="flex items-center justify-between gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Flex direction -->
<div class="flex flex-col md:flex-row">Column on mobile, row on desktop</div>
```

### Grid
```html
<!-- Grid layout -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>
```

### Typography
```html
<!-- Text sizes -->
<h1 class="text-5xl font-bold">Heading 1</h1>
<h2 class="text-3xl font-semibold">Heading 2</h2>
<p class="text-base text-gray-600">Paragraph</p>

<!-- Font weights -->
<span class="font-thin">Thin</span>
<span class="font-normal">Normal</span>
<span class="font-bold">Bold</span>
<span class="font-black">Black</span>
```

### Colors
```html
<!-- Text colors -->
<p class="text-green-600">Green text</p>
<p class="text-red-500">Red text</p>

<!-- Background colors -->
<div class="bg-blue-100">Light blue background</div>
<div class="bg-blue-600">Dark blue background</div>

<!-- Border colors -->
<div class="border-2 border-green-500">Green border</div>
```

### Responsive Design
```html
<!-- Mobile first approach -->
<div class="w-full md:w-1/2 lg:w-1/3">
  Full width on mobile, half on tablet, third on desktop
</div>

<!-- Hidden/Visible -->
<div class="hidden md:block">Visible on md+ screens</div>
<div class="md:hidden">Hidden on md+ screens</div>
```

### Hover & Transitions
```html
<!-- Hover states -->
<button class="bg-green-500 hover:bg-green-600 transition-colors">
  Hover me
</button>

<!-- Focus states -->
<input class="border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200" />

<!-- Transitions -->
<div class="transform hover:scale-105 transition-transform duration-300">
  Smooth scale
</div>
```

## Dark Mode

### Enable Dark Mode in tailwind.config.js

```javascript
module.exports = {
  darkMode: 'class', // Use 'media' for system preference
  // ... rest of config
};
```

### Using Dark Mode Classes

```html
<!-- Dark mode examples -->
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content that adapts to dark mode
</div>

<!-- Toggle dark mode in your component -->
<button 
  (click)="toggleDarkMode()"
  class="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
>
  🌙 Toggle Dark Mode
</button>
```

### TypeScript dark mode toggle

```typescript
@Component({...})
export class AppComponent {
  toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
  }
}
```

## Common Patterns

### Card Component
```html
<div class="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
  <h3 class="text-xl font-bold mb-2">Card Title</h3>
  <p class="text-gray-600 dark:text-gray-300">Card content</p>
</div>
```

### Button Group
```html
<div class="flex gap-3">
  <button class="btn-primary">Primary</button>
  <button class="btn-secondary">Secondary</button>
  <button class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
    Outline
  </button>
</div>
```

### Form Input
```html
<div class="mb-4">
  <label class="block text-sm font-medium text-gray-700 mb-2">
    Email Address
  </label>
  <input 
    type="email"
    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
    placeholder="you@example.com"
  />
</div>
```

### Navigation Bar
```html
<nav class="bg-white shadow-md dark:bg-gray-800">
  <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
    <span class="text-2xl font-bold text-green-600">Logo</span>
    <div class="flex gap-8">
      <a href="#" class="text-gray-600 hover:text-green-600 transition-colors">
        Home
      </a>
      <a href="#" class="text-gray-600 hover:text-green-600 transition-colors">
        About
      </a>
    </div>
  </div>
</nav>
```

## Performance Tips

1. **Purging unused CSS**: Tailwind automatically purges unused styles based on `content` config
2. **PurgeCSS Configuration**: Ensure all template files are included in `content` array
3. **CSS Size**: Development mode includes all utilities (~4MB), production strips unused (~10-30KB)
4. **Build Performance**: Use `@apply` for complex repeated patterns instead of inline classes

## Troubleshooting

### Tailwind styles not working?

1. **Check content path**: Verify all `.html` and `.ts` files are in `tailwind.config.js` `content` array
2. **Import directives**: Ensure `@tailwind` directives are in your styles.scss
3. **Clear cache**: Delete `.angular/`, `dist/`, `node_modules/` and run `npm install` again
4. **Rebuild**: Stop dev server and run `npm start` again

### PostCSS not processing?

1. Check `postcss.config.js` exists in root
2. Ensure `tailwindcss` is in dependencies
3. Check `angular.json` has `inlineStyleLanguage: "scss"`

### Styles not applying in components?

1. Component must have `styles` or `styleUrls` array
2. Ensure `styles.scss` is imported globally
3. Check CSS specificity (Tailwind classes are low specificity)

## Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Angular + Tailwind Guide](https://tailwindcss.com/docs/guides/angular)
- [Tailwind UI Components](https://tailwindui.com/)
- [Tailwind Play (Online Editor)](https://play.tailwindcss.com/)

## Next Steps

1. ✅ Install and configure Tailwind
2. ✅ Add directives to global styles
3. ✅ Create reusable component utilities
4. ✅ Build responsive layouts
5. ✅ Implement dark mode
6. ✅ Customize theme for brand colors

Happy styling! 🎨
