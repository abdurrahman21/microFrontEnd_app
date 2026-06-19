# Tailwind CSS Installation & Usage Quick Start

## ⚡ Quick Installation (2 minutes)

### Step 1: Install Dependencies
```bash
npm install -D tailwindcss postcss autoprefixer @tailwindcss/forms @tailwindcss/typography @tailwindcss/aspect-ratio
```

✅ **Already Added to package.json** - Just run `npm install`

### Step 2: Verify Configuration Files Exist

Check that these files are in the workspace root:
- ✅ `tailwind.config.js` - Already created
- ✅ `postcss.config.js` - Already created

### Step 3: Verify Global Styles Updated

Each app's `styles.scss` should start with:
```scss
@tailwind base;
@tailwind components;
@tailwind utilities;
```

✅ **Already updated for:**
- projects/product/src/styles.scss
- projects/order/src/styles.scss
- projects/cart/src/styles.scss
- projects/auth/src/styles.scss

### Step 4: Run Installation & Start Development

```bash
# Install all dependencies
npm install

# Start any app
npm run start:product
# or
npm run start:order
# or
npm run start:cart
# or
npm run start:auth
```

**That's it! Tailwind is ready to use! 🎉**

---

## 🎨 Using Tailwind in Your Components

### Basic Layout Example

```typescript
@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <!-- Hero Section -->
    <section class="min-h-screen bg-gradient-to-r from-green-500 to-blue-600">
      <div class="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center justify-center">
        <h1 class="text-5xl md:text-6xl font-bold text-white text-center">
          Welcome to Our Store
        </h1>
        <p class="text-xl text-white/90 mt-4 max-w-2xl text-center">
          Fresh produce delivered to your door
        </p>
        <button class="mt-8 btn-primary">Get Started</button>
      </div>
    </section>
  `
})
export class HeroComponent {}
```

### Product Card Component (Ready to Use)

```typescript
import { ProductCardComponent } from './feature/product-card';

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      <app-product-card 
        [product]="product"
        *ngFor="let product of products"
      />
    </div>
  `
})
export class ProductsComponent {
  products = [
    {
      id: 1,
      name: 'Organic Tomatoes',
      description: 'Fresh picked this morning',
      price: 4.50,
      image: '...',
      category: 'Vegetables',
      inStock: true
    }
  ];
}
```

---

## 📚 Tailwind Classes Cheat Sheet

### Spacing
```html
<!-- Padding -->
<div class="p-4">          <!-- padding: 1rem (all sides) -->
<div class="px-8">         <!-- padding: left & right -->
<div class="py-6">         <!-- padding: top & bottom -->

<!-- Margin -->
<div class="m-4">          <!-- margin: 1rem (all sides) -->
<div class="mx-auto">      <!-- center horizontally -->
<div class="mt-4">         <!-- margin-top: 1rem -->
```

### Flexbox & Grid
```html
<!-- Flex Container -->
<div class="flex items-center justify-between gap-4">
  <!-- items-center: vertical center -->
  <!-- justify-between: space between items -->
  <!-- gap-4: space between items (1rem) -->

<!-- Flex Direction -->
<div class="flex flex-col">              <!-- column (vertical) -->
<div class="flex md:flex-row">           <!-- row on medium+ screens -->

<!-- Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  <!-- 1 column on mobile, 2 on tablet, 4 on desktop -->
```

### Typography
```html
<!-- Text Sizes -->
<h1 class="text-5xl">            <!-- 3rem -->
<h2 class="text-3xl">            <!-- 1.875rem -->
<p class="text-base">             <!-- 1rem -->
<small class="text-sm">           <!-- 0.875rem -->

<!-- Font Weight -->
<span class="font-light">         <!-- 300 -->
<span class="font-normal">        <!-- 400 -->
<span class="font-semibold">      <!-- 600 -->
<span class="font-bold">          <!-- 700 -->
<span class="font-black">         <!-- 900 -->

<!-- Text Color -->
<p class="text-gray-600">         <!-- Gray color -->
<p class="text-green-500">        <!-- Green color -->
```

### Colors & Backgrounds
```html
<!-- Text Colors -->
<p class="text-red-500">          <!-- Red -->
<p class="text-green-600">        <!-- Green -->
<p class="dark:text-white">       <!-- White in dark mode -->

<!-- Background -->
<div class="bg-gray-100">         <!-- Light gray background -->
<div class="bg-gradient-to-r from-green-500 to-blue-600">
  <!-- Gradient left to right -->

<!-- Borders -->
<div class="border border-gray-300">      <!-- 1px border -->
<div class="border-2 border-green-500">   <!-- 2px green border -->
```

### Hover & Transitions
```html
<!-- Hover State -->
<button class="bg-green-600 hover:bg-green-700">
  <!-- Darker on hover -->

<!-- Transitions -->
<div class="transition-colors duration-300">
  <!-- Smooth color transition over 300ms -->

<!-- Transforms -->
<div class="hover:scale-105 transform transition-transform">
  <!-- Scale 105% on hover -->

<!-- Active/Focus -->
<button class="active:scale-95">  <!-- Scale down when pressed -->
<input class="focus:ring-2 focus:ring-green-500">
```

### Responsive Design (Mobile First!)
```html
<!-- Mobile first approach -->
<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- Full width on mobile
       50% on medium screens (768px+)
       33% on large screens (1024px+)
  -->

<!-- Hidden/Visible -->
<div class="hidden md:block">      <!-- Hide on mobile, show on md+ -->
<div class="md:hidden">            <!-- Show on mobile, hide on md+ -->

<!-- Text Size Responsive -->
<h1 class="text-3xl md:text-5xl lg:text-6xl">
  <!-- Increases as screen size increases -->
```

### Rounded Corners
```html
<div class="rounded">              <!-- 0.25rem (default) -->
<div class="rounded-lg">           <!-- 0.5rem -->
<div class="rounded-xl">           <!-- 0.75rem -->
<div class="rounded-full">         <!-- 9999px (circle) -->
```

### Shadow & Effects
```html
<div class="shadow">               <!-- Light shadow -->
<div class="shadow-lg">            <!-- Large shadow -->
<div class="shadow-2xl">           <!-- Extra large shadow -->
<div class="hover:shadow-xl">      <!-- Larger shadow on hover -->

<!-- Opacity -->
<div class="opacity-50">           <!-- 50% opacity -->
<div class="hover:opacity-75">     <!-- 75% on hover -->
```

---

## 🌙 Dark Mode

### Enable Dark Mode in Component

```typescript
@Component({
  selector: 'app-theme-toggle',
  template: `
    <button (click)="toggleDarkMode()" class="p-2 rounded-lg bg-gray-200 dark:bg-gray-700">
      🌙 Toggle Dark Mode
    </button>
  `
})
export class ThemeToggleComponent {
  toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    // Save preference to localStorage (optional)
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  ngOnInit() {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  }
}
```

### Dark Mode Classes
```html
<!-- Use dark: prefix for dark mode styles -->
<div class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
  <!-- White background + dark text in light mode
       Dark gray background + white text in dark mode
  -->
```

---

## 🔌 Pre-built Components Ready to Use

### 1. Product Card
Location: `projects/product/src/app/feature/product-card.ts`
```typescript
import { ProductCardComponent } from './feature/product-card';

@Component({
  imports: [ProductCardComponent],
  template: `
    <app-product-card [product]="myProduct" />
  `
})
```

### 2. Product Grid
Location: `projects/product/src/app/feature/product-grid.ts`
```typescript
import { ProductGridComponent } from './feature/product-grid';
```

### 3. Auth Form
Location: `projects/auth/src/app/feature/auth-form.ts`
```typescript
import { AuthFormComponent } from './feature/auth-form';
```

---

## ✨ Custom Components (Already in styles.scss)

```html
<!-- Button Primary -->
<button class="btn-primary">Click me</button>

<!-- Button Secondary -->
<button class="btn-secondary">Click me</button>

<!-- Card -->
<div class="card">
  Your content here
</div>

<!-- Badge -->
<span class="badge bg-green-500 text-white">New</span>
```

---

## 🚀 Example: Building a Complete Page

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './feature/product-card';

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `
    <!-- Navigation -->
    <nav class="sticky top-0 z-50 bg-white shadow-md dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-green-600">🌱 Market</h1>
        <button class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
          <span class="material-symbols-outlined">shopping_cart</span>
        </button>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-green-500 to-blue-600 text-white py-20">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <h2 class="text-5xl font-bold mb-4">Fresh from Farm to Your Door</h2>
        <p class="text-xl mb-8">Buy direct from local farmers</p>
        <button class="btn-primary bg-white text-green-600">Shop Now</button>
      </div>
    </section>

    <!-- Products Grid -->
    <section class="py-20 bg-gray-50 dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-6">
        <h3 class="text-3xl font-bold mb-12">Featured Products</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <app-product-card 
            [product]="product"
            *ngFor="let product of products"
          />
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-12">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <p>&copy; 2024 Fresh Market. All rights reserved.</p>
      </div>
    </footer>
  `,
  styles: []
})
export class MarketplaceComponent {
  products = [
    {
      id: 1,
      name: 'Organic Tomatoes',
      description: 'Fresh red tomatoes',
      price: 4.50,
      image: '...',
      category: 'Vegetables',
      inStock: true
    }
    // ... more products
  ];
}
```

---

## 🐛 Troubleshooting

### Styles Not Applying?

1. **Check `styles.scss` has @tailwind directives**
   ```scss
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

2. **Restart dev server**
   ```bash
   # Stop: Ctrl+C
   npm run start:product
   ```

3. **Clear cache**
   ```bash
   rm -rf node_modules/.cache
   npm start
   ```

### Build File Too Large?

- Normal in development (~4MB)
- Production build will be ~15-30KB for unused classes stripped
- Only used classes are included in production

### Classes Not Recognized?

- Ensure template files are in `tailwind.config.js` `content` paths
- Current config covers all projects automatically

---

## 📖 Useful Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Tailwind Play (Online Editor)](https://play.tailwindcss.com/)
- [Tailwind UI Components](https://tailwindui.com/)
- [Angular + Tailwind Guide](https://tailwindcss.com/docs/guides/angular)

---

## ✅ Setup Checklist

- ✅ `tailwind.config.js` - Created
- ✅ `postcss.config.js` - Created
- ✅ Global styles updated with @tailwind
- ✅ Dependencies added to package.json
- ✅ Example components created
- ✅ Custom component classes defined
- ⏳ `npm install` - Ready to run!

**All set! Start building beautiful UIs with Tailwind CSS! 🎨**

---

## 📞 Need Help?

- Check `TAILWIND-SETUP.md` for detailed setup guide
- Review example components in `projects/*/src/app/feature/`
- Run examples and customize for your needs
