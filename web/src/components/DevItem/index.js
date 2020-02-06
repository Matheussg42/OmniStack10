import React from "react";

import "./styles.css";

import parseStringAsArray from '../../utils/parseStringAsArray';

function DevItem({ dev, changeFormToUpdate, deleteUser }) {

  function updateForm(e) {
    e.preventDefault();
    changeFormToUpdate({dev});
  }

  function deleteUserForm(e){
    e.preventDefault();
    deleteUser({dev});
  }

  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <strong>{dev.name}</strong> 
          <span>{((typeof dev.techs) == 'string') ? (parseStringAsArray(dev.techs)).join(", ") : dev.techs.join(", ")}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <a className="btn" href={`https://github.com/${dev.github_username}`}>
        Acessar perfil no Github
      </a>
      <div className="btn-group">
        <span className="btn" onClick={updateForm}>
          Editar Cadastro
        </span>
        <span className="btn delete" onClick={deleteUserForm}>
          Deletar Dev
        </span>
      </div>
      
    </li>
  );
}

export default DevItem;
