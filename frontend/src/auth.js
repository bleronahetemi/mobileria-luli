import { useSyncExternalStore } from 'react';

const KEYS = ['token', 'username', 'userId', 'role'];
const listeners = new Set();

function read() {
  return {
    token: localStorage.getItem('token'),
    username: localStorage.getItem('username'),
    userId: localStorage.getItem('userId'),
    role: localStorage.getItem('role'),
    isLoggedIn: !!localStorage.getItem('token'),
    isAdmin: localStorage.getItem('role') === 'admin'
  };
}

// useSyncExternalStore krahason referencat, ndaj snapshot-i duhet te jete stabil.
let snapshot = read();

function refresh() {
  snapshot = read();
  listeners.forEach(listener => listener());
}

function subscribe(callback) {
  listeners.add(callback);

  // Ndryshimet nga tabs te tjere.
  const onStorage = () => {
    snapshot = read();
    callback();
  };
  window.addEventListener('storage', onStorage);

  return () => {
    listeners.delete(callback);
    window.removeEventListener('storage', onStorage);
  };
}

export function saveAuth({ token, username, userId, role }) {
  localStorage.setItem('token', token);
  localStorage.setItem('username', username);
  localStorage.setItem('userId', userId);
  localStorage.setItem('role', role);
  refresh();
}

export function clearAuth() {
  KEYS.forEach(key => localStorage.removeItem(key));
  refresh();
}

export function getToken() {
  return localStorage.getItem('token');
}

export function useAuth() {
  return useSyncExternalStore(subscribe, () => snapshot);
}
