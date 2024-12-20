"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../components/Sidebar";
import store from "../store";
import { setLoggedIn, setLoggedOut } from "../Reducer/AuthSlice";
import "./globals.css";

function RootLayoutContent({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Check session storage for login status
    const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";

    if (loggedIn) {
      dispatch(setLoggedIn());
    } else {
      dispatch(setLoggedOut());
    }

    setAuthChecked(true); // Mark authentication check as complete
  }, [dispatch]);

  useEffect(() => {
    if (!authChecked) return; // Wait until auth check is complete

    const publicRoutes = ["/login", "/Register"];

    if (!isLoggedIn && !publicRoutes.includes(pathname)) {
      // Redirect unauthenticated users to /login
      router.replace("/login");
    } else if (isLoggedIn && publicRoutes.includes(pathname)) {
      // Redirect authenticated users away from public routes
      router.replace("/");
    }
  }, [isLoggedIn, pathname, router, authChecked]);

  // Prevent rendering until auth status is checked
  if (
    !authChecked ||
    (!isLoggedIn && pathname !== "/login" && pathname !== "/Register")
  ) {
    return <div>Loading...</div>; // Show a loading state until redirection logic is resolved
  }

  const showSidebar = isLoggedIn && !["/login", "/Register"].includes(pathname);

  return (
    <div className="flex">
      {showSidebar && <Sidebar />}
      <main className="flex-grow">{children}</main>
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <RootLayoutContent>{children}</RootLayoutContent>
        </Provider>
      </body>
    </html>
  );
}
