<template>
    <v-container>
      <v-card>
        <v-card-title>
          <span class="headline">Sign Up</span>
        </v-card-title>
        <v-card-subtitle>Please fill in the details to create an account</v-card-subtitle>
        <v-form @submit.prevent="signup">
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            required
            outlined
          />
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            required
            outlined
          />
          <v-text-field
            v-model="confirmPassword"
            label="Confirm Password"
            type="password"
            required
            outlined
          />
          <v-btn
            type="submit"
            color="primary"
            class="mt-3"
          >
            Sign Up
          </v-btn>
          <v-btn
            @click="goToLogin"
            text
            class="mt-2"
          >
            Back to Login
          </v-btn>
        </v-form>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import { createUserWithEmailAndPassword } from 'firebase/auth';
  import { auth } from '../firebase';
  import { useToast } from 'vue-toastification';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        confirmPassword: ''
      };
    },
    methods: {
      async signup() {
        const toast = useToast();
        if (this.password !== this.confirmPassword) {
          toast.error('Passwords do not match');
          return;
        }
        try {
          await createUserWithEmailAndPassword(auth, this.email, this.password);
          this.$router.push('/dashboard');
          toast.success('Account created successfully!');
        } catch (error) {
          toast.error(`Sign up failed: ${error.message}`);
        }
      },
      goToLogin() {
        this.$router.push('/login');
      }
    }
  };
  </script>  
  
  <style scoped>
  .v-card {
    max-width: 500px;
    margin: auto;
    padding: 20px;
  }
  
  .headline {
    font-size: 1.5rem;
  }
  
  .v-card-subtitle {
    margin-bottom: 1rem;
  }
  
  .mt-3 {
    margin-top: 16px;
  }
  
  .mt-2 {
    margin-top: 8px;
  }
  </style>
  