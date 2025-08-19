<template>
    <section id="about" class="py-20 bg-background">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid lg:grid-cols-2 gap-16 items-center">
                <!-- Content -->
                <div class="space-y-8">
                    <div class="space-y-4">
                        <h2 class="text-4xl font-bold text-primary">Our Story</h2>
                        <p class="text-xl text-gray-700 leading-relaxed">
                            Cozy Corner was born from a simple belief: that every home deserves to be filled with
                            beautiful,
                            handcrafted pieces that tell a story. We started as a small family workshop, creating unique
                            items that bring warmth and character to living spaces.
                        </p>
                        <p class="text-lg text-gray-600 leading-relaxed">
                            Today, we work with talented artisans from around the world, carefully curating each piece
                            in our collection. From hand-thrown ceramics to handwoven textiles, every item is crafted
                            with love and attention to detail.
                        </p>
                    </div>

                    <!-- Values -->
                    <div class="grid sm:grid-cols-2 gap-6">
                        <div class="bg-white p-6 rounded-xl shadow-sm">
                            <div class="flex items-center space-x-3 mb-3">
                                <div class="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                                    <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                                        </path>
                                    </svg>
                                </div>
                                <h3 class="font-semibold text-gray-900">Handcrafted</h3>
                            </div>
                            <p class="text-gray-600 text-sm">
                                Each piece is carefully crafted by skilled artisans using traditional techniques.
                            </p>
                        </div>

                        <div class="bg-white p-6 rounded-xl shadow-sm">
                            <div class="flex items-center space-x-3 mb-3">
                                <div class="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                                    <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9">
                                        </path>
                                    </svg>
                                </div>
                                <h3 class="font-semibold text-gray-900">Sustainable</h3>
                            </div>
                            <p class="text-gray-600 text-sm">
                                We prioritize eco-friendly materials and sustainable production practices.
                            </p>
                        </div>

                        <div class="bg-white p-6 rounded-xl shadow-sm">
                            <div class="flex items-center space-x-3 mb-3">
                                <div class="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                                    <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                                        </path>
                                    </svg>
                                </div>
                                <h3 class="font-semibold text-gray-900">Community</h3>
                            </div>
                            <p class="text-gray-600 text-sm">
                                Supporting local artisans and building meaningful connections with our customers.
                            </p>
                        </div>

                        <div class="bg-white p-6 rounded-xl shadow-sm">
                            <div class="flex items-center space-x-3 mb-3">
                                <div class="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                                    <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <h3 class="font-semibold text-gray-900">Quality</h3>
                            </div>
                            <p class="text-gray-600 text-sm">
                                Every item meets our high standards for quality, durability, and beauty.
                            </p>
                        </div>
                    </div>

                    <button @click="scrollToSection('contact')" class="btn-primary">
                        Contact Us
                    </button>
                </div>

                <!-- Image Grid -->
                <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-4">
                        <div class="overflow-hidden rounded-xl">
                            <img src="https://picsum.photos/400/300?random=20" alt="Artisan Workshop"
                                class="w-full h-48 object-cover hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div class="overflow-hidden rounded-xl">
                            <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&crop=center"
                                alt="Handcrafted Products"
                                class="w-full h-64 object-cover hover:scale-110 transition-transform duration-500" />
                        </div>
                    </div>
                    <div class="space-y-4 pt-8">
                        <div class="overflow-hidden rounded-xl">
                            <img src="https://picsum.photos/400/300?random=23" alt="Cozy Home"
                                class="w-full h-64 object-cover hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div class="overflow-hidden rounded-xl">
                            <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center"
                                alt="Ceramic Workshop"
                                class="w-full h-64 object-cover hover:scale-110 transition-transform duration-500" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
function scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}
</script>
