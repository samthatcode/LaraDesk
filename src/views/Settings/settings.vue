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
          <div class="settings-section">
            <h1>Settings</h1>
            <v-row>
              <v-col cols="12" md="3" v-for="setting in settings" :key="setting.title">
                <v-card class="pa-5 hoverable card-custom" @click="navigateToSetting(setting)">
                  <v-card-title>
                    <v-icon class="mr-2" style="font-size: 48px;">{{ setting.icon }}</v-icon>
                  </v-card-title>
                  <v-card-text class="text-wrap">{{ setting.title }}</v-card-text>
                  <v-card-subtitle class="text-wrap">{{ setting.description }}</v-card-subtitle>
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
        settings: [
          {
            title: 'General',
            icon: 'mdi-cog',
            description: 'Configure general site settings',
          },
          {
            title: 'SEO',
            icon: 'mdi-magnify',
            description: 'Configure site SEO parameters',
          },
          {
            title: 'Appearance',
            icon: 'mdi-palette',
            description: 'Configure the site icon and background',
          },
          {
            title: 'Localization',
            icon: 'mdi-translate',
            description: 'Configure localization settings for the site',
          },
          {
            title: 'Authentication',
            icon: 'mdi-lock',
            description: 'Configure registration, social login, and related 3rd party integrations',
          },
          {
            title: 'Outgoing Mail',
            icon: 'mdi-email-send',
            description: 'Configure outgoing email service preferences',
          },
          {
            title: 'Logging',
            icon: 'mdi-file-chart',
            description: 'Configure outgoing email service preferences',
          },
          {
            title: 'Captcha',
            icon: 'mdi-robot',
            description: 'Configure captcha settings & preferences',
          },
        ],
      };
    },
    methods: {
      navigateToSetting(setting) {
        // Handle navigation logic here
        console.log('Navigating to:', setting.title);
      },
    },
  };
  </script>
  
  <style scoped>
  .settings-section {
    padding: 20px;
    background-color: #f5f7fb;
  }
  
  .settings-section h1 {
    font-size: 1.5rem;
    color: #34495e;
    margin-bottom: 20px;
  }
  
  .v-card {
    transition: box-shadow 0.2s ease-in-out;
    cursor: pointer;
    text-align: center;
  }
  
  .v-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .v-card-title {
    justify-content: center;
  }
  
  .v-card-title .v-icon {
    font-size: 48px;
    color: #34495e;
  }
  
  .v-card-text {
    font-size: 18px;
    color: #2c3e50;
    margin-top: 10px;
  }
  
  .v-card-subtitle {
    font-size: 14px;
    color: #666;
  }
  
  .card-custom {
    min-height: 250px;
    max-width: 100%;
  }
  
  .text-wrap {
    word-wrap: break-word;
    white-space: normal;
  }
  </style>
  