<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import Label from '@/components/ui/label/Label.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/vue3';
import { useForm } from '@inertiajs/vue3'
import { route } from 'ziggy-js';


interface Product {
    id: number; name: string; price: number; description: string;
}

const props = defineProps<{ product: Product }>();


const form = useForm({
    name: props.product.name,
    price: props.product.price,
    description: props.product.description,
});

const handleSubmit = () => {
    form.put(route('products.update', {product: props.product}));
}




</script>

<template>

    <Head title="Edit Product" />

    <AppLayout :breadcrumbs="[
        {
            title: 'Edit Product',
            href: '/products/${props.product.id}/edit',
        },
    ]">
        <div class="p-4">
            <form @submit.prevent="handleSubmit" class="w-8/12 space-y-4">
                <div class="space-y-2">
                    <Label for="Product Name">Name</Label>
                    <Input v-model="form.name" type="text" placeholder="Enter product name" />
                    <div class="text-sm text-red-600" v-if="form.errors.name">{{ form.errors.name }}</div>
                </div>
                <div class="space-y-2">
                    <Label for="Product Price">Price</Label>
                    <Input v-model="form.price" type="number" placeholder="Enter product price" />
                    <div class="text-sm text-red-600" v-if="form.errors.price">{{ form.errors.price }}</div>
                </div>
                <div class="space-y-2">
                    <Label for="Product Description">Description</Label>
                    <Input v-model="form.description" type="text" placeholder="Enter product description" />
                    <div class="text-sm text-red-600" v-if="form.errors.description">{{ form.errors.description }}</div>
                </div>
                <Button type="submit" :disabled="form.processing">Edit a product</Button>
            </form>
        </div>
    </AppLayout>
</template>
