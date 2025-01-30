<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated v-if="isAuthenticated">
      <q-toolbar>

        <q-toolbar-title>
          Task Manager App
        </q-toolbar-title>

        <div><q-btn flat label="Sair" @click="logout" /></div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '../stores/user';
import { useRouter } from 'vue-router';

const store = useUserStore();
const router = useRouter();

const isAuthenticated = computed(() => store.isAuthenticated)

const logout = async () => {
  // eslint-disable-next-line
  router.push('/login')
  await store.logout();
};
</script>
