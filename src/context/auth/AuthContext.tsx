import { createContext } from "react";
import { authInitialData } from "./AuthReducer";

const AuthContext = createContext<any>(authInitialData)

export default AuthContext;