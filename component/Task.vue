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
      
      <div class="flex flex-row gap-2">
        <n-button 
          :disabled="task.marked_status === 'done'"
          @click="markAsDone"
          type="success" 
          size="small">
          Done
        </n-button>
        
        <n-button 
          :disabled="task.marked_status === 'canceled'"
          @click="markAsCanceled"
          type="error" 
          size="small">
          Canceled
        </n-button>
        
        <n-button 
          @click="deleteTask"
          type="default" 
          size="small">
          Delete
        </n-button>
      </div>
    </n-card>
  </template>
  
<script setup lang="ts">
  import { ref } from 'vue';
  import { NCard, NButton } from 'naive-ui';
  
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

  const props = defineProps<{ task: Task }>();
  
  // Define the task state
  const task = ref<Task>({
    title: 'Title of task',
    content: 'Content of task',
    marked_status: 'pending',
  });
  
  const markAsDone = () => {
    props.task.marked_status = 'done';
  };
  
  const markAsCanceled = () => {
    props.task.marked_status = 'canceled';
  };
  
  const deleteTask = () => {
    props.task.marked_status = 'deleted'
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