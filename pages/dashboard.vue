<template>
    <div class="w-3/4">
        <div class="flex justify-end">
            <n-button type="primary" @click="modalAdd.valueOf">Add Task</n-button>
        </div>
        <div class="grid grid-cols-4">
            <Task 
                v-for="task in data"
                :key="task.activities_no"
                :task="task"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { useCardStore } from '~/store/card';
    import { useAsyncData } from '#app';
    import Task from '~/component/Task.vue';
    import { NButton } from 'naive-ui';

    definePageMeta({
        middleware: 'auth',
        layout: 'dashboard'
    })

    const { getAllCard } = useCardStore()
    const { data, msgError } = storeToRefs(useCardStore())

    const { pending, error } = await useAsyncData('getAllCards', async () => {
        await getAllCard({page: 1, size:50})
    });

    const modalAdd = ref(false)


</script>
