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
        <v-toolbar-title v-if="$vuetify.display.mdAndUp">
          LARADESK
        </v-toolbar-title>
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
          <div class="priority-section">
            <h1>Priorities</h1>
            <v-list>
              <v-list-item
                v-for="(priority, index) in priorities"
                :key="index"
                link
                @click="navigateToPriority(priority)"
              >
                <v-list-item-content style="display: flex; align-items: center;">
                  <span class="badge">{{ priority.number }}</span>
                  <span class="priority-title">{{ priority.title }}</span>
                  <v-list-item-icon>
                    <v-icon class="priority-icon">mdi-chevron-right</v-icon>
                  </v-list-item-icon>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  export default {
    data() {
      return {
        drawer: true,
        generalItems: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard', route: "dashboard" },
          { title: 'Tickets', icon: 'mdi-ticket-outline', route: "tickets" },
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
        priorities: [
          { title: 'Minor', number: 2 },
          { title: 'Medium', number: 4 },
          { title: 'Major', number: 6 },
          { title: 'Critical', number: 13 },
        ],
      };
    },
    methods: {
      navigateToPriority(priority) {
        // Handle the navigation logic here
        console.log('Navigating to:', priority.title);
      },
    },
  };
  </script>
  
  <style scoped>
  .priority-section {
    padding: 20px;
    background-color: #f5f7fb;
    overflow: hidden; /* Ensures the section is not scrollable */
  }
  
  .priority-section h1 {
    font-size: 1.5rem;
    color: #34495e;
    margin-bottom: 20px;
  }
  
  .v-list-item-content {
    font-size: 14px;
    color: #2c3e50;
  }
  
  .badge {
    background-color: #9adde2;
    border-radius: 4px;
    padding: 2px 8px;
    font-size: 12px;
    color: grey;
    margin-right: 8px;
  }
  
  .priority-title {
    flex-grow: 1;
  }
  
  .priority-icon {
    color: #b0bec5;
    margin-left: auto; /* Moves the icon to the far right */
  }
  </style>
  