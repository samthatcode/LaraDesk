// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import LandPage from '../components/LandPage.vue';
import Signup from '../components/SignUp.vue';
import Dashboard from '../components/Dashboard.vue';
import Tickets from '../components/Tickets.vue';
import CannedReplies from '../components/CannedReplies.vue';
import Departments from '../views/Departments/department.vue';
import AddDept from '../views/Departments/add_dept.vue'
import Users from '../views/Users/user.vue'
import UserNew from '../views/Users/user_new.vue'
import UsersRoles from '../views/User_roles/user_roles.vue'
import UsersRolesAdd from '../views/User_roles/user_roles_add.vue'
import Label from '../views/Labels/label.vue'
import priorities from '../views/priorities/priorities.vue'
import Settings from '../views/Settings/settings.vue'
import Translations from '../views/Translations/translations.vue'
import statuses from '../views/Status/status.vue'
import EditStatus from '../views/Status/edit_status.vue'
import { auth } from '../firebase';

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
        path: 'tickets',  // Change from '/dashboard/tickets' to 'tickets'
        name: 'tickets',
        component: Tickets
      },
      {
        path: 'replies',  // Change from '/dashboard/replies' to 'replies'
        name: 'replies',
        component: CannedReplies
      }
    ]
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
    path: '/dashboard/admin/settings',
    name: 'Settings',
    component: Settings,
    meta: { requiresAuth: true }
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
  const loggedIn = !!auth.currentUser;
  console.log(`Navigating to: ${to.name}, loggedIn: ${loggedIn}`);
  if (to.meta.requiresAuth && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});



export default router;
