import React from "react";

import "./styles.css";

function DevItem({ dev, changeFormToUpdate }) {

  function updateForm(e) {
    e.preventDefault();
    changeFormToUpdate({dev});
  }

  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <strong>{dev.name}</strong> 
          <span>{dev.techs.join(", ")}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <a className="btn" href={`https://github.com/${dev.github_username}`}>
        Acessar perfil no Github
      </a>
      <p className="btn" onClick={updateForm}>
        Editar Cadastro
      </p>
    </li>
  );
}

export default DevItem;
