import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Switch,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@heroui/react";
import { Sun, Moon, LogOut, User, Settings } from "lucide-react";
import { useTheme } from "next-themes";
import { Link, useLocation } from "react-router-dom";
import { useUserProfile } from "../../hooks/useUserProfile";
import { useLogout } from "../../hooks/useLogout";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated } = useUserProfile();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const location = useLocation();

  return (
    <Navbar>
      <NavbarBrand>
        <Link to={isAuthenticated ? "/profile" : "/"}>
          <p className="font-bold text-inherit">SessionAuth</p>
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <Switch
            isSelected={theme === "dark"}
            size="sm"
            color="primary"
            thumbIcon={({ isSelected }) =>
              isSelected ? <Moon size={14} /> : <Sun size={14} />
            }
            onValueChange={(isSelected) =>
              setTheme(isSelected ? "dark" : "light")
            }
          />
        </NavbarItem>

        {isAuthenticated && user ? (
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  as={Button}
                  className="transition-transform"
                  src={user.profilePicture}
                  name={`${user.firstName} ${user.lastName}`}
                  size="sm"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user.email}</p>
                </DropdownItem>
                <DropdownItem
                  key="user-profile"
                  startContent={<User size={16} />}
                >
                  <Link to="/profile">Profile</Link>
                </DropdownItem>
                <DropdownItem
                  key="settings"
                  startContent={<Settings size={16} />}
                >
                  <Link to="/settings">Settings</Link>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  startContent={<LogOut size={16} />}
                  onPress={() => logout()}
                >
                  {isLoggingOut ? "Logging out..." : "Log Out"}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        ) : (
          !location.pathname.includes("/login") &&
          !location.pathname.includes("/register") && (
            <NavbarItem>
              <Button as={Link} to="/login" color="primary" variant="flat">
                Sign In
              </Button>
            </NavbarItem>
          )
        )}
      </NavbarContent>
    </Navbar>
  );
};
