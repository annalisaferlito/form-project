import React, { useState } from "react";
import "./SignUp.css";
import { User } from "../../types/User";

const SignUp = () => {
  // stati per gestire gli errori e le informazioni dell'utente
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [user, setUser] = useState<User>({
    id: "",
    username: "",
    password: "",
  });

  // funzione per gestire il cambiamento degli input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // Funzione per gestire la sottomissione del form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      //verifica della presenza dell'utente nel db
    const hasErrors = Object.values(errors).some(error => error !== "");
    if (hasErrors) {
      console.log("Ci sono errori nel modulo. Impossibile inviare.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      //verifichiamo se è tutto ok durante la registrazione
      if (response.ok) {
        console.log("Registrazione completata con successo!");
      } else {
        console.error("Si è verificato un errore durante la registrazione.");
      }
    } catch (error) {
      console.error("Si è verificato un errore:", error);
    }
  };
  //ogni volta che togliamo il focus interviene il blur all'interno di un componente, così verifichiamo la lunghezza minima della stringa digitata dall'utente
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Se la lunghezza del valore è inferiore a 6, imposta l'errore corrispondente al campo
    if (value.length < 4) {
      setErrors({ ...errors, [name]: "Devi inserire almeno 6 caratteri" });
    }
  };
  //il form e le sue voci
  return (
    <div className="main">
      <form onSubmit={handleSubmit}>
        <h1>Registrazione</h1>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
        {errors.username && <p className="error">{errors.username}</p>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
        {errors.password && <p className="error">{errors.password}</p>}
        <button type="submit">Registrati</button>
        <p>Hai già un account?</p>
        <p>
          <a href="/register" className="register">
            Accedi
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;