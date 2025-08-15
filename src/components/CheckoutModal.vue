<template>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeCheckout" class="relative z-50">
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
                            class="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <!-- Header -->
                            <div class="flex items-center justify-between mb-6">
                                <DialogTitle class="text-2xl font-bold text-primary">
                                    Checkout
                                </DialogTitle>
                                <button @click="closeCheckout"
                                    class="text-gray-400 hover:text-gray-600 transition-colors">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div class="grid lg:grid-cols-2 gap-8">
                                <!-- Checkout Form -->
                                <div class="space-y-6">
                                    <!-- Shipping Information -->
                                    <div>
                                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h3>
                                        <div class="grid grid-cols-2 gap-4">
                                            <div>
                                                <label class="block text-sm font-medium text-gray-700 mb-1">First
                                                    Name</label>
                                                <input v-model="shippingInfo.firstName" type="text"
                                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                                            </div>
                                            <div>
                                                <label class="block text-sm font-medium text-gray-700 mb-1">Last
                                                    Name</label>
                                                <input v-model="shippingInfo.lastName" type="text"
                                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                                            </div>
                                        </div>
                                        <div class="mt-4">
                                            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                            <input v-model="shippingInfo.email" type="email"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                                        </div>
                                        <div class="mt-4">
                                            <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                            <input v-model="shippingInfo.address" type="text"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                                        </div>
                                        <div class="grid grid-cols-3 gap-4 mt-4">
                                            <div>
                                                <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
                                                <input v-model="shippingInfo.city" type="text"
                                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                                            </div>
                                            <div>
                                                <label
                                                    class="block text-sm font-medium text-gray-700 mb-1">State</label>
                                                <input v-model="shippingInfo.state" type="text"
                                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                                            </div>
                                            <div>
                                                <label class="block text-sm font-medium text-gray-700 mb-1">ZIP
                                                    Code</label>
                                                <input v-model="shippingInfo.zipCode" type="text"
                                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Payment Information -->
                                    <div>
                                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-1">Card
                                                Number</label>
                                            <input v-model="paymentInfo.cardNumber" type="text"
                                                placeholder="1234 5678 9012 3456"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                                        </div>
                                        <div class="grid grid-cols-2 gap-4 mt-4">
                                            <div>
                                                <label class="block text-sm font-medium text-gray-700 mb-1">Expiry
                                                    Date</label>
                                                <input v-model="paymentInfo.expiryDate" type="text" placeholder="MM/YY"
                                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                                            </div>
                                            <div>
                                                <label class="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                                                <input v-model="paymentInfo.cvv" type="text" placeholder="123"
                                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Order Summary -->
                                <div class="bg-gray-50 p-6 rounded-lg">
                                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>

                                    <!-- Order Items -->
                                    <div class="space-y-3 mb-6">
                                        <div v-for="item in (props.cartItems || [])" :key="item.product.id"
                                            class="flex justify-between">
                                            <div class="flex items-center space-x-3">
                                                <img :src="item.product.image" :alt="item.product.name"
                                                    class="w-12 h-12 rounded object-cover" />
                                                <div>
                                                    <p class="font-medium text-gray-900">{{ item.product.name }}</p>
                                                    <p class="text-sm text-gray-500">Qty: {{ item.quantity }}</p>
                                                </div>
                                            </div>
                                            <p class="font-medium text-gray-900">${{ (item.product.price *
                                                item.quantity).toFixed(2) }}</p>
                                        </div>
                                    </div>

                                    <!-- Order Totals -->
                                    <div class="border-t border-gray-200 pt-4 space-y-2">
                                        <div class="flex justify-between text-sm">
                                            <span class="text-gray-600">Subtotal</span>
                                            <span class="text-gray-900">${{ subtotal.toFixed(2) }}</span>
                                        </div>
                                        <div class="flex justify-between text-sm">
                                            <span class="text-gray-600">Shipping</span>
                                            <span class="text-gray-900">{{ shippingCost === 0 ? 'Free' :
                                                `$${shippingCost.toFixed(2)}` }}</span>
                                        </div>
                                        <div class="flex justify-between text-sm">
                                            <span class="text-gray-600">Tax</span>
                                            <span class="text-gray-900">${{ tax.toFixed(2) }}</span>
                                        </div>
                                        <div
                                            class="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2">
                                            <span class="text-gray-900">Total</span>
                                            <span class="text-primary">${{ total.toFixed(2) }}</span>
                                        </div>
                                    </div>

                                    <!-- Place Order Button -->
                                    <button @click="placeOrder" :disabled="isProcessing"
                                        class="w-full btn-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed">
                                        <span v-if="isProcessing" class="flex items-center justify-center">
                                            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                    stroke-width="4"></circle>
                                                <path class="opacity-75" fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                                </path>
                                            </svg>
                                            Processing...
                                        </span>
                                        <span v-else>Place Order</span>
                                    </button>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import type { CartItem } from '../types';

interface Props {
    isOpen: boolean;
    cartItems: CartItem[];
}

interface Emits {
    (e: 'close'): void;
    (e: 'order-placed', orderData: any): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Form data
const shippingInfo = ref({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
});

const paymentInfo = ref({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
});

const isProcessing = ref(false);

// Computed properties
const subtotal = computed(() => {
    if (!props.cartItems || !Array.isArray(props.cartItems)) {
        return 0;
    }
    return props.cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
});

const shippingCost = computed(() => {
    return subtotal.value >= 100 ? 0 : 10;
});

const tax = computed(() => {
    return subtotal.value * 0.08;
});

const total = computed(() => {
    return subtotal.value + shippingCost.value + tax.value;
});

// Methods
function closeCheckout() {
    emit('close');
}

async function placeOrder() {
    isProcessing.value = true;

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const orderData = {
        items: props.cartItems || [],
        shipping: shippingInfo.value,
        payment: {
            ...paymentInfo.value,
            cardNumber: paymentInfo.value.cardNumber.replace(/\s/g, '').slice(-4) // Only store last 4 digits
        },
        totals: {
            subtotal: subtotal.value,
            shipping: shippingCost.value,
            tax: tax.value,
            total: total.value
        },
        orderNumber: `ORD-${Date.now()}`,
        orderDate: new Date().toISOString()
    };

    emit('order-placed', orderData);
    isProcessing.value = false;
}
</script>
