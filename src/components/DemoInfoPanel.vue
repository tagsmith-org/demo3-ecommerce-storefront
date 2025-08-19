<template>
    <div class="demo-info-container">
        <!-- Info Button -->
        <button @click="togglePanel"
            class="fixed top-4 right-4 z-50 w-12 h-12 bg-yellow-400 hover:bg-yellow-500 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
            <svg v-if="!isPanelOpen" class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                </path>
            </svg>
            <svg v-else class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>

        <!-- Info Panel -->
        <div class="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-yellow-50 to-orange-50 border-b-4 border-yellow-300 shadow-lg transition-transform duration-500 ease-in-out"
            :class="isPanelOpen ? 'transform translate-y-0' : 'transform -translate-y-full'">
            <div class="container mx-auto px-4 py-6">
                <div class="max-w-4xl mx-auto">
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                                <svg class="w-8 h-8 text-yellow-600 mr-3" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                E-commerce Store Demo
                            </h2>

                            <div class="grid md:grid-cols-2 gap-8">
                                <!-- Features Section -->
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-700 mb-3">🚀 Key Features</h3>
                                    <ul class="space-y-2 text-gray-600">
                                        <li class="flex items-start">
                                            <span class="text-green-500 mr-2">✓</span>
                                            <span>Modern Vue 3 + TypeScript architecture</span>
                                        </li>
                                        <li class="flex items-start">
                                            <span class="text-green-500 mr-2">✓</span>
                                            <span>Interactive shopping cart functionality</span>
                                        </li>
                                        <li class="flex items-start">
                                            <span class="text-green-500 mr-2">✓</span>
                                            <span>Checkout process with form validation</span>
                                        </li>
                                        <li class="flex items-start">
                                            <span class="text-green-500 mr-2">✓</span>
                                            <span>Admin panel for product management</span>
                                        </li>
                                        <li class="flex items-start">
                                            <span class="text-green-500 mr-2">✓</span>
                                            <span>Responsive design with Tailwind CSS</span>
                                        </li>
                                        <li class="flex items-start">
                                            <span class="text-green-500 mr-2">✓</span>
                                            <span>Smooth animations and transitions</span>
                                        </li>
                                    </ul>
                                </div>

                                <!-- Technical Details -->
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-700 mb-3">⚙️ Technical Stack</h3>
                                    <ul class="space-y-2 text-gray-600">
                                        <li class="flex items-start">
                                            <span class="text-blue-500 mr-2">•</span>
                                            <span><strong>Frontend:</strong> Vue 3, TypeScript, Vite</span>
                                        </li>
                                        <li class="flex items-start">
                                            <span class="text-blue-500 mr-2">•</span>
                                            <span><strong>Styling:</strong> Tailwind CSS</span>
                                        </li>
                                        <li class="flex items-start">
                                            <span class="text-blue-500 mr-2">•</span>
                                            <span><strong>Backend:</strong> Express.js + SQLite</span>
                                        </li>
                                        <li class="flex items-start">
                                            <span class="text-blue-500 mr-2">•</span>
                                            <span><strong>Deployment:</strong> GitHub Actions + Nginx</span>
                                        </li>
                                        <li class="flex items-start">
                                            <span class="text-blue-500 mr-2">•</span>
                                            <span><strong>Domain:</strong> demo3.websmith-shop.com</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <!-- Demo Instructions -->
                            <div class="mt-6 p-4 bg-white rounded-lg border border-yellow-200">
                                <h3 class="text-lg font-semibold text-gray-700 mb-2">🎯 Try These Features</h3>
                                <div class="grid sm:grid-cols-2 gap-4 text-sm text-gray-600">
                                    <div>
                                        <strong>Shopping:</strong> Add products to cart and experience the checkout flow
                                    </div>
                                    <div>
                                        <strong>Admin Panel:</strong> Click "Admin Panel" to manage products
                                    </div>
                                    <div>
                                        <strong>Navigation:</strong> Use the top menu to navigate between sections
                                    </div>
                                    <div>
                                        <strong>Contact:</strong> Fill out the contact form to get in touch
                                    </div>
                                </div>
                            </div>

                            <!-- Project Details -->
                            <div class="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <h3 class="text-lg font-semibold text-gray-700 mb-2">💡 About This Demo</h3>
                                <div class="text-sm text-gray-600 space-y-2">
                                    <p><strong>Project:</strong> Cozy Corner - Handcrafted Home Decor E-commerce Store
                                    </p>
                                    <p><strong>Purpose:</strong> Showcase modern e-commerce functionality with Vue 3 and
                                        TypeScript</p>
                                    <p><strong>Target:</strong> Small businesses selling handcrafted and artisanal
                                        products</p>
                                </div>
                            </div>

                            <!-- Demo Limitations -->
                            <div class="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                                <h3 class="text-lg font-semibold text-gray-700 mb-2">⚠️ Demo Limitations</h3>
                                <div class="text-sm text-gray-600 space-y-1">
                                    <p>• <strong>No Real Payments:</strong> Checkout process is simulated</p>
                                    <p>• <strong>No Email Sending:</strong> Contact forms don't actually send emails</p>
                                    <p>• <strong>Local Database:</strong> Data resets on server restart</p>
                                    <p>• <strong>Demo Products:</strong> All products are placeholder items</p>
                                    <p>• <strong>No User Accounts:</strong> No registration/login functionality</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Overlay -->
        <div v-if="isPanelOpen" @click="closePanel" class="fixed inset-0 bg-black bg-opacity-25 z-30"></div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isPanelOpen = ref(false)

function togglePanel(): void {
    isPanelOpen.value = !isPanelOpen.value
}

function closePanel(): void {
    isPanelOpen.value = false
}

// Close panel on escape key
function handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && isPanelOpen.value) {
        closePanel()
    }
}

// Add keyboard listener
if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeydown)
}
</script>

<style scoped>
.demo-info-container {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}
</style>
