<template>
    <v-app>
  
      <!-- Main Content -->
      <v-main>
        <div class="container container-custom">
          <div class="form-section">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h3>Outgoing mail</h3>
              <button class="btn btn-primary back-btn">Back</button>
            </div>
            <form>
              <div class="mb-3">
                <label for="fromAddress" class="form-label">From address</label>
                <input type="email" class="form-control" id="fromAddress" value="no_reply@getlaradesk.com">
                <div class="form-text form-text-muted">All outgoing application emails will be sent from this email address.</div>
              </div>
              <div class="mb-3">
                <label for="fromName" class="form-label">From name</label>
                <input type="text" class="form-control" id="fromName" value="Laradesk">
                <div class="form-text form-text-muted">All outgoing application emails will be sent using this name.</div>
                <hr>
              </div>
              <div class="mb-3">
                <label for="mailMethod" class="form-label">Outgoing mail method</label>
                <select class="form-select" id="mailMethod">
                  <option selected>Log (Email will be saved to error log)</option>
                  <!-- Add other options here if necessary -->
                </select>
              </div>
              <div class="text-right">
                <button type="submit" class="btn btn-success">Save settings</button>
              </div>
            </form>
          </div>
        </div>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const drawer = ref(true)
  const forceHttps = ref(true)
  const goBack = () => {
    // Logic for going back
  }
  
  const saveSettings = () => {
    // Logic for saving settings
  }
  </script>
  
  <style scoped>
  body {
    background-color: #f8f9fa;
  }
  
  .container {
    width: 100%;
    margin-top: 20px;
  }
  
  .card {
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .form-control {
    border-radius: 8px;
    height: 40px;
    font-size: 14px;
  }
  
  .btn-save {
    border-radius: 8px;
    padding: 6px 16px;
    font-size: 14px;
    color: white;
    font-weight: bold;
    width: 150px;
  }
  
  .label,
  .text-muted {
    font-size: 12px;
  }
  
  /* New CSS */
  body {
    font-size: 14px; /* Reduced base font size */
    line-height: 45px;
  }
  
  .container-full {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .form-section {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .form-section > * {
    padding-top: 10px; /* Added padding-top to all children */
  }
  
  .back-btn {
    float: right;
  }
  
  .form-text-muted {
    line-height: 45px;
    font-size: 0.8rem;
    color: #6c757d;
  }
  
  hr {
    margin-top: 30px;
    margin-bottom: 20px;
  }
  
  .text-right {
    text-align: right;
    line-height: 45px;
  }
  </style>