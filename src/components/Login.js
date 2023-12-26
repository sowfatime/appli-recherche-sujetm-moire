import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { Form } from 'react-bootstrap';
import './login.css'; // Importez le fichier CSS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [signupEmail, setSignupEmail] = useState(""); // Nouvel état pour l'inscription
  const [signupPassword, setSignupPassword] = useState(""); // Nouvel état pour l'inscription

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setEmail("");
        setPassword("");
  
        // Décaler la réinitialisation des états après un court délai
        setTimeout(() => {
          setEmail("");
          setPassword("");
        }, 80);
  
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .then((userCredential) => {
        console.log(userCredential);
        setSignupEmail("");
        setSignupPassword("");
  
        // Décaler la réinitialisation des états après un court délai
        setTimeout(() => {
          setSignupEmail("");
          setSignupPassword("");
        }, 80);
      })
  
      
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleSignup = () => {
    setShowSignup(!showSignup);
  };

  return (
    <>
      {showSignup ? (
        <Form className='container_login ' onSubmit={signUp}>
          <h1 className='text-center mt-5'>Inscription</h1>
          <Form.Control type="email" placeholder="Enter email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
          <Form.Control type="password" placeholder="Password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
          <button type="submit" className='btn btn-primary mt-3'>
            S'inscrire
          </button>
          <p className="text-center">
            Déjà membre? <a onClick={toggleSignup}> Connexion</a>
          </p>
        </Form>
      ) : (
        <Form className='container_login ' onSubmit={signIn}>
          <h1 className='text-center mt-5'>Connexion</h1>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className='btn btn-primary mt-3'>
            Connexion
          </button>
          <p className="text-center">
            Pas de compte? <a onClick={toggleSignup}> S'inscrire</a>
          </p>
        </Form>
      )}
    </>
  );
};

export default Login;