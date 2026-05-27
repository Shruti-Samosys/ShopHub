import React from 'react'
import { createContext } from 'react';
import { useState } from 'react';
export const AuthContext = React.createContext();
export default function AuthProvider({ children }) {
    const [user , setUser] = useState(localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null);

     function signup(email, password) {
        const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
        if(users.find(u => u.email === email)) {
            alert("User already exists with this email");
            return;
        }
        const newUser = { email, password };
        users.push(newUser);    
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        setUser({email});
    }

    function login(email, password) {
        const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
        const user = users.find(u => u.email === email && u.password === password);
        if(user) {
            localStorage.setItem('currentUser', JSON.stringify({email: user.email}));
            setUser({email});
         } else {
            alert("Invalid email or password");
         }
    }

    function logout() {
        setUser(null);
        localStorage.removeItem('currentUser');
        // localStorage.removeItem('users');

    }
  return (
    <AuthContext.Provider value={{ user, setUser, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}