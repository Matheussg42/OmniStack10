import React from "react";

import "./styles.css";

function CompanyItem({ company, changeItensToJobs, changeFormToUpdate, deleteUser }) {

  // function showJobs(e) {
  //   e.preventDefault();
  //   changeItensToJobs({company});
  // }
  
  function updateForm(e) {
    e.preventDefault();
    changeFormToUpdate({company});
  }

  function deleteUserForm(e){
    e.preventDefault();
    deleteUser({company});
  }

  return (
    <li className="dev-item">
      <header>
        <img src={company.avatar_url} alt={company.name} />
        <div className="user-info">
          <strong>{company.name}</strong> 
          <span>Vagas Disponiveis: {company.jobs.length}</span>
        </div>
      </header>
      <p>{company.desc}</p>
      <span className="btn" >
        Vagas
      </span>
      <div className="btn-group">
        <span className="btn" onClick={updateForm}>
          Editar Cadastro
        </span>
        <span className="btn delete" onClick={deleteUserForm}>
          Deletar Empresa
        </span>
      </div>
      
    </li>
  );
}

export default CompanyItem;
