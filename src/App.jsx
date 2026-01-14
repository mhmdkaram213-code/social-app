import { HeroUIProvider } from "@heroui/react";
import { RouterProvider } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import { routers } from "./routers";
const App = () => {
	return (
		<>
			<HeroUIProvider>
				<AuthContextProvider>
					<RouterProvider router={routers} />
				</AuthContextProvider>
			</HeroUIProvider>

		</>
	);
};
export default App;
