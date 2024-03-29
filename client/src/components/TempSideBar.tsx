import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import CallIcon from "@mui/icons-material/Call";
import ComputerIcon from "@mui/icons-material/Computer";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ApartmentIcon from "@mui/icons-material/Apartment";
import SchoolIcon from "@mui/icons-material/School";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AuthContext from "../context/AuthContext";
import {
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  styled,
  Tooltip,
} from "@mui/material";

const drawerWidth = "19%";

const DrawerHeader = styled("div")(({ theme }) => ({
  marginBottom: "15px",
  textAlign: "center",
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function TempSideBar() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { logout, userRole }: any = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleSideBarNavigationClicks = (page: string) => {
    switch (page) {
      case "home page":
        navigate("/dashboard");
        break;
      case "weekly tasks":
        navigate("/weekly-tasks");
        break;
      case "company lists":
        navigate("/company-list");
        break;
      case "interview":
        navigate("/interview");
        break;
      case "contanct":
        navigate("/contact");
        break;
      case "profile":
        navigate("/profile");
        break;

      case "student-submitions":
        navigate("/student-submitions");
        break;
      case "create tasks":
        navigate("/create-task");
        break;

      default:
        break;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          mr: `${drawerWidth}px`,
          background: "#3C6255",
        }}
      >
        <Toolbar sx={{ backgroundColor: "#3C6255" }}>
          <Tooltip title="معلومات">
            <IconButton onClick={handleOpenUserMenu}>
              <AccountCircleIcon sx={{ color: "whitesmoke", fontSize: 30 }} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={() => {
              setAnchorElUser(null);
            }}
          >
            <MenuItem key={"تسجيل الخروج"} onClick={() => logout()}>
              <Typography textAlign="center">{"تسجيل الخروج"}</Typography>
            </MenuItem>
          </Menu>
          <Typography
            variant="h6"
            noWrap
            sx={{ flexGrow: 1, textAlign: "right" }}
            component="div"
          >
            صفحة التحكم
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      ></Box>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <Toolbar />
        <DrawerHeader>
          <SchoolIcon
            sx={{ fontSize: 45, color: "#3C6255", marginBottom: "20px" }}
          />
        </DrawerHeader>

        <Divider />
        <List>
          <ListItem
            key={"الصفحة الرئيسية"}
            disablePadding
            onClick={() => {
              handleSideBarNavigationClicks("home page");
            }}
          >
            <ListItemButton sx={{ textAlign: "right" }}>
              <ListItemIcon>
                <HomeIcon sx={{ color: "#3C6255" }} />
              </ListItemIcon>
              <ListItemText primary={"الصفحة الرئيسية"} />
            </ListItemButton>
          </ListItem>
          {userRole === "student" && (
            <ListItem
              key={"قائمة الشركات"}
              disablePadding
              onClick={() => {
                handleSideBarNavigationClicks("company lists");
              }}
            >
              <ListItemButton sx={{ textAlign: "right" }}>
                <ListItemIcon>
                  <ApartmentIcon sx={{ color: "#3C6255" }} />
                </ListItemIcon>
                <ListItemText primary={"قائمة الشركات"} />
              </ListItemButton>
            </ListItem>
          )}
          {userRole === "companySupervisor" && (
            <ListItem
              key={"قائمة الطلبات"}
              disablePadding
              onClick={() => {
                handleSideBarNavigationClicks("student-submitions");
              }}
            >
              <ListItemButton sx={{ textAlign: "right" }}>
                <ListItemIcon>
                  <PeopleAltIcon sx={{ color: "#3C6255" }} />
                </ListItemIcon>
                <ListItemText primary={"قائمة الطلبات"} />
              </ListItemButton>
            </ListItem>
          )}

          {userRole === "student" && (
            <ListItem
              key={"مقابلة شخصية"}
              disablePadding
              onClick={() => {
                handleSideBarNavigationClicks("interview");
              }}
            >
              <ListItemButton sx={{ textAlign: "right" }}>
                <ListItemIcon>
                  <ComputerIcon sx={{ color: "#3C6255" }} />
                </ListItemIcon>
                <ListItemText primary={"مقابلة شخصية"} />
              </ListItemButton>
            </ListItem>
          )}

          {userRole === "companySupervisor" && (
            <ListItem
              key={"مقابلة شخصية"}
              disablePadding
              onClick={() => {
                handleSideBarNavigationClicks("interview");
              }}
            >
              <ListItemButton sx={{ textAlign: "right" }}>
                <ListItemIcon>
                  <ComputerIcon sx={{ color: "#3C6255" }} />
                </ListItemIcon>
                <ListItemText primary={"مقابلة شخصية"} />
              </ListItemButton>
            </ListItem>
          )}
          {userRole === "student" && (
            <ListItem
              key={"المهام الاسبوعية"}
              disablePadding
              onClick={() => {
                handleSideBarNavigationClicks("weekly tasks");
              }}
            >
              <ListItemButton sx={{ textAlign: "right" }}>
                <ListItemIcon>
                  <AssignmentIcon sx={{ color: "#3C6255" }} />
                </ListItemIcon>
                <ListItemText primary={"المهام الاسبوعية"} />
              </ListItemButton>
            </ListItem>
          )}

          {userRole === "uniSupervisor" && (
            <ListItem
              key={"انشاء المهام"}
              disablePadding
              onClick={() => {
                handleSideBarNavigationClicks("create tasks");
              }}
            >
              <ListItemButton sx={{ textAlign: "right" }}>
                <ListItemIcon>
                  <AssignmentIcon sx={{ color: "#3C6255" }} />
                </ListItemIcon>
                <ListItemText primary={"انشاء المهام"} />
              </ListItemButton>
            </ListItem>
          )}
        </List>
        <Divider />
        <List>
          <ListItem
            key={"التواصل"}
            disablePadding
            onClick={() => {
              handleSideBarNavigationClicks("contanct");
            }}
          >
            <ListItemButton sx={{ textAlign: "right" }}>
              <ListItemIcon>
                <CallIcon sx={{ color: "#3C6255" }} />
              </ListItemIcon>
              <ListItemText primary={"التواصل"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            key={"الحساب الشخصي"}
            disablePadding
            onClick={() => {
              handleSideBarNavigationClicks("profile");
            }}
          >
            <ListItemButton sx={{ textAlign: "right" }}>
              <ListItemIcon>
                <AccountCircleIcon sx={{ color: "#3C6255" }} />
              </ListItemIcon>
              <ListItemText primary={"الحساب الشخصي"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
