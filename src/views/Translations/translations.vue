<template>
    <v-app>
      <!-- Navbar -->
      <v-app-bar
        color="white"
        prominent
        flat
        app
        style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); border-bottom: 1px solid #e0e0e0;"
      >
        <v-app-bar-nav-icon @click="drawer = !drawer" v-if="!$vuetify.display.mdAndUp"></v-app-bar-nav-icon>
  
        <v-toolbar-title v-if="$vuetify.display.mdAndUp">LARADESK</v-toolbar-title>
  
        <v-spacer></v-spacer>
  
        <v-avatar size="32">
          <img src="https://cdn.vuetifyjs.com/images/john.png" alt="Avatar">
        </v-avatar>
      </v-app-bar>
  
      <!-- Sidebar -->
      <v-navigation-drawer
        v-model="drawer"
        app
        :temporary="!$vuetify.display.mdAndUp"
        fixed
        width="250"
        color="#272B36"
        dark
      >
        <v-list>
          <!-- General Section -->
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-uppercase text-xs text-muted">General</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
  
          <v-list-item v-for="item in generalItems" :key="item.title" :to="{ name: item.route }" link>
            <v-list-item-content style="display: flex; align-items: center;">
              <v-icon style="font-size: 16px; color: #b0bec5; margin-right: 8px;">
                {{ item.icon }}
              </v-icon>
              <v-list-item-title style="font-size: 14px; color: #eceff1;">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
  
          <!-- Administration Section -->
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-uppercase text-xs text-muted">Administration</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
  
          <v-list-item v-for="item in adminItems" :key="item.title" :to="`/${item.route}`" link>
            <v-list-item-content style="display: flex; align-items: center;">
              <v-icon style="font-size: 16px; color: #b0bec5; margin-right: 8px;">
                {{ item.icon }}
              </v-icon>
              <v-list-item-title style="font-size: 14px; color: #eceff1;">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
  
          <!-- Language Section -->
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-uppercase text-xs text-muted">Language</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
  
          <v-list-item link>
            <v-list-item-content style="display: flex; align-items: center; justify-content: space-between;">
              <v-list-item-title class="language-title">
                English
              </v-list-item-title>
              <v-icon style="color: grey;">mdi-chevron-right</v-icon>
            </v-list-item-content>
          </v-list-item>
  
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title style="font-size: 14px; color: #b0bec5;">
                Showing 1 language
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  
      <!-- Main Content -->
      <v-main>
        <v-container fluid class="no-scroll">
          <div class="dashboard">
            <v-row>
              <v-col>
                <h1>Languages</h1>
              </v-col>
              <v-col class="d-flex justify-end align-center">
                <v-btn color="grey darken-1" class="mx-2">Synchronize translations</v-btn>
                <v-btn color="primary">Create language</v-btn>
              </v-col>
            </v-row>
  
            <v-row>
              <v-col>
                <v-card outlined>
                  <v-list-item link>
                    <v-list-item-content style="display: flex; align-items: center; justify-content: space-between;">
                      <v-list-item-title class="language-title">
                        English
                      </v-list-item-title>
                      <v-icon style="color: grey;">mdi-chevron-right</v-icon>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle>Showing 1 language</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  export default {
    data() {
      return {
        drawer: true, // Sidebar toggle
        generalItems: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard', route: "dashboard" },
          // { title: 'Tickets', icon: 'mdi-ticket-outline', route: "tickets" },
          { title: 'Canned replies', icon: 'mdi-message-text-outline', route: "replies" },
        ],
        adminItems: [
          { title: 'Departments', icon: 'mdi-domain', route: 'admin/department' },
          { title: 'Labels', icon: 'mdi-label-outline', route: 'dashboard/admin/label' },
          { title: 'Statuses', icon: 'mdi-check',route: 'dashboard/admin/status' },
          { title: 'Priorities', icon: 'mdi-flag',route: 'dashboard/admin/priorities' },
          { title: 'Users', icon: 'mdi-account-outline', route: 'dashboard/admin/users' },
          { title: 'User roles', icon: 'mdi-account-key-outline',route: 'dashboard/admin/users_roles' },
          { title: 'Settings', icon: 'mdi-cog-outline',route: 'dashboard/admin/settings' },
          { title: 'Translation', icon: 'mdi-translate',route: 'dashboard/admin/translate' },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .dashboard {
    padding: 20px;
    background-color: #f5f7fb;
  }
  
  h1 {
    font-size: 1.5rem;
    color: #34495e;
  }
  
  .v-navigation-drawer {
    border-right: 1px solid #1c2025;
  }
  
  .v-list-item-title {
    font-weight: 500;
  }
  
  .v-list-item-icon {
    min-width: 36px;
  }
  
  .v-list-item-title,
  .v-list-item-icon {
    display: flex;
    align-items: center;
  }
  
  .v-list-item-title {
    color: #cfd8dc;
    font-size: 14px;
    padding-left: 8px;
  }
  
  .v-btn {
    text-transform: none;
  }
  
  .v-btn.primary {
    background-color: #007bff;
  }
  
  .v-btn.primary:hover {
    background-color: #0056b3;
  }
  
  .v-btn.grey {
    background-color: #6c757d;
    color: #fff;
  }
  
  .v-btn.grey:hover {
    background-color: #5a6268;
  }
  
  .language-title {
    color: #007bff;
    font-weight: 500;
    font-size: 13px; /* Reduced font size */
    text-decoration: none; /* Removed underline */
  }
  
  .v-list-item-subtitle {
    color: #6c757d;
  }
  </style>
  