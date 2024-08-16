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
                  <h1>Create Department</h1>
                  </v-col>
              </v-row>
              <v-row class="bg-white pa-4">
                  <!-- Column 1: Takes up 3 columns -->
                  <v-col cols="4" >
                      <h1>Department details</h1>
                      <p>Department details and settings.</p>
                  </v-col>
                  <!-- Column 2: Takes up 9 columns -->
                  <v-col cols="8">
                      <v-row>
                          <v-col>
                              <div class="input-section">
                                  <label for="department-name" class="input-label">Name</label>
                                  <v-text-field id="department-name" label="Department Name" ref="departmentName" class="input-field"></v-text-field>
                                  <!-- <v-text-field id="department-name" label="Department Name" class="input-field"></v-text-field> -->
                              </div>
                              <div class="input-section">
                                <label for="all-agent" class="input-label">All Agent</label>
                                <v-switch v-model="isAllAgents" inset></v-switch>
                                <div class="agent-description">
                                  <p class="ma-2">only selected agent</p>
                                  <p>Allows access to the department to all agents, or exclusively to a specific group of agents.</p>
                                </div>
                              </div>
                              <div class="input-section">
                                <label for="all-agent" class="input-label">Visibility</label>
                                <v-switch v-model="isPublic" inset></v-switch>
                                <div class="agent-description">
                                  <p class="ma-2">only selected agent</p>
                                  <p>Allows access to the department to all agents, or exclusively to a specific group of agents.</p>
                                </div>
                              </div>
                          </v-col>
                      </v-row>
                  </v-col>
              </v-row>
              <v-row v-show="!isAllAgents" class="bg-white pa-4">
                  <!-- Column 1: Takes up 3 columns -->
                  <v-col cols="4">
                    <h1>Department agents</h1>
                    <p>List of agents assigned to the department.</p>
                  </v-col>
                  <!-- Column 2: Takes up 9 columns -->
                  <v-col cols="8">
                    <v-row>
                      <v-col>
                        <div class="input-section">
                          <!-- <label for="agent-selection" class="input-label">Select Agents</label> -->
                          <v-radio-group v-model="selectedAgentOption" row>
                            <v-radio label="Admin" value="all" color="primary" class="custom-radio"></v-radio>
                            <v-radio label="All Agents" value="all" color="primary" class="custom-radio"></v-radio>
                          </v-radio-group>
                        </div>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              <v-row class="pt-6">
                <v-col class="d-flex justify-end">
                  <v-btn color="grey" @click="cancel">Cancel</v-btn>
                  <v-btn color="success" class="ml-4" @click="createDepartment">Create Department</v-btn>
                </v-col>
              </v-row>
          </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { db } from '../../firebase'; // Adjust the path to your firebase.js file
import { collection, addDoc } from 'firebase/firestore';


export default {
  data() {
    return {
      isAllAgents: false,
      isPublic: false,
      drawer: true,
      selectedAgentOption: 'selected', // Default value
      selectedVisibilityOption: 'private',
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
              this.$router.push('/');
          } catch (error) {
              console.log(error.message);
          }
      },
      cancel() {
        this.$toast('Department creation canceled', {
          type: 'info',
          timeout: 3000,
        });
        // console.log('Cancel method triggered');
        this.$router.push('/admin/department'); // Comment this out for testing
      },
      async createDepartment() { // Mark the method as async
          try {
            const departmentData = {
              name: this.$refs.departmentName.value,
              isAllAgents: this.isAllAgents,
              isPublic: this.isPublic,
              selectedAgentOption: this.selectedAgentOption,
              createdAt: new Date(),
            };
            await addDoc(collection(db, "departments"), departmentData); // Now you can use await
            this.$toast('Department created successfully!', {
              type: 'success',
              timeout: 3000,
            });

            // Redirect to the departments list
            this.$router.push('/admin/department');
          } catch (error) {
            console.error("Error creating department: ", error);
            this.$toast('Failed to create department', {
              type: 'error',
              timeout: 3000,
            });
          }
        },
      },
  }
</script>

<style scoped>
  .dashboard {
      margin: 30px;
      padding: 20px;
      background-color: #f5f7fb;
      border-radius: 10px;
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
.input-section {
  display: flex;
  flex-direction: column;
}
.custom-radio .v-input--selection-controls__ripple {
  background-color: #6200ea !important; /* Customize the ripple effect color */
}

.custom-radio .v-input--radio .v-input--radio__inner--active {
  border-color: #6200ea !important; /* Change the border color when active */
}

.custom-radio .v-input--radio .v-input--radio__input:checked + .v-input--radio__background .v-icon {
  color: #6200ea !important; /* Customize the icon color when checked */
}

.custom-radio .v-input--radio .v-input--radio__input:hover + .v-input--radio__background .v-icon {
  color: #3700b3 !important; /* Customize the icon color on hover */
}
  .input-label {
      font-size: 15px;
      color: #4a5568;
      margin-bottom: 8px;
      }

  .input-field {
      margin-top: 4px;
  }

  .bg-white {
      background-color: #ffffff;
  }
  p{
      color: #a0aec0;
      font-size: .875rem;
      margin-bottom: 15px;
  }
  .ma-2{
      color: #a0aec0;
      font-size: .875rem;
  }
</style>
