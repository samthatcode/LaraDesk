<template>
  <v-app>
    <!-- Main Content -->
    <v-main>
      <v-container fluid>
        <v-row class="align-center mb-4">
          <v-col cols="6">
            <h1 class="canned-replies-title">Tickets</h1>
          </v-col>
          <v-col cols="6" class="text-right">
            <v-btn color="primary" class="create-button" @click="goToCreateTicket">Create ticket</v-btn>
            <v-btn outlined class="ml-2">
              <v-icon right>mdi-filter</v-icon>Filters
            </v-btn>
            <v-btn icon class="ml-2" @click="fetchTickets">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <!-- Ticket Table -->
        <v-data-table :items="tickets" item-key="id">
          <template v-slot:top>
            <v-checkbox v-model="selectAll" @change="toggleSelectAll" label="Select All"></v-checkbox>
          </template>
          <template v-slot:item.avatar="{ item }">
            <v-avatar>
              <img :src="item.avatar || 'https://cdn.vuetifyjs.com/images/john.png'" alt="Avatar">
            </v-avatar>
          </template>
          <template v-slot:item.name="{ item }">
            <div>{{ item.name }}</div>
          </template>
          <template v-slot:item.email="{ item }">
            <div>{{ item.email }}</div>
          </template>
          <template v-slot:item.status="{ item }">
            <div>{{ item.status }}</div>
          </template>
          <template v-slot:item.priority="{ item }">
            <div>{{ item.priority }}</div>
          </template>
          <template v-slot:item.agent="{ item }">
            <div>{{ item.agent }}</div>
          </template>
          <template v-slot:item.createdAt="{ item }">
            <div>{{ item.createdAt }}</div>
          </template>
        </v-data-table>
        <!-- Pagination -->
        <v-row justify="space-between" align="center" class="pagination-container" v-if="tickets.length > 15">
          <div>
            <p>Showing 1 to 10 of {{ tickets.length }} results</p>
          </div>
          <v-pagination v-model="page" :length="Math.ceil(tickets.length / 10)"></v-pagination>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default {
  data() {
    return {
      page: 1,
      // selectAll: false,
      tickets: [],
    };
  },
  methods: {
    async fetchTickets() {
      try {
        const ticketsSnapshot = await getDocs(collection(db, 'tickets'));
        this.tickets = ticketsSnapshot.docs.map(doc => {
          const data = doc.data();
          console.log('Fetched ticket data:', data); // Log fetched data for debugging

          return {
            // id: doc.id,
            avatar: data.avatar || '', // Assuming avatar is a URL stored in Firestore
            name: data.name || 'Anonymous',
            email: data.email || 'No email provided',
            status: data.status || 'Unknown',
            priority: data.priority || '',
            agent: data.agent || '',
            createdAt: data.createdAt 
              ? new Date(data.createdAt.seconds * 1000).toLocaleString() 
              : 'N/A',
          };
        });
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    },
    toggleSelect(item) {
      item.selected = !item.selected;
    },
    goToCreateTicket() {
      this.$router.push({ name: 'create_ticket' });
    },
  },
  mounted() {
    this.fetchTickets();
  },
};
</script>

<style scoped>
.canned-replies-title {
  font-size: 1.5rem;
  color: #34495e;
}

.create-button {
  margin-left: 10px;
}

.pagination-container {
  margin-top: 20px;
}
</style>
