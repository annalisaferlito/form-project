import React, { useState } from "react";
import "./SignUp.css";
import { User } from "../../types/User";

const SignUp = () => {
  const [user, setUser] = useState<User>({
    id: "",
    username: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleInputChange}
        />
        
        <button type="submit">Registrati</button>
        <p>Hai già un account?</p>
      </form>
    </div>
  );
};

export default SignUp;
