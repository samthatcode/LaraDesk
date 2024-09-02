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
        <v-spacer>
          <button @click="logout">Sign Out</button>
        </v-spacer>
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
                <h1>Edit priority</h1>
              </v-col>
            </v-row>
            <v-row class="bg-white pa-4">
              <!-- Column 1: Takes up 3 columns -->
              <v-col cols="4">
                <h1>Priority details</h1>
                <p>Priority details and customization.</p>
              </v-col>
              <!-- Column 2: Takes up 9 columns -->
              <v-col cols="8">
                <v-row>
                    <v-col>
                        <div class="input-section">
                            <label for="priority-title" class="input-label">Name</label>
                            <v-text-field id="priority-title" v-model="priority_title" class="input-field" />
                        </div>
                        <div class="input-section">
                            <label for="priority-number" class="input-label">Value</label>
                            <v-text-field id="priority-number" v-model="priority_number" class="input-field" />
                        </div>
                    </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row class="pt-6">
              <v-col class="d-flex justify-end">
                <v-btn color="grey" @click="cancel">Cancel</v-btn>
                <v-btn color="success" class="ml-4" @click="editStatus">Edit Priority</v-btn>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
    import { db } from '../../firebase';
    import { doc, getDoc, updateDoc } from 'firebase/firestore';
    import { useToast } from 'vue-toastification';
    

  export default {
    data() {
      return {
        priorityId: this.$route.params.priorityId,
        drawer: true,
        priority_title: '',
        priority_number: '',
        generalItems: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard', route: "dashboard" },
          { title: 'Tickets', icon: 'mdi-ticket-outline', route: "tickets" },
          { title: 'Canned replies', icon: 'mdi-message-text-outline', route: "replies" },
        ],
        adminItems: [
          { title: 'Departments', icon: 'mdi-domain', route: 'admin/department' },
          { title: 'Labels', icon: 'mdi-label-outline', route: 'dashboard/admin/label' },
          { title: 'Statuses', icon: 'mdi-check', route: 'dashboard/admin/status' },
          { title: 'Priorities', icon: 'mdi-flag', route: 'dashboard/admin/priorities' },
          { title: 'Users', icon: 'mdi-account-outline', route: 'dashboard/admin/users' },
          { title: 'User roles', icon: 'mdi-account-key-outline', route: 'dashboard/admin/users_roles' },
          { title: 'Settings', icon: 'mdi-cog-outline', route: 'dashboard/admin/settings' },
          { title: 'Translation', icon: 'mdi-translate', route: 'dashboard/admin/translate' },
        ],
      };
    },
    async created() {
        try {
            if (this.priorityId) {
                const priorityRef = doc(db, 'priorities', this.priorityId);
                const priorityDoc = await getDoc(priorityRef);
                if (priorityDoc.exists()) {
                    const priorityData = priorityDoc.data();
                    this.priority_title = priorityData.title || '';
                    this.priority_number = priorityData.number || '';
                } else {
                    console.error('Priority document not found!');
                    this.$router.push('/dashboard/admin/priorities'); // Redirect if not found
                }
            } else {
                console.error('Priority ID is undefined!');
                this.$router.push('/dashboard/admin/priorities'); // Redirect if no ID
            }
        } catch (error) {
            console.error('Error fetching priority:', error);
        }
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
        const toast = useToast()
        toast.info('Priority edit canceled', {
            timeout: 3000,
        });
        this.$router.push('/dashboard/admin/priorities');
      },
      async editStatus() {
        const toast = useToast();
            try {
                const priorityRef = doc(db, 'priorities', this.priorityId);
                await updateDoc(priorityRef, {
                title: this.priority_title,
                number: this.priority_number,
                // Add other fields here if necessary
                });
                toast.success('Priority updated successfully!', {
                timeout: 3000,
                });
                this.$router.push('/dashboard/admin/priorities');
            } catch (error) {
                toast.error('Failed to update priority.', {
                timeout: 3000,
                });
                console.error(error);
            }
        },
    },
  };
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
    background-color: #6200ea !important;
  }
  
  .custom-radio .v-input--radio .v-input--radio__inner--active {
    border-color: #6200ea !important;
  }
  
  .custom-radio .v-input--radio .v-input--radio__input:checked + .v-input--radio__background .v-icon {
    color: #6200ea !important;
  }
  
  .custom-radio .v-input--radio .v-input--radio__input:hover + .v-input--radio__background .v-icon {
    color: #3700b3 !important;
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
    font-size: .875rem;
    margin-bottom: 15px;
  }
  
  .ma-2 {
    color: #a0aec0;
    font-size: .875rem;
  }
  </style>
  