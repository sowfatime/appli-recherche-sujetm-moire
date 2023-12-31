import "./domaine.css";
import { React, useState } from "react";
// import { Swal } from "sweetalert2"; 
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

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
  const [isButtonForAddOrUpdate, setIsButtonForAddOrUpdate] = useState(true);
  const [currentId, setCurrentId] = useState(0);
  let champs = document.getElementById("inputValue");

  const sweetMessage = (icon, title, text) => {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  };

  const domaineAdd = async () => {
    try {
      if (champs.value === "") {
        alert("champs vide");
      } else {
        const docRef = await addDoc(collection(db, "domaine"), {
          name: champs.value,
        });
        console.log("Document written with ID: ", docRef.id);
        sweetMessage("success", "merci", "ajout fait avec succès");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    domaineRead();
    champs.value = "";
  };

  const domaineEdit = async (id) => {
    setIsButtonForAddOrUpdate(false);
    setCurrentId(id);
    // const selectedDomaine = doc(db, "domaine", id);
    const docRef = doc(db, "domaine", id);
    const selectedDomaine = await getDoc(docRef);
    console.warn("currentId", currentId);
    console.log("Document data:", selectedDomaine.data());
    champs.value = selectedDomaine.data().name;
  };
  const domaineUpdate = async (id) => {
    const selectedDomaine = doc(db, "domaine", id);

    const newData = {
      name: champs.value,
    };

    await updateDoc(selectedDomaine, newData);

    domaineRead();
    sweetMessage("success", "merci", "modification faite avec succès");
    champs.value = "";
    setIsButtonForAddOrUpdate(true);
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
    Swal.fire({
      title: "Etes vous sûr?",
      text: "cette action est irréversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then(async(result) => {
      if (result.isConfirmed) {
        const selectedUser = doc(db, "domaine", id);
    
        await deleteDoc(selectedUser);
    
        domaineRead();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
    // sweetMessage("success", "merci", "suppression faite avec succès");
  };

  const cancelEdit = () => {
    setIsButtonForAddOrUpdate(true);
    champs.value = "";
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
        {isButtonForAddOrUpdate ? (
          <button className="btn btn-primary w-100" onClick={domaineAdd}>
            Send
          </button>
        ) : (
          <div className="d-flex justify-content-between">
            <button className="btn btn-danger w-25" onClick={cancelEdit}>
              Cancel
            </button>
            <button
              className="btn btn-warning w-25"
              onClick={() => {
                domaineUpdate(currentId);
              }}
            >
              Edit
            </button>
          </div>
        )}
      </div>
      <div className="w-75 m-auto mt-1" id="domaineContainer">
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
