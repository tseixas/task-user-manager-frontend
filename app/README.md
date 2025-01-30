
# Projeto task-user-manager-frontend

Este projeto é uma aplicação desenvolvido com [VueJS](https://vuejs.org/), [Quasar](https://quasar.dev/) e [Pinia Store](https://pinia.vuejs.org/).

## 📥 Clonando o Repositório

Para baixar o código-fonte do projeto, execute o seguinte comando:

```sh
git clone git@github.com:tseixas/task-user-manager-frontend.git
cd task-user-manager-frontend
```

## 🐳 Executando a Aplicação via Docker

Antes de iniciar, certifique-se de ter o [Docker](https://www.docker.com/) e o [Docker Compose](https://docs.docker.com/compose/) instalados.

### 🚀 Passos para Rodar a Aplicação

1. **Copie o arquivo de variáveis de ambiente (se necessário)**
   ```sh
   cp .env.example .env
   ```
   
2. **Construa e inicie os containers**
   ```sh
   docker compose up --build
   ```
   
3. **Verifique se os containers estão rodando(Opcional)**
   ```sh
   docker ps
   ```

4. **Acesse a aplicação**
   - O frontend estará disponível em: `http://localhost:9000`

5. **Credenciais de acesso**
   - email: `admin@mail.com`
   - senha: `123456`

## 🛑 Parando a Aplicação
Para parar os containers, execute:
```sh
docker-compose down
```

---

Desenvolvido por [Seu Nome](https://github.com/tseixas) 🚀

