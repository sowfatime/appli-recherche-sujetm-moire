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
    try {
      const docRef = await addDoc(collection(db, "domaine"), {
       name:"santé"
      });
      console.log("Document written with ID: ", docRef.id);
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


  return (
    <>
      <div className="w-50 m-auto mt-5">
        <div className="mb-3 w-100">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            name
          </label>
          <input
            type="text"
            id="exampleFormControlInput1"
            placeholder="name"
            className="w-100"
          />
        </div>
        <button className="btn btn-primary w-100" onClick={domaineAdd} >send</button>
      </div>
    </>
  );
}

export default Domaine;
