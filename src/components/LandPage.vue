<template>
  <v-container>
    <h1>welcome page</h1>
    <v-btn @click="handleButtonClick" color="primary" class="mr-2 rounded">Get Started</v-btn>
  </v-container>
</template>

<script>
export default {
    methods: {
      handleButtonClick() {
        // Navigate to the "Add Department" page
        this.$router.push('/login');
      }
    }
}
</script>

<style>

</style>