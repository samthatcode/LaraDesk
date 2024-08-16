<template>
    <v-app>
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
            <v-list-item v-for="item in generalItems" :key="item.title" :to="item.route" link>
                <v-list-item-content style="display: flex; align-items: center;">
                    <v-icon style="font-size: 16px; color: #b0bec5; margin-right: 8px;">
                    {{ item.icon }}
                    </v-icon>
                    <v-list-item-title style="font-size: 14px; color: #eceff1;">
                    {{ item.title }}
                    </v-list-item-title>
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
          <div class="dashboard">
            <v-row>
              <v-col>
                <h1>Create Ticket</h1>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  import { auth } from '../firebase';
  
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
  