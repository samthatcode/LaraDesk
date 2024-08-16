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
      <v-toolbar-title v-if="$vuetify.display.mdAndUp">LARADESK</v-toolbar-title>

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
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <v-container fluid>
        <div class="dashboard">
          <v-row>
            <v-col>
              <h1>Users</h1>
            </v-col>
            <v-col cols="auto">
              <v-btn @click="handleButtonClick" color="primary" class="mr-4 rounded">Create User role</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card>
                <v-card-title>
                  <h1>Search</h1>
                </v-card-title>
                <v-list>
                  <v-list-item v-for="user in users" :key="user.id">
                    <v-list-item-content>
                      <v-card class="d-flex align-center pa-4">
                        <v-avatar size="50" class="mr-4">
                          <img src="https://cdn.vuetifyjs.com/images/john.png" alt="avatar">
                        </v-avatar>
                        <v-card-title class="pa-0">
                          <v-row class="d-flex align-center" no-gutters>
                            <v-col>
                              <div class="text-sm font-medium text-blue-600">{{ user.name }}</div>
                              <div class="mt-2 text-sm text-gray-500">
                                <span class="truncate">{{ user.email }}</span>
                              </div>
                            </v-col>
                            <v-col class="d-none d-lg-flex">
                              <div class="text-sm text-gray-900">The user has the role: <b>{{ user.role }}</b></div>
                              <div class="mt-2 text-sm text-gray-500">User is activated</div>
                            </v-col>
                          </v-row>
                        </v-card-title>
                      </v-card>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-card-actions class="justify-end">
                  <v-btn text color="primary" class="mr-4 rounded">Previous</v-btn>
                  <v-btn text color="primary" class="mr-4 rounded">Next</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { db } from '../../firebase';

export default {
  data() {
    return {
      drawer: true, 
      users: [],
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
  async created() {
    try {
      const usersSnapshot = await db.collection('users').get();
      this.users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  },
  methods: {
    handleButtonClick() {
      this.$router.push({ name: 'user_roles_add' })
    },
    getCurrentUserEmail() {
      return auth.currentUser ? auth.currentUser.email : 'No user logged in';
    },
    async logout() {
      try {
        await auth.signOut();
        this.$router.push('/login');
      } catch (error) {
        console.error('Error signing out:', error);
      }
    },
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

.d-flex.align-center {
  display: flex;
  align-items: center;
}

.permission-text {
  color: #a0aec0;
  font-size: 0.875rem;
  margin-left: 8px;
}

.ma-2 {
  color: #a0aec0;
  font-size: 0.875rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.bg-white {
  background-color: #ffffff;
}

.text-sm {
  font-size: 0.875rem;
}

.font-medium {
  font-weight: 500;
}

.text-blue-600 {
  color: #3182ce;
}

.mt-2 {
  margin-top: 0.5rem;
}

.text-gray-500 {
  color: #a0aec0;
}

.text-gray-900 {
  color: #1a202c;
}

.truncate {
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
