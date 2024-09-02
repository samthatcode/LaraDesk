<template>
  <v-container fluid fill-height class="d-flex align-center justify-center">
    <v-row class="login-row" align="center" justify="center">
      <!-- Image Side -->
      <v-col cols="6" md="6" class="d-flex justify-center align-center">
        <v-img
          src="https://via.placeholder.com/600x800" 
          class="login-image"
          contain
        ></v-img>
      </v-col>

      <!-- Login Form Side -->
      <v-col cols="6" md="6" class="d-flex justify-center align-center">
        <v-card class="login-card" elevation="2">
          <v-card-title class="text-center">
            <v-img
              src="https://via.placeholder.com/150"
              class="logo"
              contain
              max-height="50"
            ></v-img>
          </v-card-title>
          <v-card-subtitle class="text-center mb-4">
            Please enter your details to log in
          </v-card-subtitle>
          <v-form @submit.prevent="login">
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              required
              outlined
              dense
              class="mb-4"
            />
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              required
              outlined
              dense
              class="mb-4"
            />
            <v-btn
              type="submit"
              color="primary"
              class="mt-4"
              large
            >
              Login
            </v-btn>
            <v-btn
              @click="goToSignUp"
              text
              class="mt-2"
              large
            >
              Don't have an account? Sign Up
            </v-btn>
            <v-btn
              @click="goToWelcome"
              text
              class="mt-2"
              large
            >
              Go to Landing Page
            </v-btn>
          </v-form>
          <v-dialog v-model="loading" persistent max-width="290">
            <v-card>
              <v-card-title class="text-center">
                <v-spinner size="64" />
              </v-card-title>
              <v-card-subtitle class="text-center">
                Please wait while we log you in...
              </v-card-subtitle>
            </v-card>
          </v-dialog>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      email: '',
      password: '',
      loading: false
    };
  },
  methods: {
    async login() {
      const toast = useToast();
      this.loading = true;
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);
        this.$router.push('/dashboard');
        toast.success('Successfully logged in!');
      } catch (error) {
        toast.error(`Login failed: ${error.message}`);
      } finally {
        this.loading = false;
      }
    },
    goToSignUp() {
      this.$router.push('/signup');
    },
    goToWelcome() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.login-image {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.login-card {
  max-width: 400px;
  width: 100%;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.logo {
  max-width: 150px;
  margin: 0 auto;
}

.v-card-title {
  text-align: center;
}

.v-card-subtitle {
  text-align: center;
  color: #666;
}

.mb-4 {
  margin-bottom: 16px;
}

.mt-4 {
  margin-top: 16px;
}

.mt-2 {
  margin-top: 8px;
}

.login-row {
  max-width: 1200px;
  width: 100%;
}

@media (max-width: 960px) {
  .login-image {
    display: none;
  }
}
</style>
