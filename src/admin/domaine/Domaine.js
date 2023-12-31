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
  let champs = document.getElementById("inputValue");
  let valueForAddUpdate=0;
  let currentId=0;

  const domaineAdd = async () => {
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

  const domaineEdit = async (id) => {
    currentId=id;
    valueForAddUpdate=1;
    // const selectedDomaine = doc(db, "domaine", id);
    const docRef = doc(db, "domaine", id);
    const selectedDomaine = await getDoc(docRef);
    
    console.log("Document data:", selectedDomaine.data());
    champs.value=selectedDomaine.data().name;
  };
  const domaineUpdate = async (id) => {
    const selectedDomaine = doc(db, "domaine", id);

    const newData = {
      name: champs.value,
    };

    await updateDoc(selectedDomaine, newData);

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
  const domaineDelete = async (id) => {
    // let isForDelet=confirm("etes vous sûr");
    // if (is) {

    // }
    const selectedUser = doc(db, "domaine", id);

    await deleteDoc(selectedUser);

    domaineRead();
    alert("suppression faite avec succès");
  };

  const verifFunctionToCall=()=>{
    if (valueForAddUpdate===0) {
      domaineAdd();
    }else if (valueForAddUpdate===1) {
      domaineUpdate(currentId);
    }
  };

  domaineRead();

  return (
    <>
      <div className="w-50 m-auto mt-1">
        <div className="mb-2 w-100 text-center">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Ajout d'un domaine
          </label>
          <input
            type="text"
            id="inputValue"
            placeholder="name"
            className="w-100"
          />
        </div>
        <button className="btn btn-primary w-100" onClick={verifFunctionToCall}>
          send
        </button>
      </div>
      <div className="w-75 m-auto mt-1">
        <div className="row">
          {domaine.map((dom) => (
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
                <div className="w-25 d-flex justify-content-between pb-1 px-1">
                  <i
                    className="bi bi-trash3-fill"
                    onClick={() => {
                      domaineDelete(dom.id);
                    }}
                  ></i>
                  <i
                    className="bi bi-pencil-square"
                    onClick={() => {
                      domaineEdit(dom.id);
                    }}
                  ></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Domaine;
