<template>
    <v-container fluid>
      <div class="dashboard">
        <v-row>
          <v-col>
            <h1>Dashboard</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="stat in stats" :key="stat.title" cols="12" md="3">
            <v-card class="stat-card">
              <v-card-title>{{ stat.title }}</v-card-title>
              <v-card-subtitle>{{ stat.value }}</v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card class="chart-card">
              <v-card-title>Opened tickets this year</v-card-title>
              <div class="chart-placeholder">
                <img src="../../assets/download (1).png" alt="">
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        stats: [
          { title: 'Open tickets', value: '45' },
          { title: 'Pending tickets', value: '5' },
          { title: 'Solved tickets', value: '91' },
          { title: 'Without assign agent', value: '92' },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  /* Include the styles for the dashboard structure */
  .dashboard {
    padding: 20px;
    background-color: #f5f7fb;
  }
  
  h1 {
    font-size: 1.5rem;
    color: #34495e;
  }
  
  .stat-card {
    padding: 16px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24);
  }
  
  .stat-card .v-card-title {
    font-size: 14px;
    color: #7f8c8d;
  }
  
  .stat-card .v-card-subtitle {
    font-size: 2rem;
    color: #2c3e50;
  }
  
  .chart-card {
    padding: 16px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24);
  }
  
  .chart-placeholder {
    width: 100%;
    height: 300px;
    border-radius: 5px;
  }
  </style>
  