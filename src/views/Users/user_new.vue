<template>
  <v-app>
    <!-- Navbar -->
    <v-app-bar
      color="white"
      prominent
      flat
      app
      style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); border-bottom: 1px solid #e0e0e0"
    >
      <!-- Toggle Icon for Small Screens -->
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        v-if="!$vuetify.display.mdAndUp"
      ></v-app-bar-nav-icon>

      <!-- Logo Section -->
      <v-toolbar-title v-if="$vuetify.display.mdAndUp"> LARADESK </v-toolbar-title>

      <v-spacer>
        <button @click="logout">Sign Out</button>
      </v-spacer>

      <!-- User Profile Icon -->
      <v-avatar size="32">
        <img src="https://cdn.vuetifyjs.com/images/john.png" alt="Avatar" />
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
          <v-list-item-content style="display: flex; align-items: center">
            <v-icon style="font-size: 16px; color: #b0bec5; margin-right: 8px">
              {{ item.icon }}
            </v-icon>
            <v-list-item-title style="font-size: 14px; color: #eceff1">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Administration Section -->
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-uppercase text-xs text-muted"
              >Administration</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-for="item in adminItems" :key="item.title" :to="`/${item.route}`" link>
          <v-list-item-content style="display: flex; align-items: center">
            <v-icon style="font-size: 16px; color: #b0bec5; margin-right: 8px">
              {{ item.icon }}
            </v-icon>
            <v-list-item-title style="font-size: 14px; color: #eceff1">
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
          <!-- Department Details Section -->
          <v-row>
            <v-col>
              <h1>Create Department</h1>
            </v-col>
          </v-row>
          <v-row class="bg-white pa-4">
            <v-col cols="4">
              <h1>Department details</h1>
              <p>Department details and settings.</p>
            </v-col>
            <v-col cols="8">
              <v-row>
                <v-col>
                  <div class="input-section">
                    <label for="department-name" class="input-label">Name</label>
                    <v-text-field
                      id="department-name"
                      v-model="departmentName"
                      label="Department Name"
                      class="input-field"
                      full-width
                    ></v-text-field>
                  </div>
                  <div class="input-section">
                    <label for="department-email" class="input-label">Email</label>
                    <v-text-field
                      id="department-email"
                      v-model="departmentEmail"
                      label="Department Email"
                      class="input-field"
                      full-width
                    ></v-text-field>
                  </div>
                  <div class="input-section">
                    <label for="department-password" class="input-label">Password</label>
                    <v-text-field
                      id="department-password"
                      v-model="departmentPassword"
                      label="Password"
                      class="input-field"
                      type="password"
                      full-width
                    ></v-text-field>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <br />
          <hr />
          <br />
          <!-- Department Agents Section -->
          <v-row class="bg-white pa-4">
            <v-col cols="4">
              <h1>Department agents</h1>
              <p>List of agents assigned to the department.</p>
            </v-col>
            <v-col cols="8">
              <v-row>
                <v-col>
                  <div class="input-section">
                    <label for="department-role" class="input-label">Role</label>
                    <v-select
                      id="department-role"
                      v-model="selectedRole"
                      :items="roles"
                      label="Department Role"
                      class="input-field"
                      full-width
                    ></v-select>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <!-- Action Buttons -->
          <v-card-actions class="justify-end">
            <v-btn @click="cancel" color="grey" class="mr-2 rounded">Cancel</v-btn>
            <v-btn @click="createUser" color="success" class="mr-2 rounded">Create User</v-btn>
          </v-card-actions>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>
  
  <script>
      import { useToast } from 'vue-toastification'
      import { auth, db } from '../../firebase'
      import { createUserWithEmailAndPassword } from 'firebase/auth';
      import { doc, setDoc } from 'firebase/firestore' // <-- Import setDoc and doc
      import { RouterLink } from 'vue-router'

      export default {
        data() {
          return {
            drawer: true,
            departmentName: '',
            departmentEmail: '',
            departmentPassword: '',
            selectedRole: null,
            roles: ['Admin', 'Agent', 'Customer'],
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
          }
        },
        methods: {
          async createUser() {
            const toast = useToast()
            try {
              // Create user in Firebase Authentication
              const userCredential = await createUserWithEmailAndPassword(
                auth,
                this.departmentEmail,
                this.departmentPassword
              )

              // Save user data in Firestore
              await setDoc(doc(db, 'users', userCredential.user.uid), {
                name: this.departmentName,
                email: this.departmentEmail,
                role: this.selectedRole
              })

              toast.success('User created successfully!')
              // Redirect or show success message
              this.$router.push('/dashboard/admin/users')
            } catch (error) {
              console.error('Error creating user:', error)
              toast.error('Error creating user.')
            }
          },
          cancel() {
            const toast = useToast()
            toast.info('Action cancelled.')
            // Reset form or redirect
            this.$router.push('/dashboard/admin/users')
          },
          async logout() {
            try {
              await auth.signOut()
              this.$router.push('/login')
            } catch (error) {
              console.log(error.message)
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
p {
  color: #a0aec0;
  font-size: 0.875rem;
  margin-bottom: 15px;
}
.ma-2 {
  color: #a0aec0;
  font-size: 0.875rem;
}
</style>