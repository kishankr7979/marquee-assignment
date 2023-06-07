import { useReducer } from "react";
import { BrowserRouter} from "react-router-dom";
import "./App.css";
import AuthReducer, { authInitialData } from "./context/auth/AuthReducer";
import RouterConfig from "./navigation/RouterConfig";
import AuthContext from "./context/auth/AuthContext";
function App() {  
  const [state, dispatch] = useReducer(AuthReducer, authInitialData);

  const contextProviderVal = {
    state,
    dispatch
  }
  return (
    <AuthContext.Provider value={contextProviderVal}>
    <BrowserRouter basename="/">
      <RouterConfig />
    </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
