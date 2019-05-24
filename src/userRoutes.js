import FirstPage from './User/FirstPage/firstPage';
import TestDescription from "./User/Test/TestDescription";
import Question from "./User/Test/Question";
var userRoutes = [
    {
      path: "/test",
      icon: "ni ni-planet text-blue",
      component: FirstPage,
      layout: "/user"
    },
    {
        path: "/testDescription/:id",
        icon: "ni ni-planet text-blue",
        component: TestDescription,
        layout: "/user"
    },
    {
        path: "/question/:id",
        icon: "ni ni-planet text-blue",
        component: Question,
        layout: "/user"
    },
];
export default userRoutes;
