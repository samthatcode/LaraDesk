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
        <div class="canned-replies">
          <!-- Title and Button Row -->
          <v-row class="align-center mb-4">
            <v-col cols="6">
              <h1 class="canned-replies-title">Canned replies</h1>
            </v-col>
            <v-col cols="6" class="text-right">
              <v-btn color="primary" class="create-button"> Create canned reply </v-btn>
            </v-col>
          </v-row>

          <!-- Search, Sort, and Created At Row -->
          <v-row class="align-center mb-4">
            <v-col cols="4">
              <v-text-field
                v-model="search"
                label="Search"
                hide-details
                clearable
                dense
                append-icon="mdi-magnify"
                class="search-input"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="sort"
                :items="sortOptions"
                label="Sort"
                dense
                hide-details
                class="sort-select"
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="createdAt"
                :items="['Created at', 'Updated at']"
                label="Created at"
                dense
                hide-details
                class="created-at-select"
              ></v-select>
            </v-col>
          </v-row>

          <!-- Canned Replies List -->
          <v-list>
            <v-list-item
              v-for="reply in filteredReplies"
              :key="reply.title"
              @click="onReplyClick(reply)"
              class="reply-item"
              link
            >
              <v-list-item-content>
                <div class="reply-info">
                  <!-- Reply Details and Admin Section -->
                  <div class="reply-details">
                    <div class="reply-title">{{ reply.title }}</div>
                    <div
                      :class="reply.shared ? 'reply-shared' : 'reply-not-shared'"
                      style="font-size: 12px"
                    >
                      <v-icon small style="font-size: 12px; margin-right: 4px">
                        {{ reply.shared ? 'mdi-share-variant' : 'mdi-lock' }}
                      </v-icon>
                      <span>
                        The canned reply is {{ reply.shared ? 'shared' : 'not shared' }}
                      </span>
                    </div>
                  </div>
                  <div class="reply-admin" style="margin-right: 330px">
                    <v-avatar size="32" class="mr-2">
                      <img src="https://cdn.vuetifyjs.com/images/john.png" alt="Admin Avatar" />
                    </v-avatar>
                    <div class="admin-details">
                      <span class="admin-name" style="font-size: 16px">Admin</span>
                      <span class="admin-email" style="font-size: 14px">admin@admin.com</span>
                    </div>
                  </div>
                  <!-- Arrow Icon -->
                  <v-icon class="mr-5 arrow-icon" style="color: #b0bec5">mdi-chevron-right</v-icon>
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
    import { auth } from '../firebase'
    import { RouterLink } from 'vue-router'

    export default {
      data() {
        return {
          drawer: true,
          search: '',
          sort: '',
          createdAt: '',
          sortOptions: ['Title', 'Shared'],
          generalItems: [
            { title: 'Dashboard', icon: 'mdi-view-dashboard', route: "dashboard" },
            { title: 'Tickets', icon: 'mdi-ticket-outline', route: "tickets" },
            { title: 'Canned replies', icon: 'mdi-message-text-outline', route: "replies" },
          ],
          adminItems: [
            { title: 'Departments', icon: 'mdi-domain', route: 'admin/department' },
            { title: 'Labels', icon: 'mdi-label-outline', route: 'admin/label' },
            { title: 'Statuses', icon: 'mdi-check', route: 'admin/status' },
            { title: 'Priorities', icon: 'mdi-flag', route: 'admin/priorities' },
            { title: 'Users', icon: 'mdi-account-outline', route: 'admin/user' },
            { title: 'User roles', icon: 'mdi-account-key-outline', route: 'admin/user_role' },
            { title: 'Settings', icon: 'mdi-cog-outline', route: 'admin/setting' },
            { title: 'Translation', icon: 'mdi-translate', route: 'admin/translate' }
          ],
          cannedReplies: [
            { title: 'hi', shared: true },
            { title: 'Celeste Salazar', shared: true },
            { title: 'fgfdgzdfgh', shared: false },
            { title: 'Testing', shared: true },
            { title: 'sddcdc', shared: true }
          ]
        }
      },
      methods: {
        async logout() {
          try {
            await auth.signOut()
            this.$router.push('/')
          } catch (error) {
            console.log(error.message)
          }
        }
      }
    }
</script>
  
  <style scoped>
    .canned-replies {
      padding: 20px;
      background-color: #f5f7fb;
    }

    .canned-replies-title {
      font-size: 24px;
      color: #2c3e50;
      font-weight: bold;
    }

    .create-button {
      text-transform: none;
    }

    .search-input,
    .sort-select,
    .created-at-select {
      background-color: white;
    }

    .reply-item {
      background-color: #ffffff;
      border-bottom: 1px solid #e0e0e0;
      padding: 16px 0;
      cursor: pointer;
    }

    .reply-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .reply-details {
      display: flex;
      flex-direction: column;
      width: 50%;
    }

.reply-title {
  font-size: 18px;
  color: #2c3e50;
  font-weight: 500;
}

.reply-shared {
  color: #4caf50;
}

.reply-not-shared {
  color: #ff5252;
}

.reply-admin {
  display: flex;
  align-items: center;
  justify-content: center; /* Center the admin section */
}

.admin-details {
  display: flex;
  flex-direction: column;
  text-align: center; /* Center text within the admin section */
}

.admin-name {
  font-size: 14px;
  color: #2c3e50;
}

.admin-email {
  font-size: 12px;
  color: #b0bec5;
}

.arrow-icon {
  margin-left: auto;
}
@media (max-width: 768px) {
  .create-button {
    width: 100%; /* Full width on smaller screens */
    justify-content: center;
  }

  .text-right {
    justify-content: center;
  }

  .canned-replies-title {
    font-size: 18px;
    text-align: center;
  }

  .reply-info {
    flex-direction: column;
    align-items: flex-start;
  }

  .reply-details {
    width: 100%;
  }

  .admin-details {
    text-align: left; /* Align admin details to the left */
  }
}
/* Styles for responsiveness and matching the uploaded image */
@media (max-width: 600px) {
  .canned-replies-title {
    font-size: 20px;
  }

  .create-button {
    font-size: 14px;
    padding: 8px 12px;
  }

  .reply-item {
    padding: 12px 0;
  }

  .reply-title {
    font-size: 16px;
  }

  .reply-admin {
    display: none; /* Hide the admin details on smaller screens */
  }

  .arrow-icon {
    font-size: 18px;
  }
}

@media (min-width: 600px) and (max-width: 960px) {
  .reply-admin {
    margin-right: 100px; /* Adjust the margin for medium screens */
  }
}
    @media (min-width: 961px) {
      .reply-admin {
        margin-right: 330px; /* Full margin as per your original code */
      }
    }
</style>