import { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextProps = {
  loginUser: (
    event: any,
    role: string,
    email: string,
    password: string
  ) => void;
};

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authToken, setAuthTokens] = useState<any>(() => {
    sessionStorage.getItem("authToken") &&
      JSON.stringify(sessionStorage.getItem("authToken") || "{}");
  });
  const [user, setUser] = useState<any>(
    sessionStorage.getItem("authToken") &&
      JSON.parse(sessionStorage.getItem("authToken") || "{}")
  );
  const [userRole, setUserRole] = useState("" || null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const Location = useLocation();

  useEffect(() => {
    if (Location.pathname === "/" || Location.pathname === "/register") {
      return;
    } else {
      const role = JSON.parse(sessionStorage.getItem("authToken")!)["role"];
      setUserRole(role);
    }
  });

  useEffect(() => {
    const fiveMinutes = 1000 * 60 * 5;
    const interval = setInterval(() => {
      if (authToken) {
        updateToken();
      }
    }, fiveMinutes);
    return () => clearInterval(interval);
  }, [authToken, loading]);

  const registerStudent = async (
    event: any,
    name: string,
    fatherName: string,
    familyName: string,
    phoneNumber: string,
    gpa: string,
    email: string,
    password: string,
    gender: string,
    intrest: string,
    major: string,
    university: string
  ) => {
    event.preventDefault();

    const data = JSON.stringify({
      name,
      fatherName,
      familyName,
      phoneNumber,
      gpa,
      email,
      password,
      gender,
      intrest,
      major,
      university,
    });
    console.log(JSON.parse(data));
    const url = "https://localhost:8080/user/register-student";
    const headers = { "Content-Type": "application/json" };
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: data,
    });

    if (response.status === 200) {
      navigate("/");
    } else {
      alert("something went wrong");
    }
  };
  const registerUniversitySupervisor = async (
    event: any,
    name: string,
    familyName: string,
    gender: string,
    phoneNumber: string,
    email: string,
    password: string,
    major: string,
    university: string
  ) => {
    event.preventDefault();

    const data = JSON.stringify({
      name,
      familyName,
      phoneNumber,
      email,
      password,
      gender,
      major,
      university,
    });
    console.log(JSON.parse(data));

    const url =
      "https://localhost:8080/user/register-student-supervisor-university";
    const headers = { "Content-Type": "application/json" };

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: data,
    });
    if (response.status === 200) {
      navigate("/");
    } else {
      alert("something went wrong");
    }
  };
  const registerCompanySupervisor = async (
    event: any,
    name: string,
    familyName: string,
    gender: string,
    phoneNumber: string,
    email: string,
    password: string,
    company: string
  ) => {
    event.preventDefault();

    const url =
      "https://localhost:8080/user/register-student-supervisor-company";
    const data = JSON.stringify({
      name,
      familyName,
      gender,
      phoneNumber,
      email,
      password,
      company,
    });
    console.log(JSON.parse(data));

    const headers = { "Content-Type": "application/json" };

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: data,
    });

    if (response.status === 200) {
      navigate("/");
    } else {
      alert("something went wrong");
    }
  };
  const loginUser = async (
    event: any,
    email: string,
    password: string,
    role: string
  ) => {
    event.preventDefault();

    const data = JSON.stringify({
      email,
      password,
      role,
    });

    const headers = { "Content-Type": "application/json" };
    var url = "";
    switch (role) {
      case "student":
        url = "https://localhost:8080/user/login-student";
        break;
      case "uniSupervisor":
        url = "https://localhost:8080/user/login-student-supervisor-university";
        break;
      case "companySupervisor":
        url = "https://localhost:8080/user/login-student-supervisor-company";
        break;

      default:
        break;
    }
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: data,
    });
    if (response.status === 200) {
      const info = await response.json();
      setAuthTokens(info);
      setUser(JSON.stringify(info.access));
      sessionStorage.setItem("authToken", JSON.stringify(info));
      navigate("/dashboard");
    } else {
      console.log("HEREO");
      alert("خطاء  في اسم المستخدم او كلمة");
    }
  };
  const logout = async () => {
    const url = "https://localhost:8080/user/logout";
    const data = JSON.parse(sessionStorage.getItem("authToken")!)[
      "refreshToken"
    ];
    const realData = JSON.stringify(data);

    const response = await fetch(url, {
      method: "DELETE",
      body: realData,
    });
    if (response.status === 204) {
      setAuthTokens(null);
      setUser(null);
      sessionStorage.removeItem("authToken");
      navigate("/");
    } else {
      alert("Cant logout");
    }
  };

  const updateToken = async () => {
    console.log("Update token");
    const url = "https://localhost:8080/user/refresh-token";
    const data = JSON.stringify({
      refresh: authToken.refreshToken,
    });
    const headers = { "Content-Type": "application/json" };

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: data,
    });
    const info = await response.json();

    if (response.status === 200) {
      setAuthTokens(info);
      setUser(JSON.stringify(info.access));
      sessionStorage.setItem("authToken", JSON.stringify(info));
    } else {
      logout();
    }
  };

  const contextData = {
    userRole: userRole,
    loginUser: loginUser,
    logout,
    registerStudent: registerStudent,
    registerUniversitySupervisor: registerUniversitySupervisor,
    registerCompanySupervisor: registerCompanySupervisor,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
