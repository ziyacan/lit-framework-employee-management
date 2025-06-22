import { Router } from '@vaadin/router';

export const router = new Router(null);

export const routes = [
  {
    path: '/',
    component: 'employee-list-page',
    action: async () => {
      await import('../pages/employee-list.js');
    },
  },
  {
    path: '/employees/new',
    component: 'employee-form-page',
    action: async () => {
      await import('../pages/employee-form-page.js');
    },
  },
  {
    path: '/employees/edit/:id',
    component: 'employee-form-page',
    action: async () => {
      await import('../pages/employee-form-page.js');
    },
  },
   {
    path: '(.*)',
    component: 'not-found-page',
     action: async () => {
       await import('../pages/not-found.js');
     }
   },
];

router.setRoutes(routes); 