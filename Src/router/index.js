import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login/Login'
import Confirm from '../views/Login/confirm'
import Role from '../views/Users/role'
import Category from '../views/Category/category'
import Users from '../views/Users/users'
import Group from '../views/Group/group'
import GetGroup from '../views/Group/getGroup'
import UpdateGroup from '../views/Group/updateGroup'
import Supplier from '../views/Manegment/supplier'
import GetSupplier from '../views/Manegment/getSuplier'
import Orders from '../views/Orders/orders'
import GetOrder from '../views/Orders/getOrder'
import Products from '../views/products/products'
import GetProducts from '../views/products/getProducts'
import GetUsers from '../views/Users/getUsers'
import GetCategory from '../views/Category/getCategory'
import QR from '../views/Qr/Qr'
import GetQR from '../views/Qr/getQr'
import UpdateQR from '../views/Qr/updateQr'
import UpdateCategory from '../views/Category/updateCategory'
import UpdateSupplier from '../views/Manegment/updateSupplier'
import UpdateOrders from '../views/Orders/updateOrders'
import UpdateProducts from '../views/products/updateProducts'
import UpdateUsers from '../views/Users/updateUsers'
import GetRole from '../views/Users/getRole'
import UpdateRole from '../views/Users/updateRole'
import Page from '../views/Pages/page'
import UpdatePage from '../views/Pages/updatePage'
import GetPage from '../views/Pages/getPage'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: "/confirm",
    name: "confirm",
    component: Confirm
  },
  {
    path: "/role",
    name: "role",
    component: Role
  },
  {
    path: "/getRole",
    name: "getRole",
    component: GetRole
  },
  {
    path: "/updateRole/:id",
    name: "updateRole",
    component: UpdateRole
  },
  {
    path: "/category",
    name: "category",
    component: Category
  },
  {
    path: "/users",
    name: "users",
    component: Users
  },
  {
    path: "/group",
    name: "group",
    component: Group
  },
  {
    path: "/getOrder",
    name: "getOrder",
    component: GetOrder
  },
  {
    path: "/getProducts",
    name: "getProducts",
    component: GetProducts
  },
  {
    path: "/supplier",
    name: "supplier",
    component: Supplier
  },
  {
    path: "/getSupplier",
    name: "getSupplier",
    component: GetSupplier
  },
  {
    path: "/orders",
    name: "orders",
    component: Orders
  },
  {
    path: "/products",
    name: "products",
    component: Products
  },
  {
    path: "/getUsers",
    name: "getUsers",
    component: GetUsers
  },
  {
    path: "/getGroup",
    name: "getGroup",
    component: GetGroup
  },
  {
    path: "/getCategory",
    name: "getCategory",
    component: GetCategory
  },
  {
    path: "/updateCategory/:id",
    name: "updateCategory",
    component: UpdateCategory
  },
  {
    path: "/updateGroup/:id",
    name: "updateGroup",
    component: UpdateGroup
  },
  {
    path: "/updateOrders/:id",
    name: "updateOrders",
    component: UpdateOrders
  },
  {
    path: "/updateProducts/:id",
    name: "updateProducts",
    component: UpdateProducts
  },
  {
    path: "/updateSupplier/:id",
    name: "updateSupplier",
    component: UpdateSupplier
  },
  {
    path: "/updateQr/:id",
    name: "updateQr",
    component: UpdateQR
  },
  {
    path: "/updateGroup/:id",
    name: "updateGroup",
    component: UpdateGroup
  },
  {
    path: "/updateUsers/:id",
    name: "updateUsers",
    component: UpdateUsers
  },
  {
    path: "/getQr",
    name: "getQr",
    component: GetQR
  },
  {
    path: "/Qr",
    name: "Qr",
    component: QR
  },
  {
    path: "/page",
    name: "page",
    component: Page
  },
  {
    path: "/getPage",
    name: "getPage",
    component: GetPage
  },
{
    path: "/updatePage/:id",
    name: "updatePage",
    component: UpdatePage
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
];


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
