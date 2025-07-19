// import "./App.css";
// import axios from "axios";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Register from "./pages/auth/register/register";
// import Login from "./pages/auth/login/login";
// import Home from "./pages/homepage/home";
// import Layout from "./layout";
// import Favorites from "./pages/favorites/favorites";
// import Movie from "./pages/movies/movie";
// import WatchLists from "./pages/watchLists/watchLists";
// import Search from "./pages/search/search";
// import Profile from "./pages/Profile/Profile";

// function App() {
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Layout />,
//       children: [
//         {
//           path: "/",
//           element: <Home />,
//         },
//         {
//           path: "/favorites",
//           element: <Favorites />,
//         },
//         {
//           path: "/movie/:id",
//           element: <Movie />,
//         },
//         {
//           path: "/profile",
//           element: <Profile />,
//         },
//         {
//           path: "/watchlist",
//           element: <WatchLists />,
//         },
//         {
//           path: "/search",
//           element: <Search />,
//         },
//         {
//           path: "/register",
//           element: <Register />,
//         },
//         {
//           path: "/login",
//           element: <Login />,
//         },
//       ],
//     },
//     {},
//   ]);
//   return <RouterProvider router={router} />;
// }

// export default App;

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/auth/register/register";
import Login from "./pages/auth/login/login";
import Home from "./pages/homepage/home";
import Layout from "./layout";
import Favorites from "./pages/favorites/favorites";
import Movie from "./pages/movies/movie";
import WatchLists from "./pages/watchLists/watchLists";
import Search from "./pages/search/search";
import Profile from "./pages/Profile/Profile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/favorites", element: <Favorites /> },
        { path: "/movie/:id", element: <Movie /> },
        { path: "/profile", element: <Profile /> },
        { path: "/watchlist", element: <WatchLists /> },
        { path: "/search/:searchTerm", element: <Search /> },
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
