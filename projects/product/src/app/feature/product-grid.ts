import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="w-full">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
        <div>
          <h2 class="text-4xl font-bold text-gray-900 dark:text-white">
            Featured Products
          </h2>
          <p class="text-gray-600 dark:text-gray-300 mt-2">
            Discover our latest collection
          </p>
        </div>
        
        <!-- Filter -->
        <div class="w-full sm:w-auto">
          <input 
            type="text" 
            placeholder="Search products..."
            [(ngModel)]="searchTerm"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          *ngFor="let product of filteredProducts()"
          class="card hover:shadow-lg transition-shadow"
        >
          <img 
            [src]="product.image" 
            [alt]="product.name"
            class="w-full h-40 object-cover rounded-lg mb-4"
          />
          <h3 class="font-bold text-lg mb-2">{{ product.name }}</h3>
          <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
            {{ product.description }}
          </p>
          <div class="flex justify-between items-center">
            <span class="text-xl font-bold text-green-600">\${{ product.price }}</span>
            <button class="btn-primary text-sm">Add</button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div *ngIf="filteredProducts().length === 0" class="text-center py-12">
        <p class="text-gray-500 dark:text-gray-400">No products found</p>
      </div>
    </div>
  `,
  styles: []
})
export class ProductGridComponent {
  searchTerm = signal('');

  products = [
    {
      id: 1,
      name: 'Organic Tomatoes',
      description: 'Fresh red tomatoes picked today',
      price: 4.99,
      image: 'https://via.placeholder.com/400x300?text=Tomatoes',
      category: 'Vegetables'
    },
    {
      id: 2,
      name: 'Green Apples',
      description: 'Crisp and refreshing green apples',
      price: 3.99,
      image: 'https://via.placeholder.com/400x300?text=Apples',
      category: 'Fruits'
    },
    {
      id: 3,
      name: 'Fresh Lettuce',
      description: 'Leafy green lettuce bunches',
      price: 2.99,
      image: 'https://via.placeholder.com/400x300?text=Lettuce',
      category: 'Vegetables'
    },
    {
      id: 4,
      name: 'Golden Bananas',
      description: 'Sweet and ripe bananas',
      price: 2.49,
      image: 'https://via.placeholder.com/400x300?text=Bananas',
      category: 'Fruits'
    }
  ];

  filteredProducts = signal(this.products);

  ngOnInit() {
    this.filterProducts();
  }

  filterProducts() {
    const search = this.searchTerm().toLowerCase();
    const filtered = this.products.filter(p =>
      p.name.toLowerCase().includes(search) ||
      p.category.toLowerCase().includes(search)
    );
    this.filteredProducts.set(filtered);
  }
}
