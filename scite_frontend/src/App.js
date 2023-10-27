import React, { useState } from "react";
import './App.css';
import { About, Feed, Library, Echo, Login, Signup, Profile } from './pages';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import UserContext from './context/UserContext.js'; // Adjust the path accordingly

function App() {

    const [currentUser, setCurrentUser] = useState(null);

    return (
        <Router>
            <UserContext.Provider value={{ currentUser, setCurrentUser }}>
                <div className="App">
                    <Routes>
                        <Route path='/about' element={<About />}/>
                        <Route path='/feed' element={<Feed />}/>
                        <Route path='/library' element={<Library />}/>
                        <Route path='/echo' element={<Echo />}/>
                        <Route path='/login' element={<Login />}/>
                        <Route path='/signup' element={<Signup />}/>
                        <Route path='/profile' element={<Profile />}/>
                    </Routes>
                </div>
            </UserContext.Provider>
        </Router>
    );
}

export default App;
