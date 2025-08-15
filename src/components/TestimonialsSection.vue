<template>
  <section id="testimonials" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-primary mb-4">What Our Customers Say</h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Don't just take our word for it. Here's what our wonderful customers have to say about their experience.
        </p>
      </div>

      <!-- Testimonials Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div 
          v-for="testimonial in testimonials" 
          :key="testimonial.id"
          class="bg-background p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
        >
          <!-- Rating -->
          <div class="flex items-center space-x-1 mb-4">
            <svg 
              v-for="star in 5" 
              :key="star"
              class="w-5 h-5"
              :class="star <= testimonial.rating ? 'text-secondary' : 'text-gray-300'"
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          </div>

          <!-- Comment -->
          <blockquote class="text-gray-700 mb-6 italic">
            "{{ testimonial.comment }}"
          </blockquote>

          <!-- Customer Info -->
          <div class="flex items-center space-x-3">
            <img 
              :src="testimonial.avatar" 
              :alt="testimonial.name"
              class="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h4 class="font-semibold text-gray-900">{{ testimonial.name }}</h4>
              <p class="text-sm text-gray-500">Verified Customer</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <div class="text-3xl font-bold text-primary mb-2">4.9</div>
          <p class="text-gray-600">Average Rating</p>
        </div>
        <div>
          <div class="text-3xl font-bold text-primary mb-2">2,500+</div>
          <p class="text-gray-600">Happy Customers</p>
        </div>
        <div>
          <div class="text-3xl font-bold text-primary mb-2">98%</div>
          <p class="text-gray-600">Satisfaction Rate</p>
        </div>
        <div>
          <div class="text-3xl font-bold text-primary mb-2">24/7</div>
          <p class="text-gray-600">Customer Support</p>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center mt-16">
        <div class="bg-gradient-to-r from-primary/10 to-secondary/20 rounded-2xl p-8">
          <h3 class="text-2xl font-bold text-primary mb-4">Join Our Happy Community</h3>
          <p class="text-gray-700 mb-6 max-w-2xl mx-auto">
            Experience the difference that handcrafted quality makes. Start your journey with Cozy Corner today.
          </p>
          <button class="btn-primary">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { testimonials } from '../data/testimonials';
</script>
