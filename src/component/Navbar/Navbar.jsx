import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar as HeroNav,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from "@heroui/react";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
export default function Navbar() {
  const { userToken, setUserToken, userData, setUserData } = useContext(AuthContext)
  const navigate = useNavigate()
  function logOut() {
    localStorage.removeItem('token')
    setUserToken(null)
    setUserData(null)
    navigate('/')
  }
  return (
    <HeroNav>
      <NavbarBrand>
        <p className="font-bold text-inherit">
          <Button className="bg-white text-xl font-bold hover:bg-white focus:bg-white" onPress={() => navigate('/home')}>Linked Posts</Button>
        </p>
      </NavbarBrand>

      <div className="flex justify-end items-center gap-10">
        {userToken != null ?
          <NavbarContent as="div" justify="end">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  size="sm"
                  src={userData?.photo}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" onPress={() => navigate("/profile")}>
                  Profile
                </DropdownItem>
                <DropdownItem onClick={logOut} key="logout" color="danger">
                  Log Out , {userData?.name}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
          :
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
              <NavLink color="foreground" to='/register'>
                Register
              </NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink color="foreground" to='/'>
                Login
              </NavLink>
            </NavbarItem>
          </NavbarContent>}
      </div>
    </HeroNav>
  );
}
