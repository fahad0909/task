import React from 'react';
import routes from "./routes";
import {Navigate, Route, Routes} from "react-router-dom";
import './App.css';

function App() {

    const getRoutes = (routes) => {
        return routes.map((route, key) => {
            return (
                <Route
                    exact
                    key={key}
                    path={route.layout + route.path}
                    name={route.name}
                    element={<route.component/>}
                />
            );
        });
    };
    return (
        <Routes>
            {getRoutes(routes)}
            <Route path="/*" element={<Navigate to="/home"/>}/>
        </Routes>
    );
}

export default App;
