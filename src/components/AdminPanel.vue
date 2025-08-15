<template>
    <div class="min-h-screen bg-gray-50 py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Header -->
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-900">Admin Panel</h1>
                <p class="text-gray-600 mt-2">Manage your products</p>
            </div>

            <!-- Add Product Button -->
            <div class="mb-6">
                <button @click="showAddModal = true" 
                        class="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                    + Add New Product
                </button>
            </div>

            <!-- Products Table -->
            <div class="bg-white rounded-lg shadow overflow-hidden">
                <div class="px-6 py-4 border-b border-gray-200">
                    <h2 class="text-lg font-semibold text-gray-900">Products</h2>
                </div>
                
                <div v-if="loading" class="p-8 text-center">
                    <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p class="mt-4 text-gray-600">Loading products...</p>
                </div>

                <div v-else-if="error" class="p-8 text-center">
                    <p class="text-red-600 mb-4">{{ error }}</p>
                    <button @click="loadProducts" class="btn-primary">Try Again</button>
                </div>

                <div v-else>
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <img :src="product.image" :alt="product.name" class="h-12 w-12 rounded-lg object-cover" />
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                                    <div class="text-sm text-gray-500 truncate max-w-xs">{{ product.description }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                        {{ product.category }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    ${{ product.price }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {{ product.stock }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button @click="editProduct(product)" 
                                            class="text-primary hover:text-primary/80 mr-3">
                                        Edit
                                    </button>
                                    <button @click="deleteProduct(product.id)" 
                                            class="text-red-600 hover:text-red-800">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Add/Edit Product Modal -->
        <div v-if="showAddModal || editingProduct" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div class="mt-3">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">
                        {{ editingProduct ? 'Edit Product' : 'Add New Product' }}
                    </h3>
                    
                    <form @submit.prevent="saveProduct" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Name</label>
                            <input v-model="form.name" type="text" required
                                   class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Description</label>
                            <textarea v-model="form.description" required rows="3"
                                      class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"></textarea>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Category</label>
                            <input v-model="form.category" type="text" required
                                   class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Price</label>
                                <input v-model="form.price" type="number" step="0.01" required
                                       class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Stock</label>
                                <input v-model="form.stock" type="number" required
                                       class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Image URL</label>
                            <input v-model="form.image" type="url"
                                   class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                        </div>
                        
                        <div class="flex justify-end space-x-3 pt-4">
                            <button type="button" @click="closeModal"
                                    class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                                Cancel
                            </button>
                            <button type="submit" :disabled="saving"
                                    class="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 disabled:opacity-50">
                                {{ saving ? 'Saving...' : (editingProduct ? 'Update' : 'Create') }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { productsApi, type Product } from '../services/api';

// State
const products = ref<Product[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const saving = ref(false);

// Modal state
const showAddModal = ref(false);
const editingProduct = ref<Product | null>(null);

// Form state
const form = ref({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    image: ''
});

// Load products
const loadProducts = async () => {
    try {
        loading.value = true;
        error.value = null;
        products.value = await productsApi.getProducts();
    } catch (err) {
        error.value = err instanceof Error ? err.message : 'Failed to load products';
        console.error('Error loading products:', err);
    } finally {
        loading.value = false;
    }
};

// Save product (create or update)
const saveProduct = async () => {
    try {
        saving.value = true;
        
        const productData = {
            name: form.value.name,
            description: form.value.description,
            category: form.value.category,
            price: parseFloat(form.value.price),
            stock: parseInt(form.value.stock),
            image: form.value.image || undefined
        };
        
        if (editingProduct.value) {
            // Update existing product
            await fetch(`http://localhost:4000/api/admin/products/${editingProduct.value.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });
        } else {
            // Create new product
            await fetch('http://localhost:4000/api/admin/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });
        }
        
        closeModal();
        await loadProducts();
    } catch (err) {
        console.error('Error saving product:', err);
        alert('Failed to save product');
    } finally {
        saving.value = false;
    }
};

// Edit product
const editProduct = (product: Product) => {
    editingProduct.value = product;
    form.value = {
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price.toString(),
        stock: product.stock.toString(),
        image: product.image
    };
};

// Delete product
const deleteProduct = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) {
        return;
    }
    
    try {
        await fetch(`http://localhost:4000/api/admin/products/${id}`, {
            method: 'DELETE'
        });
        await loadProducts();
    } catch (err) {
        console.error('Error deleting product:', err);
        alert('Failed to delete product');
    }
};

// Close modal
const closeModal = () => {
    showAddModal.value = false;
    editingProduct.value = null;
    form.value = {
        name: '',
        description: '',
        category: '',
        price: '',
        stock: '',
        image: ''
    };
};

// Load products on mount
onMounted(() => {
    loadProducts();
});
</script>
