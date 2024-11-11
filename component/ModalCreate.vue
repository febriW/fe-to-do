<template>
    <n-modal 
        v-model:show="modalVisible" 
        title="Create New Task" 
        v-on:after-leave="resetForm"
    >
      <n-card style="width: 600px">
        <n-form :model="form" ref="formRef" label-placement="top" size="large">
            <n-form-item label="Title" path="title">
            <n-input v-model:value="form.title" placeholder="Enter the task title" />
            </n-form-item>
            <n-form-item label="Content" path="content">
            <n-input  type="textarea" v-model:value="form.content" placeholder="Enter the task content" rows="4" />
            </n-form-item>
        </n-form>
        <template #footer>
            <n-space>
                <n-button @click="closeModal" type="error">Cancel</n-button>
                <n-button @click="submitForm" type="primary">Submit</n-button>
            </n-space>
        </template>
      </n-card>
    </n-modal>
</template>
  
<script lang="ts" setup>
import { useCardStore } from '~/store/card';
import { ref, defineExpose  } from 'vue';
import { NModal, NCard, NInput, NButton, NForm, NFormItem, NSpace, create } from 'naive-ui';
  
interface FormData {
    title: string;
    content: string;
}

const { createCard } = useCardStore()
const modalVisible = ref<boolean>(false);
const form = ref<FormData>({
    title: '',
    content: '',
});
const formRef = ref<InstanceType<typeof NForm> | null>(null);

const showModal = () => {
    modalVisible.value = true;
};

const closeModal = () => {
    modalVisible.value = false;
};

const resetForm = () => {
    form.value.title = '';
    form.value.content = '';
};

const submitForm = async () => {
    if (formRef.value && await formRef.value.validate()) {
        console.log('Form data:', form.value);
        const authorID = useCookie('authorID').value;
        await createCard({
            author_id: authorID ? parseInt(authorID) : undefined,
            title: form.value.title,
            content: form.value.content
        })
    }
};
defineExpose({ showModal, closeModal });
</script>
