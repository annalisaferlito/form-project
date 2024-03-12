import React, { useState } from "react";
import "./SignUp.css";
import { User } from "../../types/User";

const SignUp = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [user, setUser] = useState<User>({
    id: "",
    username: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    // Rimuovi l'errore corrispondente al campo quando l'utente inizia a modificare il campo
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Verifica se ci sono errori prima di inviare il modulo
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
  
      if (response.ok) {
        console.log("Registrazione completata con successo!");
        // Puoi aggiungere qui eventuali azioni da eseguire dopo la registrazione
      } else {
        console.error("Si è verificato un errore durante la registrazione.");
      }
    } catch (error) {
      console.error("Si è verificato un errore:", error);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Se la lunghezza del valore è inferiore a 6, imposta l'errore corrispondente al campo
    if (value.length < 4) {
      setErrors({ ...errors, [name]: "Devi inserire almeno 6 caratteri" });
    }
  };

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