<template>
  <section id="home" class="relative bg-gradient-to-br from-primary/10 to-secondary/20 py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Content -->
        <div class="space-y-8">
          <div class="space-y-4">
            <h1 class="text-5xl lg:text-6xl font-bold text-primary leading-tight">
              Welcome to
              <span class="text-secondary">Cozy Corner</span>
            </h1>
            <p class="text-xl text-gray-700 leading-relaxed">
              Discover handcrafted treasures that bring warmth and beauty to your home.
              Each piece tells a story of craftsmanship and care.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-4">
            <button @click="scrollToSection('products')" class="btn-primary">
              Shop Now
            </button>
            <button @click="scrollToSection('about')" class="btn-secondary">
              Learn More
            </button>
          </div>

          <div class="flex items-center space-x-8 text-sm text-gray-600">
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"></path>
              </svg>
              <span>Free Shipping</span>
            </div>
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"></path>
              </svg>
              <span>Handcrafted</span>
            </div>
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"></path>
              </svg>
              <span>30-Day Returns</span>
            </div>
          </div>
        </div>

        <!-- Featured Product Image -->
        <div class="relative">
          <div class="relative overflow-hidden rounded-2xl shadow-2xl">
            <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop&crop=center"
              alt="Featured Product - Handcrafted Ceramic Mug"
              class="w-full h-96 lg:h-[500px] object-cover product-image" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          <!-- Floating Product Card -->
          <div class="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 max-w-xs">
            <div class="flex items-center space-x-3">
              <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=80&h=80&fit=crop&crop=center"
                alt="Ceramic Mug" class="w-16 h-16 rounded-lg object-cover" />
              <div>
                <h3 class="font-semibold text-gray-900">Handcrafted Mug</h3>
                <p class="text-primary font-bold">$24.99</p>
                <div class="flex items-center space-x-1 mt-1">
                  <svg class="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                    </path>
                  </svg>
                  <span class="text-sm text-gray-600">4.9 (128 reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No additional logic needed for this component
function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>
