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
        <!-- Toggle Icon for Small Screens -->
        <v-app-bar-nav-icon @click="drawer = !drawer" v-if="!$vuetify.display.mdAndUp"></v-app-bar-nav-icon>
  
        <!-- Logo Section -->
        <v-toolbar-title
          v-if="$vuetify.display.mdAndUp"
        >
          LARADESK
        </v-toolbar-title>
  
        <v-spacer>
          <button @click="logout">Sign Out</button>
        </v-spacer>
  
        <!-- User Profile Icon -->
        <v-avatar size="32">
          <img src="https://cdn.vuetifyjs.com/images/john.png" alt="Avatar">
        </v-avatar>
      </v-app-bar>
  
      <!-- Sidebar (Navigation Drawer) -->
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
  
          <v-list-item v-for="item in generalItems" :key="item.title" :to="{ name: item.routeName }" link>
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
        </v-list>
      </v-navigation-drawer>
  
      <!-- Main Content -->
      <v-main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  import { auth } from '../../firebase';
  import { RouterLink } from 'vue-router';
  
  export default {
    data() {
      return {
        drawer: true,
        generalItems: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard', routeName: 'dashboard' },
          { title: 'Tickets', icon: 'mdi-ticket-outline', routeName: 'tickets' },
          { title: 'Canned replies', icon: 'mdi-message-text-outline', routeName: 'replies' },
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
        stats: [
          { title: 'Open tickets', value: '45' },
          { title: 'Pending tickets', value: '5' },
          { title: 'Solved tickets', value: '91' },
          { title: 'Without assign agent', value: '92' },
        ],
      };
    },
    methods: {
        async logout() {
            try {
                await auth.signOut();
                this.$router.push('/login');
            } catch (error) {
                console.log(error.message);
            }
        }
    }
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
    background-color: #3498db;
    border-radius: 5px;
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
  </style>