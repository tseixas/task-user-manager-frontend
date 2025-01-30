<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-form @submit.prevent="login">
            <q-card-section class="text-center">
              <div class="text-grey-9 text-h5 text-weight-bold">Login</div>
            </q-card-section>

            <q-card-section>
              <q-input dense outlined v-model="email" :rules="[
                (val) => (val && val.length > 0) || 'Campo obrigatório.', validateEmail
              ]" label="Email"></q-input>
              <q-input dense outlined class="q-mt-md" v-model="password" :rules="[
                (val) => (val && val.length > 0) || 'Campo obrigatório.',
              ]" type="password" label="Senha"></q-input>
            </q-card-section>

            <q-card-section>
              <q-btn style="border-radius: 8px;" color="dark" rounded size="md" label="Entrar" type="submit" no-caps
                class="full-width"></q-btn>
            </q-card-section>

            <q-card-section class="text-center q-pt-none">
              <a href="#" class="text-dark text-weight-bold" style="text-decoration: none">Esqueci minha senha</a>

            </q-card-section>

            <q-card-section class="text-center q-pt-none">
              <div class="text-grey-8">Ainda não tem um conta?
                <a href="#" class="text-dark text-weight-bold" style="text-decoration: none">Cadastre-se</a>
              </div>
            </q-card-section>
          </q-form>

        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '../stores/user';
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';

const userStore = useUserStore();
const router = useRouter();

const email = ref('');
const password = ref('');

const validateEmail = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) || 'Por favor, insira um e-mail válido.';
};

const login = async () => {
  try {
    await userStore.login({ email: email.value, password: password.value });

    if (!userStore.isAuthenticated) {
      Notify.create({
        message: 'Credenciais inválidas!'
      })
    } else {
      // eslint-disable-next-line
      router.push('/')
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    Notify.create({
      message: 'Erro'
    })
  }
};
</script>
