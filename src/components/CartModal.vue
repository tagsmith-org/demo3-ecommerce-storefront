<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeCart" class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
              <!-- Header -->
              <div class="bg-primary px-6 py-4">
                <DialogTitle class="text-xl font-semibold leading-6 text-white flex items-center justify-between">
                  <span>Shopping Cart</span>
                  <button
                    @click="closeCart"
                    class="text-white hover:text-gray-200 transition-colors"
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </DialogTitle>
              </div>

              <!-- Cart Content -->
              <div class="px-6 py-4">
                <div v-if="props.cartItems && props.cartItems.length > 0" class="space-y-4">
                  <!-- Cart Items -->
                  <div class="max-h-96 overflow-y-auto space-y-4">
                    <div
                      v-for="item in props.cartItems"
                      :key="item.product.id"
                      class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <!-- Product Image -->
                      <img
                        :src="item.product.image"
                        :alt="item.product.name"
                        class="w-16 h-16 object-cover rounded-lg"
                      />
                      
                      <!-- Product Details -->
                      <div class="flex-1">
                        <h3 class="font-semibold text-gray-900">{{ item.product.name }}</h3>
                        <p class="text-sm text-gray-600">{{ item.product.description }}</p>
                        <p class="text-primary font-bold">${{ item.product.price.toFixed(2) }}</p>
                      </div>

                      <!-- Quantity Controls -->
                      <div class="flex items-center space-x-2">
                        <button
                          @click="updateQuantity(item.product.id, item.quantity - 1)"
                          class="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                          :disabled="item.quantity <= 1"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                          </svg>
                        </button>
                        
                        <span class="w-12 text-center font-semibold">{{ item.quantity }}</span>
                        
                        <button
                          @click="updateQuantity(item.product.id, item.quantity + 1)"
                          class="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                          </svg>
                        </button>
                      </div>

                      <!-- Item Total -->
                      <div class="text-right">
                        <p class="font-bold text-gray-900">${{ (item.product.price * item.quantity).toFixed(2) }}</p>
                      </div>

                      <!-- Remove Button -->
                      <button
                        @click="removeItem(item.product.id)"
                        class="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <!-- Order Summary -->
                  <div class="border-t pt-4 space-y-2">
                    <div class="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>${{ subtotal.toFixed(2) }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span>Shipping:</span>
                      <span>${{ shipping.toFixed(2) }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span>Tax:</span>
                      <span>${{ tax.toFixed(2) }}</span>
                    </div>
                    <div class="flex justify-between text-lg font-bold border-t pt-2">
                      <span>Total:</span>
                      <span class="text-primary">${{ total.toFixed(2) }}</span>
                    </div>
                  </div>
                </div>

                <!-- Empty Cart -->
                <div v-else class="text-center py-8">
                  <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
                  </svg>
                  <h3 class="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                  <p class="text-gray-500 mb-4">Add some beautiful handcrafted items to get started!</p>
                  <button
                    @click="closeCart"
                    class="btn-primary"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>

              <!-- Footer -->
              <div v-if="props.cartItems && props.cartItems.length > 0" class="bg-gray-50 px-6 py-4 flex space-x-3">
                <button
                  @click="closeCart"
                  class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Continue Shopping
                </button>
                <button
                  @click="proceedToCheckout"
                  class="flex-1 btn-primary"
                >
                  Proceed to Checkout
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import type { CartItem } from '../types';

interface Props {
  isOpen: boolean;
  cartItems: CartItem[];
}

interface Emits {
  (e: 'close'): void;
  (e: 'checkout'): void;
  (e: 'update-quantity', productId: number, quantity: number): void;
  (e: 'remove-item', productId: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const subtotal = computed(() => {
  if (!props.cartItems || !Array.isArray(props.cartItems)) {
    return 0;
  }
  return props.cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
});

const shipping = computed(() => {
  return subtotal.value > 100 ? 0 : 9.99;
});

const tax = computed(() => {
  return subtotal.value * 0.08; // 8% tax
});

const total = computed(() => {
  return subtotal.value + shipping.value + tax.value;
});

function closeCart() {
  emit('close');
}

function proceedToCheckout() {
  emit('checkout');
}

function updateQuantity(productId: number, newQuantity: number) {
  if (newQuantity > 0) {
    emit('update-quantity', productId, newQuantity);
  }
}

function removeItem(productId: number) {
  emit('remove-item', productId);
}
</script>
