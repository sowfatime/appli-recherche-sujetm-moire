import "./domaine.css";
import { React, useState } from "react";

import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../config/config";
function Domaine() {
  const [domaine, setDomaine] = useState([]);

  const domaineAdd = async () => {
    let champs = document.getElementById("inputValue");
    try {
      if (champs.value === "") {
        alert("champs vide");
      } else {
        const docRef = await addDoc(collection(db, "domaine"), {
          name: champs.value,
        });
        console.log("Document written with ID: ", docRef.id);
        alert("ajout fait");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    domaineRead();
  };
 
  const domaineRead = async () => {
    const domaineArray = [];
    const querySnapshot = await getDocs(collection(db, "domaine"));
    querySnapshot.forEach((doc) => {
      domaineArray.push({ id: doc.id, ...doc.data() });
      // console.log(`${doc.id} => ${doc.data().first} ${doc.data().last}`);
    });

    setDomaine(domaineArray);
  };
  domaineRead();
  return (
    <>
      <div className="w-50 m-auto mt-3">
        <div className="mb-3 w-100">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            name
          </label>
          <input
            type="text"
            id="inputValue"
            placeholder="name"
            className="w-100"
          />
        </div>
        <button className="btn btn-primary w-100" onClick={domaineAdd}>
          send
        </button>
      </div>
      <div className="w-75 m-auto mt-3">
        <div className="row">
          {
            domaine.map((dom)=>(
              <div className="col-3 mt-2" key={dom.id}>
              <div className="card">
                <img
                  src="https://www.nameshield.com/wp-content/uploads/2021/04/Job-hunt-bro-red-storyset-demisized-1024x816.png"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <p className="card-text">{dom.name}</p>
                </div>
              </div>
            </div>
            ))
          }
        </div>
      </div>
    </>
  );
}

export default Domaine;
