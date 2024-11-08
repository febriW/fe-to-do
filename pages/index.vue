<template>
    <div class="">
        <n-card title="Login Form">
            <div class="flex flex-col gap-4">
                <n-input 
                    size="large" 
                    placeholder="Masukan email" 
                    v-model:value="email"
                />
                <n-input
                    size="large"
                    type="password"
                    show-password-on="mousedown"
                    placeholder="Password"
                    v-model:value="password"
                />
                <div class="mt-6 flex flex-row gap-4 justify-end">
                    <n-button type="primary" @click.prevent="processLogin">Login</n-button>
                    <n-button type="info" @click="navigateTo('/register')">Daftar</n-button>
                </div>
            </div>
        </n-card>
        <n-modal v-model:show="showModal">
            <n-card
                style="width: 600px"
                title="Modal"
                :bordered="false"
                size="huge"
                role="dialog"
                aria-modal="true"
            >
            <template #header-extra>
                Oops Something Wrong!
            </template>
            {{msgError}}
            </n-card>
        </n-modal>
    </div>
</template>
<script lang="ts" setup>
    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '~/store/auth';
    import {
        NCard,
        NInput,
        NButton,
        NModal
    } from 'naive-ui'

    definePageMeta({
        middleware: 'auth'
    })

    const { login } = useAuthStore()
    const { authenticated, msgError } = storeToRefs(useAuthStore())

   let email = ref("")
   let password = ref("")
   let showModal = ref(false)

    const processLogin = async () => {
        await login({
            email: email.value,
            password: password.value
        })
        if(authenticated) { navigateTo('/dashboard') }
        if(msgError.value !== '') { showModal.value = true }
    }

</script>
<style scoped>
    .n-card {
        width: 500px;
    }
</style>