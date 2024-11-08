<template>
    <div class="flex flex-col gap-10 h-screen w-screen">
        <nav class="bg-gray-200 py-4 w-full flex justify-between items-center">
        <span class="flex-grow text-center">Simple To do apps</span>
        <div class="mr-10">
            <n-button type="error" @click="processLogout">Logout</n-button>
        </div>
        </nav>
        <div class="flex justify-center">
            <slot />
        </div>
    </div>
</template>
<script setup>
import { NButton } from 'naive-ui';
import { useAuthStore } from '~/store/auth';

const { logout } = useAuthStore()
const processLogout = async () => {
    await logout()
}

</script>