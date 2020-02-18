import React from "react";

import "./styles.css";
import parseStringAsArray from '../../utils/parseStringAsArray';

function CompanyJob({ job, company }) {

  return (
    <li className="dev-item">
      <p>Vaga: <strong>{job.title}</strong></p>
      <span>Tecnologias: {((typeof job.Techs) == 'string') ? (parseStringAsArray(job.Techs)).join(", ") : job.Techs.join(", ")}</span><br />
      <p>Descrição: {job.Desc}</p><br />
      <span><a href={job.Link} target="_blank" rel="noopener noreferrer">Acesse para mais informações</a></span><br />
      <div className="btn-group">
        <span className="btn">
          Editar Vaga
        </span>
        <span className="btn delete">
          Deletar Vaga
        </span>
      </div>
      
    </li>
  );
}

export default CompanyJob;
