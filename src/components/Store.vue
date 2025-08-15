<template>
    <div class="min-h-screen bg-background">
        <!-- Header -->
        <header class="bg-white shadow-sm border-b border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <!-- Logo -->
                    <div class="flex items-center">
                        <h1 class="text-2xl font-bold text-primary">WarmShop</h1>
                    </div>

                    <!-- Navigation -->
                    <nav class="hidden md:flex space-x-8">
                        <a href="#home" class="text-gray-700 hover:text-primary transition-colors">Home</a>
                        <a href="#products" class="text-gray-700 hover:text-primary transition-colors">Products</a>
                        <a href="#about" class="text-gray-700 hover:text-primary transition-colors">About</a>
                        <a href="#testimonials" class="text-gray-700 hover:text-primary transition-colors">Reviews</a>
                        <a href="#contact" class="text-gray-700 hover:text-primary transition-colors">Contact</a>
                    </nav>

                    <!-- Cart and Admin -->
                    <div class="flex items-center space-x-4">
                        <!-- Cart Button -->
                        <button @click="openCart"
                            class="relative p-2 text-gray-700 hover:text-primary transition-colors">
                            <span class="text-2xl">🛒</span>
                            <span v-if="cart.length > 0"
                                class="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {{ cart.length }}
                            </span>
                        </button>

                        <!-- Admin Link -->
                        <a href="/admin" class="text-sm text-gray-600 hover:text-primary transition-colors">
                            Admin Panel
                        </a>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main>
            <!-- Hero Section -->
            <HeroSection />

            <!-- Products Section -->
            <ProductsSection @add-to-cart="addToCart" />

            <!-- About Section -->
            <AboutSection />

            <!-- Testimonials Section -->
            <TestimonialsSection />

            <!-- Contact Section -->
            <ContactSection />
        </main>

        <!-- Cart Modal -->
        <CartModal :is-open="isCartOpen" :cart-items="cart" @close="closeCart" @update-quantity="updateCartItemQuantity"
            @remove-item="removeFromCart" @checkout="openCheckout" />

        <!-- Checkout Modal -->
        <CheckoutModal :is-open="isCheckoutOpen" :cart-items="cart" @close="closeCheckout"
            @order-placed="handleOrderPlaced" />

        <!-- Order Confirmation Modal -->
        <OrderConfirmation :is-open="isOrderConfirmationOpen" :order-data="orderData" @close="closeOrderConfirmation"
            @view-details="viewOrderDetails" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HeroSection from './HeroSection.vue';
import ProductsSection from './ProductsSection.vue';
import AboutSection from './AboutSection.vue';
import TestimonialsSection from './TestimonialsSection.vue';
import ContactSection from './ContactSection.vue';
import CartModal from './CartModal.vue';
import CheckoutModal from './CheckoutModal.vue';
import OrderConfirmation from './OrderConfirmation.vue';
import { productsApi } from '../services/api';
import type { CartItem } from '../types';

// Cart state
const cart = ref<CartItem[]>([]);
const isCartOpen = ref(false);
const isCheckoutOpen = ref(false);
const isOrderConfirmationOpen = ref(false);
const orderData = ref<any>(null);

// Cart functions
async function addToCart(productId: number) {
    const existingItem = cart.value.find(item => item.product.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        try {
            // Get product details from API
            const product = await productsApi.getProduct(productId);
            cart.value.push({
                product,
                quantity: 1
            });
        } catch (error) {
            console.error('Failed to get product details:', error);
            // Fallback to placeholder
            cart.value.push({
                product: {
                    id: productId,
                    name: 'Product',
                    price: 0,
                    image: '',
                    description: '',
                    category: ''
                },
                quantity: 1
            });
        }
    }
}

function openCart() {
    console.log('Opening cart...');
    isCartOpen.value = true;
    console.log('Cart open state:', isCartOpen.value);
}

function closeCart() {
    isCartOpen.value = false;
}

function updateCartItemQuantity(productId: number, quantity: number) {
    const item = cart.value.find(item => item.product.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
        }
    }
}

function removeFromCart(productId: number) {
    cart.value = cart.value.filter(item => item.product.id !== productId);
}

function openCheckout() {
    isCartOpen.value = false;
    isCheckoutOpen.value = true;
}

function closeCheckout() {
    isCheckoutOpen.value = false;
}

function handleOrderPlaced(order: any) {
    orderData.value = order;
    isCheckoutOpen.value = false;
    isOrderConfirmationOpen.value = true;
    cart.value = []; // Clear cart after order
}

function closeOrderConfirmation() {
    isOrderConfirmationOpen.value = false;
    orderData.value = null;
}

function viewOrderDetails() {
    console.log('View order details:', orderData.value);
    if (orderData.value) {
        alert(`Order ${orderData.value.orderNumber} details would be shown here.\n\n📧 Order copy has been sent to your email: ${orderData.value.shipping.email}`);
    }
    closeOrderConfirmation();
}
</script>
