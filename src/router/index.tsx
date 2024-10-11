import { createBrowserRouter, Navigate } from "react-router-dom";
import Chat from "@/views/chat";
import Login from "@/views/login";
import Home from "@/views/home";

const router = createBrowserRouter([

  {
    path: '/',
    element: <Navigate to='/home'  replace/>
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/chat',
    element: <Chat />
  }
])

export default router

