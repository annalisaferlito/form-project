import React, { useState } from "react";
import "./LogIn.css";
import { User } from "../../types/User";

const LogIn = () => {
   // definizione dello stato per le credenziali dell'utente, eventuali errori, stato di caricamento e successo del login
  const [credentials, setCredentials] = useState<User>({
    id: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

  // funzione per gestire il cambiamento degli input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  // Funzione per gestire la sottomissione del form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setLoginSuccess(false);

    try {
      const response = await fetch(`http://localhost:3001/users`);
      if (response.ok) {//verifichiamo se l'utente è presente nel db
        const users = await response.json();
        const user = users.find(
          (u: User) =>
            u.username === credentials.username &&
            u.password === credentials.password
        );
        if (user) {
          console.log("Login completato con successo!");//se l'utente è presente il login viene ultimato
          setLoginSuccess(true);
          
        } else {
          setError("Credenziali non valide.");
          console.error("Credenziali non valide.");//se l'utente non è presente nel db o la password è errata
        }
      } else {
        console.error(
          "Si è verificato un errore durante il recupero degli utenti." //condizione che compare nel caso in cui non è riuscito a connettersi al db
        );
        setError("Si è verificato un errore durante il recupero degli utenti.");
      }
    } catch (error) {
      setError("Si è verificato un errore durante il login.");
      console.error(error);
    } finally {
      setLoading(false); 
    }
  };
  //il form e le sue voci
  return (
    <div className="main">
      <form onSubmit={handleSubmit}>
        <h1>Accedi</h1>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleInputChange}
        />
        <button type="submit" disabled={loading}>
          Accedi
        </button>
        {error && <p className="error">{error}</p>}
        {loginSuccess && (
          <p className="success">Login completato con successo!</p>
        )}
        <p>Non hai un account?</p>
        <p>
          <a href="/register" className="register">
            Registrati
          </a>
        </p>
      </form>
    </div>
  );
};

export default LogIn;
