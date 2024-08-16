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
        <div class="department">
          <v-row>
            <v-col>
              <h1>Department</h1>
            </v-col>
            <v-col cols="auto">
              <v-btn @click="handleButtonClick" color="primary" class="mr-4 rounded">Create Department</v-btn>
            </v-col>
          </v-row>
          <v-list>
            <v-list-item
              v-for="department in departments"
              :key="department.name"
              class="department-item"
            >
              <v-list-item-content>
                <div class="department-row">
                  <!-- Department name and All agents on the same row -->
                  <div class="department-info">
                    <div class="department-name">
                      {{ department.name }}
                    </div>
                    <div class="department-agents">
                      <span v-if="department.isAllAgents">All agents</span>
                      <span v-else>Selected agents only</span>
                      <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
                    </div>
                  </div>
                  <!-- Lock icon and status on the next row -->
                  <div class="department-status">
                    <v-icon small :color="department.isPublic ? 'green' : 'red'">
                      {{ department.isPublic ? 'mdi-lock-open-outline' : 'mdi-lock-outline' }}
                    </v-icon>
                    <span>{{ department.isPublic ? 'The department is public' : 'The department is private' }}</span>
                  </div>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { db } from '../../firebase'; // Adjust the path to your firebase.js file
import { collection, getDocs } from 'firebase/firestore';
export default {
  data() {
    return {
      drawer: true, // Initially open the sidebar on large screens
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
        departments: [],
    };
  },
  created() {
    this.fetchDepartments(); // Fetch departments when the component is created
  },
  methods: {
    async logout() {
      try {
        await auth.signOut();
        this.$router.push('/');
      } catch (error) {
        console.log(error.message);
      }
    },
    handleButtonClick() {
      // Navigate to the "Add Department" page
      this.$router.push({ name: 'add_dept' });
    },
    async fetchDepartments() {
      try {
        const querySnapshot = await getDocs(collection(db, "departments"));
        const departmentsData = [];
        querySnapshot.forEach((doc) => {
          departmentsData.push(doc.data());
        });
        this.departments = departmentsData;
      } catch (error) {
        console.error("Error fetching departments: ", error);
      }
    }
  }

};
</script>

<style scoped>
.departments {
  padding: 20px;
  background-color: #f5f7fb;
  overflow-y: hidden; /* Prevent scrolling */
}

h1 {
  font-size: 1.5rem;
  color: #34495e;
}

.department-item {
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  padding: 16px 0;
}

.department-row {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.department-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.department-name {
  font-size: 16px;
  color: #2c3e50;
}

.department-agents {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #7f8c8d;
}

.department-status {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #7f8c8d;
  margin-top: 4px;
}

.v-btn {
  font-size: 14px;
  text-transform: none;
  background-color: #007bff;
  margin-bottom: 40px;
  color: white;
}

.v-btn:hover {
  background-color: #0069d9;
}

</style>
