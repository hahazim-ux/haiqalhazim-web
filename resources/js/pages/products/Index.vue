<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/vue3';
import { usePage } from '@inertiajs/vue3';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Rocket } from 'lucide-vue-next';
import { route } from 'ziggy-js';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface Product {
    id: number,
    name: string,
    price: number,
    description: string,
}

interface Props{
    products: Product[];
}


//Get props from inertia
const props = defineProps<Props>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Product',
        href: '/products',
    },


];

// const page = usePage()

const handleDelete = (id: number) => {
    if(confirm('Do you really want to delete this product?')){
        router.delete(route('products.destroy', {id}));
    }
}

</script>

<template>

    <Head title="Product" />
    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="p-4">
            <div v-if="$page.props.flash?.message" class="mb-4">
                <Alert class="bg-purple-200">
                    <Rocket class="h-6 w-6" />
                    <AlertTitle>Notification</AlertTitle>
                    <AlertDescription>
                        {{ $page.props.flash.message }}
                    </AlertDescription>
                </Alert>
            </div>

            <div class="mb-4 flex justify-end">
                <Link :href="route('products.create')"><Button>Add Products</Button></Link>
            </div>

            <div>
                <Table>
                    <TableCaption>A list of your recent products.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead class="w-[100px]">
                                Product ID
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>AlertDescription</TableHead>
                            <TableHead class="text-center">
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="product in props.products" :key="product.id">
                            <TableCell>{{ product.id }}</TableCell>
                            <TableCell>{{ product.name }}</TableCell>
                            <TableCell>{{ product.price }}</TableCell>
                            <TableCell>{{ product.description }}</TableCell>
                            <TableCell class="text-center space-x-1.5">
                                <Link :href="route('products.edit', {id: product.id})"><Button class="bg-blue-600">Edit</Button></Link>
                                <Button class="bg-red-600" @click="handleDelete(product.id)">Delete</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            
        </div>
    </AppLayout>
</template>
