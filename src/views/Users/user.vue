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
          <div class="dashboard">
            <v-row>
              <v-col>
                <h1>Users</h1>
              </v-col>
              <v-col cols="auto">
                <v-btn @click="handleButtonClick" color="primary" class="mr-4 rounded">Create User</v-btn>
              </v-col>
            </v-row>
            <v-row >
                <v-col>
                    <v-card>
                        <!-- <v-card-title class="m-2">
                            <div class="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200 sm:px-6">
                                <div>
                                    <label for="search" class="sr-only"></label>
                                    <div class="flex rounded-md shadow-sm">
                                        <div class="relative flex-grow focus-within:z-10">
                                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-event-none"></div>
                                            <input type="text" id="search" placeholder="Search" class="form-input block w-full rounded-none rounded-l-md pl-10 text-sm transition">
                                        </div>
                                        <span class="relative inline-flex shadow-sm rounded-r-md">
                                            <button type="button" class="relative-ml-px inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus-outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700">
                                                <span class="ml-2">Sort</span>
                                            </button>
                                            <select name="" id="sortBy" class="ml-px block form-select w-full pl-3 pr-9 py-2 rounded-l-none rounded-r-md border border-gray-3 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus-outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 ease-in-out duration-150"></select>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </v-card-title> -->
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
                                            <!-- Column 1: Name and Email -->
                                            <v-col cols="6" md="6">
                                              <div class="text-sm font-medium text-blue-600">
                                                {{ user.name }}
                                              </div>
                                              <div class="mt-2 text-sm text-gray-500">
                                                <span class="truncate">{{ user.email }}</span>
                                              </div>
                                            </v-col>

                                            <!-- Column 2: Role and Status -->
                                            <v-col cols="6" md="6" class="d-flex justify-end">
                                              <div class="text-sm text-gray-900">
                                                The user has the role: <b>{{ user.role }}</b>
                                              </div>
                                              <div class="mt-2 text-sm text-gray-500">
                                                User is activated
                                              </div>
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
 import { db, auth, createUserWithEmailAndPassword } from '../../firebase';
 import { collection, getDocs } from 'firebase/firestore';


  export default {
    data() {
      return {
        drawer: true, 
        search: '',
        sort: '',
        filter: '',
        sortOptions: ['Date', 'Name', 'Priority'],
        filterOptions: ['Name', 'Email', 'Role', 'Status', 'Created at'],
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
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        this.users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    methods: {
      async logout() {
        try {
          await auth.signOut();
          this.$router.push('/login');
        } catch (error) {
          console.log(error.message);
        }
      },
      async createUser(email, password) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          console.log('User created:', userCredential.user);
        } catch (error) {
          console.error('Error creating user:', error);
        }
      },
      handleButtonClick() {
        // Navigate to the "Add Department" page
        this.$router.push({ name: 'user_new' });
      }
    }
  
  };
  </script>
  
  <style scoped>
  .dashboard {
    /* margin: 30px; */
    padding: 30px;
    background-color: #f5f7fb;
    /* border-radius: 10px; */
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
  </style>
  