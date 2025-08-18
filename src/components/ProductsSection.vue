<template>
    <section id="products" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold text-primary mb-4">Our Handcrafted Collection</h2>
                <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                    Discover unique pieces crafted with love and attention to detail.
                    Each item is carefully selected to bring warmth and beauty to your home.
                </p>
            </div>

            <!-- Search and Filter -->
            <div class="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
                <!-- Search Input -->
                <div class="relative flex-1 max-w-md">
                    <input v-model="searchQuery" type="text" placeholder="Search products..."
                        class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                    <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>

                <!-- Price Filter -->
                <div class="flex items-center space-x-4">
                    <select v-model="priceFilter"
                        class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                        <option value="">All Prices</option>
                        <option value="0-25">Under $25</option>
                        <option value="25-50">$25 - $50</option>
                        <option value="50-100">$50 - $100</option>
                        <option value="100+">Over $100</option>
                    </select>

                    <!-- Sort -->
                    <select v-model="sortBy"
                        class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                        <option value="name">Sort by Name</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                    </select>
                </div>
            </div>

            <!-- Loading and Error States -->
            <div v-if="loading" class="text-center py-12">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p class="mt-4 text-gray-600">Loading products...</p>
            </div>

            <div v-else-if="error" class="text-center py-12">
                <p class="text-red-600 mb-4">{{ error }}</p>
                <button @click="loadProducts" class="btn-primary">Try Again</button>
            </div>

            <div v-else>
                <!-- Results Count -->
                <div class="mb-6 text-center">
                    <p class="text-gray-600">
                        Showing {{ products.length }} products
                    </p>
                </div>

                <!-- Product Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    <div v-for="product in products" :key="product.id" class="product-card group">
                        <!-- Product Image -->
                        <div class="relative overflow-hidden">
                            <img :src="product.image" :alt="product.name" class="product-image" />
                            <div
                                class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300">
                            </div>

                            <!-- Quick Add Button -->
                            <div
                                class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button @click="$emit('add-to-cart', product.id)"
                                    class="bg-white text-primary px-6 py-3 rounded-lg font-semibold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-secondary hover:text-primary">
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        <!-- Product Info -->
                        <div class="p-6">
                            <div class="flex items-center justify-between mb-2">
                                <span class="text-sm text-gray-500 uppercase tracking-wide">{{ product.category
                                }}</span>
                                <div class="flex items-center space-x-1">
                                    <svg class="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                        </path>
                                    </svg>
                                    <svg class="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                        </path>
                                    </svg>
                                    <svg class="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                        </path>
                                    </svg>
                                    <svg class="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                        </path>
                                    </svg>
                                    <svg class="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                        </path>
                                    </svg>
                                </div>
                            </div>

                            <h3
                                class="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                                {{ product.name }}
                            </h3>

                            <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                                {{ product.description }}
                            </p>

                            <div class="flex items-center justify-between">
                                <span class="text-2xl font-bold text-primary">${{ product.price }}</span>
                                <button @click="$emit('add-to-cart', product.id)"
                                    class="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <!-- View All Button -->
            <div class="text-center mt-12">
                <button class="btn-secondary">
                    View All Products
                </button>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { productsApi, type Product } from '../services/api';

defineEmits<{
    'add-to-cart': [productId: number]
}>();

// State
const products = ref<Product[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

// Search and filter state
const searchQuery = ref('');
const priceFilter = ref('');
const sortBy = ref('name');

// Load products from API
const loadProducts = async () => {
    try {
        loading.value = true;
        error.value = null;

        const params: any = {};

        // Add search parameter
        if (searchQuery.value) {
            params.search = searchQuery.value;
        }

        // Add price filter
        if (priceFilter.value) {
            switch (priceFilter.value) {
                case '0-25':
                    params.maxPrice = 25;
                    break;
                case '25-50':
                    params.minPrice = 25;
                    params.maxPrice = 50;
                    break;
                case '50-100':
                    params.minPrice = 50;
                    params.maxPrice = 100;
                    break;
                case '100+':
                    params.minPrice = 100;
                    break;
            }
        }

        // Add sort parameter
        if (sortBy.value) {
            params.sort = sortBy.value;
        }

        products.value = await productsApi.getProducts(params);
    } catch (err) {
        error.value = err instanceof Error ? err.message : 'Failed to load products';
        console.error('Error loading products:', err);
    } finally {
        loading.value = false;
    }
};

// Watch for changes in search and filters
const debouncedLoad = ref<number | null>(null);

const updateProducts = () => {
    if (debouncedLoad.value) {
        clearTimeout(debouncedLoad.value);
    }

    debouncedLoad.value = window.setTimeout(() => {
        loadProducts();
    }, 300); // Debounce for 300ms
};

// Watch for changes
const watchSearch = computed(() => searchQuery.value);
const watchPriceFilter = computed(() => priceFilter.value);
const watchSortBy = computed(() => sortBy.value);

// Load products on mount
onMounted(() => {
    loadProducts();
});

// Watch for changes and reload products
watch(watchSearch, updateProducts);
watch(watchPriceFilter, updateProducts);
watch(watchSortBy, updateProducts);
</script>
