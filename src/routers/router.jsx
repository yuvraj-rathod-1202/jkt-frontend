import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import AdminApp from "../AdminApp";
import SingleItem from "../pages/items/SingleItem";
import Brands from "../pages/brands/Brands";
import Categories from "../pages/categories/Categories";
import AdminHome from "../AdminPages/AdminHome/AdminHome";
import AddItems from "../AdminPages/AddItems/AddItems";
import Addbrandcategory from "../AdminPages/AddItems/AddBrandCategory";
import EditItems from "../AdminPages/EditItems/EditItems";
import Items from "../pages/items/Items";
import EditBrandCategory from "../AdminPages/EditItems/EditBrandCategory";
import EditItem from "../pages/items/EditItem";
import Bill from "../AdminPages/Bill/Bill";
import AddStock from "../AdminPages/stock/AddStock";
import StockList from "../AdminPages/stock/StockList";
import CustomerList from "../AdminPages/CustomerList/CustomerList";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/brands",
                element: <Brands />
            },
            {
                path: "/categories",
                element: <Categories />
            },
            {
                path: "/items",
                element: <Items />
            },
            {
                path: "/contactus",
                element: <div>contactus</div>
            },
            {
                path: "/aboutus",
                element: <div>aboutus</div>
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/item/:id",
                element: <SingleItem />
            },
            {
                path: "/brand/:id",
                element: <div>brand</div>
            },
            {
                path: "/category/:id",
                element: <div>category</div>
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminApp />,
        children: [
            {
                path: "",
                element: <AdminHome />
            },
            {
                path: "additem",
                element: <AddItems />
            },
            {
                path: "edititem",
                element: <EditItems />
            },
            {
                path: "edititem/:id",
                element: <EditItem />
            },
            {
                path: "editbrand/:id",
                element: <div>Edit Brand</div>
            },
            {
                path: "editcategory/:id",
                element: <div>Edit Category</div>
            },
            {
                path: "addbrandcategory",
                element: <Addbrandcategory />
            },
            {
                path: "editbrandcategory",
                element: <EditBrandCategory />
            },
            {
                path: "bill",
                element: <Bill />
            },
            {
                path: "customerList",
                element: <CustomerList />
            },
            {
                path: "stock",
                element: <AddStock />
            },
            {
                path: "stocklist",
                element: <StockList />
            }

        ]
    }
])

export default router;