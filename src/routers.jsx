import { createBrowserRouter } from "react-router-dom";
import Layout from "./component/Layout/Layout";
import Login from "./auth/Login/Login";
import Notfound from "./component/Notfound/Notfound";
import SinglePost from "./pages/SinglePost";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Register from "./auth/Register/Register";
import ProtectRoute from "./pages/ProtectRoute";
import MyPosts from "./pages/MyPosts";
import MyComments from "./pages/MyComments";
import ChangePassword from "./pages/ChangePassword";
export const routers = createBrowserRouter([{
		path: '', element: <Layout />, children: [
			{ index: true, element: <Login /> },
			{ path: '/register', element: <Register /> },
			{ path: '/home', element: <ProtectRoute><Home /></ProtectRoute> },
			{ path: '/profile', element: <ProtectRoute><Profile /></ProtectRoute> },
			{ path: '/singlePost/:id', element: <ProtectRoute><SinglePost /></ProtectRoute> },
			{ path: '/myPosts', element: <ProtectRoute><MyPosts /></ProtectRoute> },
			{ path: '/changePassword', element: <ProtectRoute><ChangePassword /></ProtectRoute> },
			{ path: '/myComments', element: <ProtectRoute><MyComments /></ProtectRoute> },
			{ path: '*', element: <Notfound /> }
		]
	}])