import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { Button } from "./UiItems";

function AppHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const formatUserName = (u) => {
    if (!u) return "";
    const initials = [u.name_, u.middle_name]
      .filter(Boolean)
      .map((n) => n[0] + ".")
      .join(" ");
    return `${u.surname} ${initials}`;
  };

  if (!user) return null;

  return (
    <>
      <header className="App-header">
        <h1>Реестр документов</h1>
        <div className="user-info">
          <span className="user-name">{formatUserName(user)}</span>
          <Button
            className="logout-button"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Выйти
          </Button>
        </div>
      </header>
    </>
  );
}

export default AppHeader;
