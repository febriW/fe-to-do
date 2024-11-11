<template>
    <n-card :bordered="true" :hoverable="true" class="task-card">
      <template #header>
        <div class="card-header">
          <span>{{ props.task.title }}</span>
        </div>
      </template>

      <div class="card-content">
        <p>{{ props.task.content }}</p>
      </div>
      
      <div class="flex flex-row gap-4">
        <n-button 
          :disabled="task.marked_status === 'DONE'"
          @click="markAsDone(task)"
          type="success" 
          size="small">
          Done
        </n-button>
        
        <n-button 
          :disabled="task.marked_status === 'CANCELED'"
          @click="markAsCanceled(task)"
          type="error" 
          size="small">
          Canceled
        </n-button>
        
        <n-button 
          @click="deleteTask(task.activities_no)"
          type="default" 
          size="small">
          Delete
        </n-button>
      </div>
    </n-card>
  </template>
  
<script setup lang="ts">
  import { NCard, NButton } from 'naive-ui';
  import { useCardStore } from '~/store/card';
  import { defineEmits } from 'vue';
  
  interface Task {
    activities_no?: string
    title: string
    content: string
    author_id?: number
    marked_status?: string
    marked?: string
    created_at?: string
    updated_at?: string
  }

  const emit = defineEmits(['dataFetched'])
  const props = defineProps<{ task: Task }>();
  const { updateCard, deleteCard } = useCardStore()
  
  const markAsDone = async (task: Task) => {
    const updatedTask: Task = {
        author_id: task.author_id,
        activities_no: task.activities_no,
        title: task.title,
        content: task.content,
        marked_status: "DONE",
        marked: new Date().toISOString().replace('T', ' ').slice(0, 19).toString()
    };
    const res = await updateCard(updatedTask)
  };
  
  const markAsCanceled = async (task: Task) => {
    const updatedTask: Task = {
        author_id: task.author_id,
        activities_no: task.activities_no,
        title: task.title,
        content: task.content,
        marked_status: "CANCELED",
        marked: new Date().toISOString().replace('T', ' ').slice(0, 19).toString()
    };
    await updateCard(updatedTask)
  };
  
  const deleteTask = async (id?: string) => {
    let res
    if(id){
      res = await deleteCard(id)
    }
  };
</script>
  
<style scoped>
  .task-card {
    max-width: 350px;
    margin: 20px;
  }
  
  .card-header {
    font-size: 18px;
    font-weight: bold;
  }
  
  
  .card-content {
    margin: 10px 0;
  }
</style>