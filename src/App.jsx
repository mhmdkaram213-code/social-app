import { HeroUIProvider } from "@heroui/react";
import { RouterProvider } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import { routers } from "./routers";
import { Toaster } from "react-hot-toast";
const App = () => {
	return (
		<>
			<HeroUIProvider>
				<AuthContextProvider>
					<RouterProvider router={routers} />
					<Toaster />
				</AuthContextProvider>
			</HeroUIProvider>

		</>
	);
};
export default App;
