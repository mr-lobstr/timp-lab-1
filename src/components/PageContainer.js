import { useNavigate } from 'react-router-dom';
import { Button } from '../components/UiItems';
import NavBar from "../components/NavigateBar";
import "./PageContainer.css";

function PageContainer(
    {elems, func, navigatePath, actionMess, elseMess}
) {
    const navigate = useNavigate();
    
    return (
        <div className="page">
            {<NavBar></NavBar>}
            <div className="page-action">
                <Button onClick={() => navigate(navigatePath)}>{actionMess}</Button>
            </div>

            {<div className="container">
                {elems.length > 0 ? (
                    <div className="list">
                        <ul>{func}</ul>
                    </div>
                ) : (
                    <p>{elseMess}</p>
                )}
            </div>}
        </div>
    ); 
}

export default PageContainer;