import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card hover:shadow-lg transition-shadow group">
      <!-- Product Image -->
      <div class="relative h-48 rounded-lg overflow-hidden mb-4 bg-gray-100">
        <img 
          [src]="product.image" 
          [alt]="product.name"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <!-- Badge -->
        <div class="absolute top-3 right-3">
          <span 
            class="badge"
            [ngClass]="{
              'bg-green-500 text-white': product.inStock,
              'bg-red-500 text-white': !product.inStock
            }"
          >
            {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
          </span>
        </div>
      </div>

      <!-- Content -->
      <div class="flex flex-col flex-1">
        <!-- Category -->
        <span class="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">
          {{ product.category }}
        </span>

        <!-- Product Name -->
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 truncate-2">
          {{ product.name }}
        </h3>

        <!-- Description -->
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-1 truncate-2">
          {{ product.description }}
        </p>

        <!-- Footer: Price and Button -->
        <div class="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <span class="text-2xl font-bold text-green-600">
            \${{ product.price.toFixed(2) }}
          </span>
          <button 
            class="btn-primary text-sm"
            [disabled]="!product.inStock"
            [ngClass]="{ 'opacity-50 cursor-not-allowed': !product.inStock }"
          >
            <span class="material-symbols-outlined text-base">add_shopping_cart</span>
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
