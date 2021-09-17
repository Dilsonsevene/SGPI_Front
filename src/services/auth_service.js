import { httpFile, http } from "./http_service";
import jwt from 'jsonwebtoken';
import store from '../store';

export function register(user) {
    return httpFile().post('/auth/register', user);
}

export function login(data) {
    return http().post('/auth/login', data)    
}

export function setToken(user) {
    const token = jwt.sign({ user: user }, 'laravelvuespa2021');
    localStorage.setItem('Laravel-vue-spa-token', token);
    store.dispatch('authenticate',user.user);
}

export function isLoggedIn() {
    const token = localStorage.getItem('Laravel-vue-spa-token');
    return token != null;
}

export function logout() {
    http().get('/auth/logout');
    localStorage.removeItem('Laravel-vue-spa-token');
}

export function getAcessToken() {
    const token = localStorage.getItem('Laravel-vue-spa-token');
    if (!token) {
        return null;
    }

    const tokenData = jwt.decode(token);
    return tokenData.user.access_token;
}

export function getUserRole() {
    const token = localStorage.getItem('Laravel-vue-spa-token');
    if (!token) {
        return null;
    }

    const tokenData = jwt.decode(token);
    return tokenData.user.user.role;
}

export function getProfile() {
    return http().get('/auth/profile');
}

