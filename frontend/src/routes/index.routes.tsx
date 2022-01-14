import {Routes, Route} from 'react-router-dom';
import Login from '../pages/Login';
import Repositories from '../pages/Repositores';
import SignUp from '../pages/SignUp';


function CustomRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/repositories" element={<Repositories/>}/>
        </Routes>
    );
}

export default CustomRoutes;