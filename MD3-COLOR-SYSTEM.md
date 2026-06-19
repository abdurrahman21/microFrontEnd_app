# Material Design 3 Color System Integration Guide

## Overview

Your Tailwind configuration now includes the complete **Material Design 3 (MD3) color system** from the Arboretum Market design. This provides a comprehensive, accessible color palette with semantic color roles for consistent theming across all projects.

---

## Color System Structure

The MD3 system is organized into **semantic color roles** rather than generic color names. Each role has a purpose:

### Primary Colors (Green Theme)
```
primary:                    #114900  (Main brand color - Dark green)
on-primary:                 #ffffff  (Text/elements ON primary backgrounds)
primary-container:          #1f6306  (Container backgrounds using primary)
on-primary-container:       #94de76  (Text ON primary containers)
primary-fixed:              #aaf68b  (Fixed color variant)
primary-fixed-dim:          #8fd972  (Dimmed fixed variant)
```

**Usage in HTML:**
```html
<!-- Primary brand button -->
<button class="bg-primary text-on-primary">Shop Now</button>

<!-- Primary container (backgrounds) -->
<div class="bg-primary-container text-on-primary-container">
  Featured Section
</div>

<!-- Icon indicators -->
<span class="text-primary-fixed">✓ In Stock</span>
```

---

### Secondary Colors (Brown/Gold Theme)
```
secondary:                  #745b00  (Secondary brand accent)
on-secondary:               #ffffff  (Text ON secondary)
secondary-container:        #fecb1e  (Container backgrounds)
on-secondary-container:     #6f5700  (Text ON secondary containers)
secondary-fixed:            #ffe08d  (Fixed variant)
secondary-fixed-dim:        #f2c007  (Dimmed fixed variant)
```

**Usage in HTML:**
```html
<!-- Secondary action buttons -->
<button class="bg-secondary-container text-on-secondary-container">
  View Details
</button>

<!-- Badges and tags -->
<span class="bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-full">
  Sale
</span>
```

---

### Tertiary Colors (Green Earth Tone)
```
tertiary:                   #2f4425  (Tertiary accent)
on-tertiary:                #ffffff  (Text ON tertiary)
tertiary-container:         #455c3b  (Container backgrounds)
on-tertiary-container:      #b9d3a9  (Text ON tertiary containers)
tertiary-fixed:             #d0ebbf  (Fixed variant)
tertiary-fixed-dim:         #b4cea5  (Dimmed fixed variant)
```

**Usage in HTML:**
```html
<!-- Tertiary cards or sections -->
<div class="bg-tertiary-fixed rounded-lg p-4">
  <h3 class="text-tertiary">Secondary Information</h3>
</div>

<!-- Indicators or highlights -->
<div class="border-2 border-tertiary-container">
  Highlighted content
</div>
```

---

### Neutral Colors (Surfaces)
```
background:                 #f8faf4  (Page background)
on-background:              #191c19  (Text ON background)
surface:                    #f8faf4  (Component surfaces)
on-surface:                 #191c19  (Text ON surfaces)
surface-variant:            #e1e3dd  (Variant surfaces)
on-surface-variant:         #41493b  (Text ON surface variants)
```

**Usage in HTML:**
```html
<!-- Main page background -->
<body class="bg-background text-on-background">
  <!-- Card surfaces -->
  <div class="bg-surface text-on-surface rounded-lg p-4">
    Content here
  </div>
</body>
```

---

### Surface Container Hierarchy
For layering and depth:
```
surface-container-lowest:   #ffffff   (Raised elements)
surface-container-low:      #f2f4ee   (Cards, panels)
surface-container:          #edefe8   (Default containers)
surface-container-high:     #e7e9e3   (Overlays)
surface-container-highest:  #e1e3dd   (Modals, dialogs)
```

**Usage for Elevation:**
```html
<!-- Base card -->
<div class="bg-surface-container rounded-xl p-4">
  Card content
</div>

<!-- Raised/Elevated card -->
<div class="bg-surface-container-low rounded-xl p-4 shadow-lg">
  Elevated content
</div>

<!-- Dialog/Modal -->
<div class="bg-surface-container-highest rounded-xl p-6">
  Modal content
</div>
```

---

### Error Colors
```
error:                      #ba1a1a  (Error state indicator)
on-error:                   #ffffff  (Text ON error)
error-container:            #ffdad6  (Error background)
on-error-container:         #93000a  (Text ON error background)
```

**Usage in HTML:**
```html
<!-- Error message -->
<div class="bg-error-container text-on-error-container rounded-lg p-3">
  <span class="text-error font-bold">⚠</span> Invalid email format
</div>

<!-- Error input -->
<input class="border-2 border-error focus:ring-2 focus:ring-error/30" />
```

---

### Outline Colors
```
outline:                    #717a6a  (Border/divider)
outline-variant:            #c0c9b7  (Subtle borders)
```

**Usage in HTML:**
```html
<!-- Primary border -->
<div class="border border-outline">
  Bordered content
</div>

<!-- Subtle divider -->
<hr class="border-outline-variant" />

<!-- Focus ring -->
<input class="focus:ring-2 focus:ring-outline" />
```

---

### Inverse Colors (For overlays on media)
```
inverse-surface:            #2e312d  (Dark background over images)
inverse-on-surface:         #eff1eb  (Light text on dark backgrounds)
inverse-primary:            #8fd972  (Bright primary on dark)
```

**Usage in HTML:**
```html
<!-- Hero section with overlay -->
<section class="relative">
  <img src="background.jpg" />
  <div class="absolute inset-0 bg-inverse-surface/60">
    <h1 class="text-inverse-on-surface text-4xl">
      Fresh from Farm to Your Home
    </h1>
  </div>
</section>
```

---

## Font Family Configuration

Three semantic font families are configured:

```javascript
fontFamily: {
  headline: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],  // Bold titles
  body: ['Inter', 'system-ui', 'sans-serif'],                  // Body text
  label: ['Inter', 'system-ui', 'sans-serif'],                 // Labels & UI
}
```

**Usage in HTML:**
```html
<h1 class="font-headline text-4xl font-bold">
  Main Heading
</h1>

<p class="font-body text-base">
  This is body text content.
</p>

<label class="font-label text-sm">
  Form label
</label>
```

---

## Complete Component Examples

### 1. Product Card Component
```html
<div class="bg-surface-container rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
  <!-- Image container -->
  <div class="h-48 rounded-xl overflow-hidden mb-4 relative">
    <img src="product.jpg" class="w-full h-full object-cover" />
    
    <!-- Stock badge -->
    <span class="absolute top-2 right-2 bg-secondary-container text-on-secondary-container 
                   text-xs font-bold px-3 py-1 rounded-full">
      In Stock
    </span>
  </div>

  <!-- Product info -->
  <h3 class="font-headline font-bold text-lg text-on-surface">
    Organic Tomatoes
  </h3>
  <p class="text-on-surface-variant text-sm mb-3">
    Fresh picked today
  </p>

  <!-- Price and action -->
  <div class="flex justify-between items-center pt-4 border-t border-outline-variant">
    <span class="text-primary font-black text-xl">$4.50/kg</span>
    <button class="bg-primary text-on-primary px-4 py-2 rounded-lg 
                   hover:bg-primary-container hover:text-on-primary-container 
                   transition-all">
      Add to Cart
    </button>
  </div>
</div>
```

---

### 2. Hero Section with Overlay
```html
<section class="relative min-h-screen flex items-center justify-center overflow-hidden">
  <!-- Background image -->
  <img src="farm-hero.jpg" class="absolute inset-0 w-full h-full object-cover" />
  
  <!-- Overlay -->
  <div class="absolute inset-0 bg-inverse-surface/50 backdrop-blur-sm"></div>
  
  <!-- Content -->
  <div class="relative z-10 max-w-2xl mx-auto px-6 text-center">
    <h1 class="font-headline text-5xl font-extrabold text-inverse-on-surface mb-6">
      Fresh from Farm to Your Home
    </h1>
    <p class="text-inverse-on-surface/80 text-lg mb-8">
      Buy directly from local farmers
    </p>
    
    <!-- CTA buttons -->
    <div class="flex gap-4 justify-center">
      <button class="bg-primary text-on-primary px-8 py-4 rounded-full 
                     font-bold hover:scale-105 transition-all">
        Shop Now
      </button>
      <button class="bg-inverse-surface/30 backdrop-blur border border-inverse-on-surface/20 
                     text-inverse-on-surface px-8 py-4 rounded-full font-bold 
                     hover:bg-inverse-surface/50 transition-all">
        Learn More
      </button>
    </div>
  </div>
</section>
```

---

### 3. Form Component
```html
<form class="bg-surface-container rounded-2xl p-6 space-y-4 max-w-md mx-auto">
  <!-- Title -->
  <h2 class="font-headline text-2xl font-bold text-on-surface mb-6">
    Create Account
  </h2>

  <!-- Email input -->
  <div class="space-y-2">
    <label class="font-label text-sm font-bold text-on-surface">
      Email Address
    </label>
    <input 
      type="email" 
      class="w-full px-4 py-3 rounded-lg border border-outline-variant 
             bg-surface-container-lowest text-on-surface 
             focus:border-primary focus:ring-2 focus:ring-primary/30 
             transition-all"
      placeholder="you@example.com"
    />
  </div>

  <!-- Password input -->
  <div class="space-y-2">
    <label class="font-label text-sm font-bold text-on-surface">
      Password
    </label>
    <input 
      type="password" 
      class="w-full px-4 py-3 rounded-lg border border-outline-variant 
             bg-surface-container-lowest text-on-surface 
             focus:border-primary focus:ring-2 focus:ring-primary/30 
             transition-all"
      placeholder="••••••••"
    />
  </div>

  <!-- Submit button -->
  <button class="w-full bg-primary text-on-primary py-3 rounded-lg font-bold 
                 hover:bg-primary-container hover:text-on-primary-container 
                 active:scale-95 transition-all mt-6">
    Sign Up
  </button>

  <!-- Sign in link -->
  <p class="text-center text-on-surface-variant">
    Already have an account? 
    <a href="#" class="text-primary font-bold hover:underline">Sign in</a>
  </p>
</form>
```

---

### 4. Navigation Bar
```html
<header class="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant">
  <div class="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
    <!-- Logo -->
    <div class="flex items-center gap-2">
      <span class="text-primary text-2xl font-bold font-headline">🌿 Arboretum</span>
    </div>

    <!-- Navigation -->
    <nav class="hidden md:flex items-center gap-8">
      <a href="#" class="text-on-surface-variant hover:text-primary transition-colors">Shop</a>
      <a href="#" class="text-on-surface-variant hover:text-primary transition-colors">Farms</a>
      <a href="#" class="text-on-surface-variant hover:text-primary transition-colors">About</a>
    </nav>

    <!-- Actions -->
    <div class="flex items-center gap-4">
      <button class="text-on-surface-variant hover:text-primary transition-colors">
        🛒 Cart
      </button>
      <button class="bg-primary-container text-on-primary-container px-6 py-2 rounded-full 
                     font-bold hover:bg-primary hover:text-on-primary transition-all">
        Sign In
      </button>
    </div>
  </div>
</header>
```

---

## Dark Mode Support

The configuration includes `darkMode: 'class'` - add the `dark` class to enable dark mode:

```html
<!-- Add to <html> or root element -->
<html class="dark">
  <body class="bg-background text-on-surface dark:bg-inverse-surface dark:text-inverse-on-surface">
    <!-- Content automatically uses dark colors -->
  </body>
</html>
```

Colors automatically adjust - the MD3 system provides semantic roles that work in both light and dark modes!

---

## Installation & Next Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add fonts to your HTML** (in `index.html`):
   ```html
   <link 
     href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap" 
     rel="stylesheet" 
   />
   ```

3. **Add Material Symbols** (optional):
   ```html
   <link 
     href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" 
     rel="stylesheet" 
   />
   ```

4. **Start development:**
   ```bash
   npm run start:product
   ```

5. **Start using the colors:**
   ```html
   <div class="bg-primary text-on-primary">...</div>
   <button class="bg-secondary-container text-on-secondary-container">...</button>
   ```

---

## Color Reference Quick Table

| Role | Light | Dark | Usage |
|------|-------|------|-------|
| `primary` | #114900 | #aaf68b | Main brand buttons, active states |
| `on-primary` | #ffffff | #042100 | Text on primary buttons |
| `secondary` | #745b00 | #ffe08d | Secondary actions, accents |
| `tertiary` | #2f4425 | #d0ebbf | Tertiary info, highlights |
| `background` | #f8faf4 | #191c19 | Page background |
| `surface` | #f8faf4 | #191c19 | Card/component backgrounds |
| `error` | #ba1a1a | #ffdad6 | Error states |
| `outline` | #717a6a | #c0c9b7 | Borders, dividers |

---

## Pro Tips

✅ **Always use semantic color roles** - Never hardcode colors directly  
✅ **Use `-container` and `on-` variants** - Ensures contrast compliance  
✅ **Leverage surface containers** - For proper elevation hierarchy  
✅ **Test dark mode** - Add `dark` class to `<html>` and verify  
✅ **Combine with responsive design** - Use `md:`, `lg:` prefixes  
✅ **Use Tailwind utilities** - `hover:`, `focus:`, `active:` states  

---

**Happy styling! Your app now uses a professional, accessible Material Design 3 color system.** 🎨
