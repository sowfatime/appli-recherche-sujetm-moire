import "./admin.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Domaine from "./domaine/Domaine";

function Admin() {
  return (
    <>
      <div className="dash">
        <div className="side-top">
          <div className="top-lefts">
            <h4>Gestion</h4>
          </div>
          <div className="top-rights">
            <input></input>
            <div className="rights-profile">
              <i className="bi bi-person-circle"></i>
            </div>
          </div>
        </div>
        <div className="side-bar">
          <div className="side-bar-left">
            <div className="image">
              <img
                src="https://pyjamahr.com/wp-content/uploads/2022/03/team-management.png"
                alt="ok"
              />
            </div>
            <div className="links">
              <a href="domaine">Domaines</a>
              <a href="">Sujets</a>
              <a href="">Utilisateurs</a>
            </div>
          </div>
          <div className="side-bar-right">
            <BrowserRouter>
              <Routes>
                {/* <Route path="/" element={<Layout />}> */}
               
                  <Route path="domaine" element={<Domaine />} />
                  
                {/* </Route> */}
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
