<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-btn label="Adicionar Tarefa" color="primary" @click="openTaskModal" class="q-mb-md" />

      <!-- <q-row class="q-gutter-md" v-if="cards.length">
        <q-col cols="12" sm="6" md="4" lg="3">
          <q-card class="q-mb-sm card" v-for="task in cards" :key="task._id" bordered>
            <q-card-section>
              <div class="text-h6">{{ task.title }}</div>
              <div class="text-caption">{{ task.description }}</div>

              <div class="text-caption q-mt-md">{{ task.due_date }}</div>

              <div class="q-mt-md">
                <q-chip v-if="task.status === 'completed'" color="green" label="Concluída" />
                <q-chip v-else-if="task.status === 'in-progress'" color="orange" label="Em andamento" />
                <q-chip v-else color="red" label="Pendente" />
              </div>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat color="primary" @click="editTask(task)">Editar</q-btn>
              <q-btn flat color="negative" @click="deleteTask(task._id)">Excluir</q-btn>
            </q-card-actions>
          </q-card>
        </q-col>
      </q-row> -->

      <div class="row" v-if="cards.length">
        <div class="col-sm-12 col-md-2" v-for="task in cards" :key="task._id" >
          <q-card class="q-mb-sm card" bordered>
            <q-card-section>
              <div class="text-h6">{{ task.title }}</div>
              <div class="text-caption">{{ task.description }}</div>

              <div class="text-caption q-mt-md">{{ task.due_date }}</div>

              <div class="q-mt-md">
                <q-chip v-if="task.status === 'completed'" color="green" label="Concluída" />
                <q-chip v-else-if="task.status === 'in-progress'" color="orange" label="Em andamento" />
                <q-chip v-else color="red" label="Pendente" />
              </div>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat color="primary" @click="editTask(task)">Editar</q-btn>
              <q-btn flat color="negative" @click="deleteTask(task._id)">Excluir</q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>

      <div v-else class="text-grey text-center q-mt-lg">
        <q-icon name="task" size="48px" />
        <div class="text-h6">Nenhuma tarefa encontrada</div>
      </div>
    </div>

    <q-dialog v-model="isTaskModalOpen">
      <q-card class="modal">
        <q-card-section>
          <div class="text-h6">{{ isEdit ? 'Atualizar' : 'Adicionar' }} Tarefa</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="taskForm.title" label="Título" outlined dense required class="q-mb-md" />
          <q-input v-model="taskForm.description" label="Descrição" outlined dense type="textarea" class="q-mb-md"
            required />
          <q-input v-model="taskForm.due_date" label="Data de Vencimento" outlined dense type="date" required />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="secondary" @click="closeTaskModal" />
          <q-btn flat label="Salvar" color="primary" @click="saveTask" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '../boot/axios'
import { Notify } from 'quasar'

interface Task {
  _id: string;
  title: string;
  description: string;
  due_date: string;
  status: string;
}

const isTaskModalOpen = ref(false);
const isEdit = ref(false);
const cards = ref<Task[]>([]);
const taskForm = ref({
  _id: null,
  title: '',
  description: '',
  due_date: '',
  status: ''
});

onMounted(async () => {
  await listAll()
});

const listAll = async () => {
  try {
    const response = await api.get('/tasks/all');
    cards.value = response.data;

  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
  }
}


const saveTask = async () => {
  console.log(taskForm.value)

  console.log(isEdit.value)

  try {
    if (isEdit.value) {
      const response = await api.put(`/tasks/${taskForm.value._id}`, taskForm.value);

      if (response.status === 200) {
        Notify.create({
          message: 'Salvo com sucesso!'
        })

        await listAll()
      }
    } else {
      const response = await api.post('/tasks/', taskForm.value);

      if (response.status === 201) {
        Notify.create({
          message: 'Salvo com sucesso!'
        })

        await listAll()
      }

    }


  } catch (error) {
    console.log(error)
  }

  closeTaskModal();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const editTask = (task: any) => {
  console.log(task)
  isEdit.value = true
  taskForm.value = { ...task };
  isTaskModalOpen.value = true;
};

const deleteTask = async (id: string) => {
  const response = await api.delete(`/tasks/${id}`);

  if (response.status === 200) {
    Notify.create({
      message: 'Removido com sucesso!'
    })

    await listAll()
  }
};

const openTaskModal = () => {
  taskForm.value = { _id: null, title: '', description: '', due_date: '', status: '' };
  isTaskModalOpen.value = true;
};

const closeTaskModal = () => {
  isTaskModalOpen.value = false;
};

</script>


<style scoped>
.card {
  max-width: 300px;
  margin: 20px;
}

.modal {
  width: 500px;
}
</style>
