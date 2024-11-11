<template>
    <div class="w-3/4">
        <div class="flex justify-end">
            <n-button type="primary" @click="openModal">Add Task</n-button>
        </div>
        <div class="grid grid-cols-4">
            <Task 
                v-for="task in data"
                :key="task.activities_no"
                :task="task"
            />
        </div>
        <ModalCreate ref="modalForm" />
    </div>
</template>
<script lang="ts" setup>
    import { ref, nextTick, watch } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useCardStore } from '~/store/card';
    import { useAsyncData } from '#app';
    import Task from '~/component/Task.vue';
    import { NButton, useMessage  } from 'naive-ui';
    import ModalCreate from '~/component/ModalCreate.vue';


    definePageMeta({
        middleware: 'auth',
        layout: 'dashboard'
    })

    const modalForm = ref<InstanceType<typeof ModalCreate> | null>(null)
    const message = useMessage()
    const { getAllCard } = useCardStore()
    const { data, msgError, msgSuccess } = storeToRefs(useCardStore())

    watch(msgError, (newValue) => {
        if (newValue) {
            modalForm.value?.closeModal()
            message.error(newValue)
        }
    });
    watch(msgSuccess, (newValue) => {
        if (newValue) {
            modalForm.value?.closeModal()
            message.success(newValue)
        }
    });


    watch([msgError, msgSuccess], async () => {
        await useAsyncData('getAllCards', async () => {
            await getAllCard({ page: 1, size: 50 });
        });
    }, { immediate: true });

    const openModal = async () => {
        await nextTick(() => {
            modalForm.value?.showModal()
        });
    };

</script>
