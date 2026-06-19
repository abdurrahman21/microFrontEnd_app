import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FormData {
  fullName: string;
  email: string;
  password: string;
  rememberMe: boolean;
}

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <!-- Card -->
        <div class="card">
          <!-- Header -->
          <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
              <span class="material-symbols-outlined text-green-600">lock</span>
            </div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Sign Up</h1>
            <p class="text-gray-600 dark:text-gray-300 mt-2">Create your account to get started</p>
          </div>

          <!-- Form -->
          <form (ngSubmit)="onSubmit()" class="space-y-4">
            <!-- Full Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input 
                type="text"
                [(ngModel)]="formData.fullName"
                name="fullName"
                placeholder="John Doe"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input 
                type="email"
                [(ngModel)]="formData.email"
                name="email"
                placeholder="you@example.com"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <!-- Password -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input 
                type="password"
                [(ngModel)]="formData.password"
                name="password"
                placeholder="••••••••"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <!-- Remember Me -->
            <div class="flex items-center">
              <input 
                type="checkbox"
                [(ngModel)]="formData.rememberMe"
                name="rememberMe"
                class="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <label class="ml-2 text-sm text-gray-600 dark:text-gray-300">
                Remember me for next time
              </label>
            </div>

            <!-- Submit Button -->
            <button 
              type="submit"
              class="w-full btn-primary mt-6"
            >
              Create Account
            </button>
          </form>

          <!-- Divider -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
            </div>
          </div>

          <!-- Social Buttons -->
          <div class="grid grid-cols-2 gap-4">
            <button class="btn-secondary">
              <span class="material-symbols-outlined">google</span>
            </button>
            <button class="btn-secondary">
              <span class="material-symbols-outlined">cloud</span>
            </button>
          </div>

          <!-- Footer -->
          <p class="text-center text-sm text-gray-600 dark:text-gray-300 mt-6">
            Already have an account? 
            <a href="#" class="text-green-600 hover:text-green-700 font-semibold">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AuthFormComponent {
  formData: FormData = {
    fullName: '',
    email: '',
    password: '',
    rememberMe: false
  };

  onSubmit() {
    console.log('Form submitted:', this.formData);
    // Handle form submission here
  }
}
