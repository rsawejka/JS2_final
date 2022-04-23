import Vue from 'vue';
import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/home';
import Shop from './components/shop';
import EditProduct from './components/editProduct';
import AddProduct from './components/addProduct';
import Cart from './components/cart';
import indevidualProduct from './components/indevidualProduct';
import UserList from './components/userList';
import SignUp from './components/signUp';
import GetPayment from './components/getPayment';
import ConfirmOrder from './components/confirmOrder';
import EditProfile from './components/editProfile';
import NotFound from "./components/notFound.vue";


Vue.use(createRouter)


const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/shop', name: 'shop', component: Shop },
    { path: '/cart', name: 'cart', component: Cart },
    { path: '/addProduct', name: 'addProduct', component: AddProduct },
    { path: '/editProduct/:id', name: 'editProduct', component: EditProduct },
    { path: '/indevidualProduct:id', name: 'indevidualProduct', component: indevidualProduct, props: true },
    { path: '/users', name: 'users', component: UserList },
    { path: '/signUp', name: 'signUp', component: SignUp },
    { path: '/getPayment', name: 'getPayment', component: GetPayment },
    { path: '/confirmOrder', name: 'confirmOrder', component: ConfirmOrder },
    { path: '/editProfile', name: 'editProfile', component: EditProfile },
    { path: '*', component: NotFound }

];

const router = createRouter({
    history: createWebHistory('/base-directory/'),
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router