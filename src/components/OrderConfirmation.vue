<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeConfirmation" class="relative z-50">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel
              class="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <!-- Success Icon -->
              <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <!-- Header -->
              <DialogTitle class="text-2xl font-bold text-center text-gray-900 mb-2">
                Order Confirmed!
              </DialogTitle>
              <p class="text-center text-gray-600 mb-6">
                Thank you for your order! 📧 A confirmation email has been sent to your email address.
              </p>

              <!-- Order Details -->
              <div v-if="orderData" class="bg-gray-50 rounded-lg p-6 mb-6">
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span class="font-medium text-gray-700">Order Number:</span>
                    <p class="text-gray-900">{{ orderData.orderNumber }}</p>
                  </div>
                  <div>
                    <span class="font-medium text-gray-700">Order Date:</span>
                    <p class="text-gray-900">{{ formatDate(orderData.orderDate) }}</p>
                  </div>
                  <div>
                    <span class="font-medium text-gray-700">Total Amount:</span>
                    <p class="text-primary font-semibold">${{ orderData.totals.total.toFixed(2) }}</p>
                  </div>
                  <div>
                    <span class="font-medium text-gray-700">Payment Method:</span>
                    <p class="text-gray-900">Card ending in {{ orderData.payment.cardNumber }}</p>
                  </div>
                </div>
              </div>

              <!-- Shipping Information -->
              <div v-if="orderData" class="mb-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">Shipping to:</h3>
                <div class="bg-white border border-gray-200 rounded-lg p-4">
                  <p class="font-medium text-gray-900">
                    {{ orderData.shipping.firstName }} {{ orderData.shipping.lastName }}
                  </p>
                  <p class="text-gray-600">{{ orderData.shipping.address }}</p>
                  <p class="text-gray-600">
                    {{ orderData.shipping.city }}, {{ orderData.shipping.state }} {{ orderData.shipping.zipCode }}
                  </p>
                  <p class="text-gray-600">{{ orderData.shipping.email }}</p>
                </div>
              </div>

              <!-- Order Items Summary -->
              <div v-if="orderData" class="mb-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">Order Summary:</h3>
                <div class="space-y-2">
                  <div v-for="item in (orderData.items || [])" :key="item.product.id"
                    class="flex justify-between items-center">
                    <div class="flex items-center space-x-3">
                      <img :src="item.product.image" :alt="item.product.name" class="w-10 h-10 rounded object-cover" />
                      <div>
                        <p class="font-medium text-gray-900">{{ item.product.name }}</p>
                        <p class="text-sm text-gray-500">Qty: {{ item.quantity }}</p>
                      </div>
                    </div>
                    <p class="font-medium text-gray-900">${{ (item.product.price * item.quantity).toFixed(2) }}</p>
                  </div>
                </div>
              </div>

              <!-- Next Steps -->
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 class="font-semibold text-blue-900 mb-2">What's Next?</h4>
                <ul class="text-sm text-blue-800 space-y-1">
                  <li>• ✅ Order confirmation email sent to your inbox</li>
                  <li>• 📦 We'll notify you when your order ships (usually within 2-3 business days)</li>
                  <li>• 📋 Track your order using the order number above</li>
                  <li>• 🚚 Estimated delivery: 5-7 business days</li>
                  <li>• 💳 Your payment has been processed successfully</li>
                </ul>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-3">
                <button @click="closeConfirmation" class="flex-1 btn-primary">
                  Continue Shopping
                </button>
                <button @click="viewOrderDetails" class="flex-1 btn-secondary">
                  View Order Details
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
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';

interface Props {
  isOpen: boolean;
  orderData: any;
}

interface Emits {
  (e: 'close'): void;
  (e: 'view-details'): void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

function closeConfirmation() {
  emit('close');
}

function viewOrderDetails() {
  emit('view-details');
}

function formatDate(dateString: string) {
  if (!dateString) return '';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return dateString;
  }
}
</script>
