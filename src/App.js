import './App.css';
import Login from './pages/Login';
import {Routes, Route} from 'react-router-dom';
import RequireAuth from './utils/RequireAuth';
import AddStudent from './containers/AddStudent';
import ManageStudent from './containers/ManageStudent';


function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="login" element={<Login />}></Route>
          <Route path="/" >
            <Route path="/" element={<RequireAuth><AddStudent/></RequireAuth>} />
            <Route path="addstudent" element={<RequireAuth><AddStudent/></RequireAuth>}/>
            <Route path="managestudent" element={<RequireAuth><ManageStudent/></RequireAuth>}/>
          </Route>
        </Routes>
    </div>
  );
}

export default App;
