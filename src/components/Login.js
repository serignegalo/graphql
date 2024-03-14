import React from "react";
// import base64 from "base-64";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  // Déclarer un state pour stocker la valeur saisie
  function toBase64(str) {
    let encoder = new TextEncoder();
    let byteArray = encoder.encode(str);
    let binary = "";
    byteArray.forEach((x) => (binary += String.fromCharCode(x)));
    return btoa(binary);
  }
  let errorInput = "";
  async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const password = formData.get("password");
    const login = formData.get("login");

    function ajouterTexteAuParagraphe(msg, id) {
      var tagError = document.getElementById(id);
      if (tagError) {
        tagError.innerText = msg;
      } else {
        console.error(
          "Le paragraphe avec l'identifiant " + id + " n'existe pas."
        );
      }
    }

    const encodeCredential = `${login}:${password}`;
    const credentials = toBase64(encodeCredential);
    // const credentials = base64.encode(tab.join(":"));

    console.log("--- validation passed ---");

    try {
      const response = await axios({
        url: "https://learn.zone01dakar.sn/api/auth/signin",
        method: "post",
        headers: {
          Authorization: `Bearer ${credentials}`,
        },
      });
      localStorage.setItem("token", response.data);
      navigate("/home");
    } catch (error) {
      errorInput = error.response.data.error;
      ajouterTexteAuParagraphe(errorInput, "errorTag");
    }
  }

  // Fonction de soumission du formulaire (vous pouvez la lier à un événement onSubmit)
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // Utiliser la valeur saisie
  //   console.log("Valeurs saisies :", password, usernam);
  //   // Réinitialiser la valeur saisie si nécessaire
  //   // setValeurSaisie('');
  // };
  return (
    <div className="flex items-center justify-center w-full p-[60px] text-white bg-white h-[100vh]">
      <div className="bg-white shadow-xl rounded p-4">
        <h1 className="mb-4 text-center bg-blue-500 font-bold text-white">
          LOGIN
        </h1>
        <form
          onSubmit={onSubmit}
          action=""
          className="flex flex-col justify-between "
        >
          <label id="email-label" htmlFor="email-field">
            Email or Username
          </label>
          <input
            type="text"
            id="login"
            autoComplete="username"
            name="login"
            required=""
            className="w-full border-b-[2px] focus:outline-none border-gray-300 mb-8"
          ></input>
          <label htmlFor="password-field">Password</label>
          <input
            type="password"
            id="password-field"
            name="password"
            minLength="6"
            autoComplete="new-password"
            title="Password does not meet the requirements"
            required=""
            className="w-full bg-white border-b-[2px] focus:outline-none border-gray-300"
          />
          <p className="text-red-600 text-sm mt-2" id="errorTag"></p>
          <button className="bg-blue-500 w-[80px] h-[30px] mt-4 rounded-full text-white hover:bg-blue-600 font-medium">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
