import { createContext, useEffect, useState } from "react"
import getLoggedUser from "../services/loggedUserApi"
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()
export default function AuthContextProvider({ children }) {
    const [userToken, setUserToken] = useState(null)
    const [userData, setUserData] = useState(null)
    async function getUser() {
        const response = await getLoggedUser()
        if (response.message == 'success') {
            setUserData(response.user)
        }
    }
    useEffect(()=>{
        if (localStorage.getItem('token')!=null) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUserToken(localStorage.getItem('token'))
            getUser()
        }
    } , [userToken])
    return (
        <AuthContext.Provider value={{userToken , setUserToken , userData, setUserData , getUser}}>
            {children}
        </AuthContext.Provider>
    )
}
