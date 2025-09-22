import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { Button } from "./UiItems";
import "../App.css"

function NavBar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <>
      <div className="nav-bar">
        <Button className = "documents-button" onClick={() => navigate("/")}>Документы</Button>
        {user?.role_ === "администратор" && (
          <Button className = "employees-button" onClick={() => navigate("/employees")}>Сотрудники</Button>
        )}
      </div>
    </>
  );
}

export default NavBar;
