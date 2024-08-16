<template>
    <v-container fluid fill-height class="d-flex justify-center align-center">
      <v-card class="login-card" elevation="2">
        <v-card-title class="text-h5">Login</v-card-title>
        <v-card-subtitle class="mb-4">Please enter your details to log in</v-card-subtitle>
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
          
        </v-form>
        <v-btn
            @click="goToWelcome"
            type="submit"
            color="primary"
            class="mt-4"
            large
          >
            Go to Landing Page
          </v-btn>
      </v-card>
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
                password: ''
            };
            },
            methods: {
              async login() {
                  const toast = useToast();
                  try {
                  await signInWithEmailAndPassword(auth, this.email, this.password);
                  this.$router.push('/dashboard');
                  toast.success('Successfully logged in!');
                  } catch (error) {
                  toast.error(`Login failed: ${error.message}`);
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
.login-card {
  max-width: 400px;
  width: 100%;
  padding: 20px;
  border-radius: 8px;
}

.v-card-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.v-card-subtitle {
  font-size: 0.875rem;
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
</style>

  