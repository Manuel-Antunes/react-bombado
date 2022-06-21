import { AuthProvider } from "./contexts/AuthContext";
import { DarkThemeProvider } from "./contexts/DarkThemeContext";
import Routes from "./routes";
import "./styles/global.css";

function App() {
  return (
    <div className="App w-full min-h-screen">
      <AuthProvider>
        <DarkThemeProvider>
          <Routes />
        </DarkThemeProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
