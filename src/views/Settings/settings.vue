<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <div class="settings-section">
          <h1>Settings</h1>
          <v-row>
            <v-col cols="12" md="3" v-for="setting in settings" :key="setting.title">
              <v-card class="pa-5 hoverable card-custom" @click="navigateToSetting(setting.route)">
                <v-card-title>
                  <v-icon class="mr-2" style="font-size: 48px;">{{ setting.icon }}</v-icon>
                </v-card-title>
                <v-card-text class="text-wrap">{{ setting.title }}</v-card-text>
                <v-card-subtitle class="text-wrap">{{ setting.description }}</v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </div>
        <router-view></router-view>
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
          route: 'settings/general'
        },
        {
          title: 'SEO',
          icon: 'mdi-magnify',
          description: 'Configure site SEO parameters',
          route: 'settings/seo',
        },
        {
          title: 'Appearance',
          icon: 'mdi-palette',
          description: 'Configure the site icon and background',
          route: 'settings/appearance',
        },
        {
          title: 'Localization',
          icon: 'mdi-translate',
          description: 'Configure localization settings for the site',
          route: 'settings/localization',
        },
        {
          title: 'Authentication',
          icon: 'mdi-lock',
          description: 'Configure registration, social login, and related 3rd party integrations',
          route: 'settings/authentication',
        },
        {
          title: 'Outgoing Mail',
          icon: 'mdi-email-send',
          description: 'Configure outgoing email service preferences',
          route: 'settings/outgoing-mail',
        },
        {
          title: 'Logging',
          icon: 'mdi-file-chart',
          description: 'Configure outgoing email service preferences',
          route: 'settings/logging',
        },
        {
          title: 'Captcha',
          icon: 'mdi-robot',
          description: 'Configure captcha settings & preferences',
          route: 'settings/captcha',
        },
      ],
    };
  },
  methods: {
    navigateToSetting(route) {
      this.$router.push({ path: route });
    }
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
