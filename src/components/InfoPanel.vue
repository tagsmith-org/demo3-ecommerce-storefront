<template>
    <!-- Floating Action Button -->
    <button @click="togglePanel"
        class="fixed top-4 right-4 z-50 w-12 h-12 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
        :class="{ 'rotate-45': isOpen }">
        <svg v-if="!isOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
            </path>
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
    </button>

    <!-- Info Panel -->
    <div v-if="isOpen"
        class="fixed top-0 left-0 right-0 z-40 bg-yellow-100 border-b-4 border-yellow-400 shadow-lg transform transition-transform duration-300">
        <div class="max-w-7xl mx-auto px-4 py-6">
            <div class="grid lg:grid-cols-3 gap-8">
                <!-- Key Features -->
                <div>
                    <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
                        <svg class="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clip-rule="evenodd"></path>
                        </svg>
                        Key Features
                    </h3>
                    <ul class="space-y-2 text-sm text-gray-700">
                        <li class="flex items-center">
                            <svg class="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            Modern Vue 3 + TypeScript architecture
                        </li>
                        <li class="flex items-center">
                            <svg class="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            Responsive design with Tailwind CSS
                        </li>
                        <li class="flex items-center">
                            <svg class="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            Interactive shopping cart functionality
                        </li>
                        <li class="flex items-center">
                            <svg class="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            Checkout process with form validation
                        </li>
                        <li class="flex items-center">
                            <svg class="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            Admin panel for product management
                        </li>
                        <li class="flex items-center">
                            <svg class="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            Smooth animations and transitions
                        </li>
                    </ul>
                </div>

                <!-- Technical Stack -->
                <div>
                    <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
                        <svg class="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clip-rule="evenodd"></path>
                        </svg>
                        Technical Stack
                    </h3>
                    <ul class="space-y-2 text-sm text-gray-700">
                        <li class="flex items-center">
                            <div class="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                            Frontend: Vue 3, TypeScript, Vite
                        </li>
                        <li class="flex items-center">
                            <div class="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                            Styling: Tailwind CSS
                        </li>
                        <li class="flex items-center">
                            <div class="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                            Build Tool: Vite
                        </li>
                        <li class="flex items-center">
                            <div class="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                            Backend: Express.js + SQLite
                        </li>
                        <li class="flex items-center">
                            <div class="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                            Deployment: GitHub Actions + Nginx
                        </li>
                        <li class="flex items-center">
                            <div class="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                            Domain: demo3.websmith-shop.com
                        </li>
                    </ul>
                </div>

                <!-- Try These Features -->
                <div>
                    <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
                        <svg class="w-5 h-5 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                clip-rule="evenodd"></path>
                        </svg>
                        Try These Features
                    </h3>
                    <div class="bg-white rounded-lg p-4 shadow-sm">
                        <ul class="space-y-2 text-sm text-gray-700">
                            <li class="flex items-start">
                                <div class="w-2 h-2 bg-purple-600 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                                <span><strong>Shopping:</strong> Add products to cart and experience the checkout
                                    flow</span>
                            </li>
                            <li class="flex items-start">
                                <div class="w-2 h-2 bg-purple-600 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                                <span><strong>Navigation:</strong> Use the top menu to navigate between sections</span>
                            </li>
                            <li class="flex items-start">
                                <div class="w-2 h-2 bg-purple-600 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                                <span><strong>Admin Panel:</strong> Click "Admin Panel" to manage products</span>
                            </li>
                            <li class="flex items-start">
                                <div class="w-2 h-2 bg-purple-600 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                                <span><strong>Contact:</strong> Fill out the contact form to get in touch</span>
                            </li>
                            <li class="flex items-start">
                                <div class="w-2 h-2 bg-purple-600 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                                <span><strong>Social:</strong> Join our community through social media links</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);

function togglePanel() {
    isOpen.value = !isOpen.value;
}
</script>
