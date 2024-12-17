// layout.js
"use client";

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from "next/navigation";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from "../components/Sidebar";
import store from "../store";
import { setLoggedIn, setLoggedOut } from '../Reducer/AuthSlice';
import "./globals.css";

function RootLayoutContent({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Check session storage for login status
    const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    if (loggedIn) {
      dispatch(setLoggedIn());
    } else {
      dispatch(setLoggedOut());
    }

    // Mark authentication check as complete
    setAuthChecked(true);
  }, [dispatch]);

  useEffect(() => {
    if (!authChecked) return; // Wait until auth check is complete

    const protectedRoutes = ['/'];
    const publicRoutes = ['/login', '/register'];

    // Redirect to login if not logged in and trying to access a protected route
    if (!isLoggedIn && protectedRoutes.includes(pathname)) {
      router.replace("/login");
      return;
    }

    // Redirect to home if logged in and trying to access a public route
    if (isLoggedIn && publicRoutes.includes(pathname)) {
      router.replace("/");
      return;
    }
  }, [isLoggedIn, pathname, router, authChecked]);

  if (!authChecked) {
    return <div>Loading...</div>; // Render a loading state while checking auth
  }

  const showSidebar = isLoggedIn && !["/login", "/register"].includes(pathname);

  return (
    <html lang="en">
      <body>
        <div className="flex">
          {showSidebar && <Sidebar />}
          <main className="flex-grow">{children}</main>
        </div>
      </body>
    </html>
  );
}

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <RootLayoutContent>{children}</RootLayoutContent>
    </Provider>
  );
}
