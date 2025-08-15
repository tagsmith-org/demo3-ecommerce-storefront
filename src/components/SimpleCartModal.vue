<template>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeCart" class="relative z-50">
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
                            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle class="text-lg font-medium leading-6 text-gray-900">
                                Shopping Cart
                            </DialogTitle>

                            <div class="mt-2">
                                <p class="text-sm text-gray-500">
                                    Cart is working! Items in cart: {{ props.cartItems?.length || 0 }}
                                </p>

                                <div v-if="props.cartItems && props.cartItems.length > 0" class="mt-4">
                                    <div v-for="item in props.cartItems" :key="item.product.id"
                                        class="flex justify-between items-center py-2">
                                        <span>{{ item.product.name }} x {{ item.quantity }}</span>
                                        <span class="font-bold">${{ (item.product.price * item.quantity).toFixed(2)
                                            }}</span>
                                    </div>
                                    <div class="border-t pt-2 mt-2">
                                        <div class="flex justify-between font-bold">
                                            <span>Total:</span>
                                            <span>${{ total.toFixed(2) }}</span>
                                        </div>
                                    </div>
                                </div>

                                <div v-else class="mt-4 text-center text-gray-500">
                                    Your cart is empty
                                </div>
                            </div>

                            <div class="mt-4 flex space-x-2">
                                <button type="button"
                                    class="flex-1 inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                    @click="closeCart">
                                    Close
                                </button>
                                <button v-if="props.cartItems && props.cartItems.length > 0" type="button"
                                    class="flex-1 inline-flex justify-center rounded-md border border-transparent bg-secondary px-4 py-2 text-sm font-medium text-primary hover:bg-secondary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
                                    @click="proceedToCheckout">
                                    Checkout
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
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const total = computed(() => {
    if (!props.cartItems || !Array.isArray(props.cartItems)) {
        return 0;
    }
    return props.cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
});

function closeCart() {
    emit('close');
}

function proceedToCheckout() {
    emit('checkout');
}
</script>
