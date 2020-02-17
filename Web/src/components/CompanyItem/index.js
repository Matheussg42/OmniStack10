import React from "react";
import { Link } from 'react-router-dom';

import "./styles.css";

function CompanyItem({ company, changeFormToUpdate, deleteCompany }) {

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
      <Link className="btn"
        to={{
          pathname: `/jobs/${company._id}`,
        }}
      >Vagas</Link>
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
