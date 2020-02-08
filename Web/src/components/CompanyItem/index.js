import React from "react";

import "./styles.css";

function CompanyItem({ company, changeItensToJobs, changeFormToUpdate, deleteCompany }) {

  // function showJobs(e) {
  //   e.preventDefault();
  //   changeItensToJobs({company});
  // }
  
  function updateForm(e) {
    e.preventDefault();
    changeFormToUpdate({company});
  }

  function deleteCompanyForm(e){
    e.preventDefault();
    deleteCompany({company});
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
        <span className="btn delete" onClick={deleteCompanyForm}>
          Deletar Empresa
        </span>
      </div>
      
    </li>
  );
}

export default CompanyItem;
