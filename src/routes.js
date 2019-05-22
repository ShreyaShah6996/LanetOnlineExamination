import Index from "views/Index.jsx";
import Register from "views/examples/Register.jsx";
import Login from "views/examples/Login.jsx";
import User from './Admin/User/User';
import Technology from "./Admin/TechnologyQuestion/Technology";
import Test from './Admin/Test/Test';
import TestQuestion from './Admin/TestQuestion/TestQuestion';

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User",
    icon: "ni ni-badge text-primary",
    component: User,
    layout: "/admin"
  },
  {
    path: "/technology",
    name: "Technology",
    icon: "ni ni-books text-orange",
    component: Technology,
    layout: "/admin"
  },
  {
    path: "/test",
    name: "Test",
    icon: "ni ni-paper-diploma text-green",
    component: Test,
    layout: "/admin"
  },
  {
    path: "/testquestion",
    name: "Test Question",
    icon: "ni ni-collection text-red",
    component: TestQuestion,
    layout: "/admin"
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: Profile,
  //   layout: "/admin"
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Tables,
  //   layout: "/admin"
  // },
  {
    path: "/login",       
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",    
    component: Register,
    layout: "/auth"
  }
];
export default routes;
