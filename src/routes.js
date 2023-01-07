import AllContacts from "./components/allContacts";
import UsContacts from "./components/usContacts";
import Home from "./pages/home";

export default [
    {
        path: "/",
        name: "All",
        icon: "",
        component: Home,
        layout: "",
        display: false,
    },
    {
        path: "/allContacts",
        name: "All",
        icon: "",
        component: AllContacts,
        layout: "",
        display: false,
    },
    {
        path: "/usContacts",
        name: "US",
        icon: "",
        component: UsContacts,
        layout: "",
        display: false,
    },
]