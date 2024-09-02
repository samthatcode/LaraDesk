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
        <v-toolbar-title>LARADESK</v-toolbar-title>
  
        <v-spacer></v-spacer>
  
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
  
          <v-list-item v-for="item in generalItems" :key="item.title" link>
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
              <v-list-item-title class="text-uppercase text-xs text-muted">Administration</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
  
          <v-list-item v-for="item in adminItems" :key="item.title" link>
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
  
      <!-- Main Content Area -->
      <v-main>
        <v-container fluid >
            <div class="dashboard">
                <v-row>
                    <v-col>
                        <h2>Create ticket</h2>
                    </v-col>
                </v-row>
                <v-row class="bg-white pa-4">
                    <v-col cols="4">
                        <h1>Ticket details</h1>
                        <p>Ticket details and classification.</p>
                    </v-col>
                    <v-col cols="8">
                        <v-row>
                            <v-col>
                                <div class="input-section">
                                    <label for="customer" class="input-label">Customer</label>
                                    <v-select
                                        id="customer"
                                        :items="['Admin', 'Agent', 'Customer']"
                                        v-model="ticket.customer"
                                        placeholder="Select an option"
                                        outlined
                                    />
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <div class="input-section">
                                    <label for="subject" class="input-label">Subject</label>
                                    <v-text-field
                                        id="subject"
                                        v-model="ticket.subject"
                                        placeholder="Subject"
                                        outlined
                                    />
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <div class="input-section">
                                    <label for="department" class="input-label">Department</label>
                                    <v-select
                                        id="department"
                                        :items="departments"
                                        v-model="ticket.department"
                                        placeholder="Select an option"
                                        outlined
                                    />
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <div class="input-section">
                                    <label for="status" class="input-label">Status</label>
                                    <v-select
                                        id="status"
                                        :items="statuses"
                                        v-model="ticket.status"
                                        placeholder="Select an option"
                                        outlined
                                    />
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <div class="input-section">
                                    <label for="priority" class="input-label">Priority</label>
                                    <v-select
                                        id="priority"
                                        :items="priorities"
                                        v-model="ticket.priority"
                                        placeholder="Select an option"
                                        outlined
                                    />
                                </div>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row class="pt-6">
                    <v-col class="d-flex justify-end">
                        <v-btn color="grey" @click="cancel">Cancel</v-btn>
                        <v-btn color="success" class="ml-4" @click="submitTicket" >Edit Ticket</v-btn>
                    </v-col>
                </v-row>
            </div>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
import { db } from '../../firebase';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { useToast } from 'vue-toastification';
import { getAuth } from 'firebase/auth';

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
      departments: [],
      statuses: ['Unpaid', 'Paid', 'Mail Sent', 'Rejected'],
      priorities: [],
      ticket: {
        customer: '',
        subject: '',
        department: '',
        status: '',
        priority: '',
        createdAt: null,
      },
    };
  },
  methods: {
    async fetchDepartments() {
      try {
        const departmentsSnapshot = await getDocs(collection(db, 'departments'));
        this.departments = departmentsSnapshot.docs.map(doc => doc.data().name);
      } catch (error) {
        this.showError('Error fetching departments');
        console.error('Error fetching departments:', error);
      }
    },
    async fetchStatuses() {
      try {
        const statusesSnapshot = await getDocs(collection(db, 'statuses'));
        this.statuses.push(...statusesSnapshot.docs.map(doc => doc.data().name));
      } catch (error) {
        this.showError('Error fetching statuses');
        console.error('Error fetching statuses:', error);
      }
    },
    async fetchPriorities() {
      try {
        const prioritiesSnapshot = await getDocs(collection(db, 'priorities'));
        this.priorities = prioritiesSnapshot.docs.map(doc => doc.data().name);
      } catch (error) {
        this.showError('Error fetching priorities');
        console.error('Error fetching priorities:', error);
      }
    },
    cancel() {
      const toast = useToast();
      toast.info('Ticket creation canceled', {
        timeout: 3000,
      });
      this.$router.push('/dashboard/tickets');
    },
    async submitTicket() {

      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        this.ticket.name = user.displayName || 'Anonymous';
        this.ticket.email = user.email;
        this.ticket.uid = user.uid;
        this.ticket.createdAt = serverTimestamp();

        const toast = useToast();

        try {
          await addDoc(collection(db, 'tickets'), this.ticket);
          toast.success('Ticket created successfully!', {
            timeout: 3000,
          });
          this.$router.push('/dashboard/tickets');
        } catch (error) {
          toast.error('Error creating ticket', {
            timeout: 3000,
          });
          console.error("Error creating ticket:", error);
        }
      } else {
        const toast = useToast();
        toast.error('User not authenticated!', {
          timeout: 3000,
        });
      }
    },
    showSuccess(message) {
      useToast().success(message);
    },
    showError(message) {
      useToast().error(message);
    },
    showInfo(message) {
      useToast().info(message);
    },
  },
  mounted() {
    this.fetchDepartments();
    this.fetchStatuses();
    this.fetchPriorities();
  }
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
  
  .input-label {
    font-size: 15px;
    color: #4a5568;
    margin-bottom: 8px;
  }
  
  .bg-white {
    background-color: #ffffff;
  }
  
  p {
    color: #a0aec0;
    font-size: .875rem;
    margin-bottom: 15px;
  }
  
  .pt-6 {
    padding-top: 1.5rem;
  }
  
  .d-flex {
    display: flex;
  }
  
  .justify-end {
    justify-content: flex-end;
  }
  </style>
  