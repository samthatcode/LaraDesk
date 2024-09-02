// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import LandPage from '../components/LandPage.vue';
import Signup from '../components/SignUp.vue';
import Dashboard from '../components/Dashboard/Dashboard.vue';
import DashboardContent from '../components/Dashboard/DashboardContent.vue';
import Tickets from '../components/Ticket/Tickets.vue';
import CreateTicket from '../components/Ticket/create_ticket.vue'
import CannedReplies from '../components/CannedReplies.vue';
import Departments from '../views/Departments/department.vue';
import AddDept from '../views/Departments/add_dept.vue'
import Users from '../views/Users/user.vue'
import UserNew from '../views/Users/user_new.vue'
import UsersRoles from '../views/User_roles/user_roles.vue'
import UsersRolesAdd from '../views/User_roles/user_roles_add.vue'
import Label from '../views/Labels/label.vue'
import priorities from '../views/priorities/priorities.vue'
import EditPriorities from '../views/priorities/edit_priorities.vue'
import Settings from '../views/Settings/settings.vue'
import SettingsContent from '../views/Settings/settingsContent.vue'
import General from '../views/Settings/general.vue'
import Outgoing_mail from '../views/Settings/outgoing_mail.vue'
import Translations from '../views/Translations/translations.vue'
import statuses from '../views/Status/status.vue'
import EditStatus from '../views/Status/edit_status.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const routes = [
  {
    path: '/',
    name: 'Landing Page',
    component: LandPage,
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: DashboardContent,
      },
      {
        path: 'tickets',  // Correctly formatted path
        name: 'tickets',
        component: Tickets
      },
      {
        path: 'replies',  // Correctly formatted path
        name: 'replies',
        component: CannedReplies
      }
    ]
  },
  {
    path: '/dashboard/tickets/new',
    name: 'create_ticket',
    component: CreateTicket,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/department',
    name: 'departments',
    component: Departments,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/department/add',
    name: 'add_dept',
    component: AddDept,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard/admin/users',
    name: 'users',
    component: Users,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard/admin/users_roles',
    name: 'users_roles',
    component: UsersRoles,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard/admin/users_roles_add',
    name: 'user_roles_add',
    component: UsersRolesAdd,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard/admin/users/new',
    name: 'user_new',
    component: UserNew,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard/admin/label',
    name: 'label',
    component: Label,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard/admin/priorities',
    name: 'priorities',
    component: priorities,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard/admin/priorities/edit/:priorityId',
    name: 'edit_priorities',
    component: EditPriorities,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard/admin/settings',
    name: 'SettingsContent',
    component: SettingsContent,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',  // Route to match '/dashboard/admin/settings/general'
        name: 'settings',
        component: Settings,
      },
      {
        path: 'general',  // Route to match '/dashboard/admin/settings/general'
        name: 'general',
        component: General,
      },
      {
        path: 'outgoing_mail',
        name: 'outgoing_mail',
        component: Outgoing_mail,
      }
      // Add other settings related child routes here
    ]
  },
  {
    path: '/dashboard/admin/translate',
    name: 'Translations',
    component: Translations,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard/admin/status',
    name: 'statuses',
    component: statuses,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard/admin/status/edit',
    name: 'edit_status',
    component: EditStatus,
    meta: { requiresAuth: true }
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const auth = getAuth();

  // Wait for Firebase Auth to initialize before making any route decisions
  onAuthStateChanged(auth, (user) => {
    if (to.meta.requiresAuth && !user) {
      // If the route requires authentication and the user is not logged in, redirect to the login page
      next('/login');
    } else {
      // If the user is logged in or the route doesn't require authentication, proceed as normal
      next();
    }
  });
});



export default router;
