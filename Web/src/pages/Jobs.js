import React, { useState, useEffect } from "react";
import api from "../services/api.js";

import "../global.css";
import "../App.css";
import "../Sidebar.css";
import "../Main.css";

import Header from "../components/Header/index";
import parseStringAsArray from '../utils/parseStringAsArray';
import JobForm from '../components/JobForm/index';
import JobUpdateForm from '../components/JobUpdateForm/index';
import ReplyIcon from '@material-ui/icons/Reply';

// Componente -> Bloco isolado de HTML, CSS e JS o qual não interfere no restante da aplicação.
// Propriedade -> Informações que um componente PAI passa para o componente FILHO
// Estado -> Informações mantidas pelo componente (Lembrar: Imutabilidade)

function Jobs({match}) {
  const [company, setCompany] = useState({});
  const [jobToUpdate, setJobToUpdate] = useState({});
  const [insertForm, setInsertForm] = useState(true);
  
  useEffect(() => {
    loadJobs();
  }, []);

  async function handleAddJob(job){
   
    job.Techs = parseStringAsArray(job.Techs);
    company.jobs.push(job)
    const jobs = company.jobs;

    const sendJob = await getCompanyJobData(company, jobs);

    await api.post(`/company/${company._id}`, sendJob);
    loadJobs(company._id);

  }

  async function loadJobs(companyId = match.params.id) {
    const response = await api.get(`/jobs/${companyId}`);
    setCompany(response.data);
  }

  async function updateForm(job){
    setInsertForm(false);
    setJobToUpdate(job)
  }

  async function getCompanyJobData(company, job){
    return {
      name: company.name,
      desc: company.desc,
      avatar_url: company.avatar_url,
      jobs: job,
      latitude: company.location.coordinates[1],
      longitude: company.location.coordinates[0]
    }
  }

  async function onUpdate(data){
    const filtered = company.jobs.filter((job) => job._id !== data._id)
    filtered.push(data);
    company.jobs = filtered;

    const sendJob = await getCompanyJobData(company, filtered);

    await api.post(`/company/${company._id}`, sendJob);
    loadJobs(company._id);
  }

  async function deleteJob(_id){
    const filtered = company.jobs.filter((job) => job._id !== _id)
    company.jobs = filtered;

    const sendJob = await getCompanyJobData(company, filtered);

    await api.post(`/company/${company._id}`, sendJob);
    loadJobs(company._id);
  }

  return (
    <div>
      <Header />
       <div id="app">
        <aside>
          <strong><a style={{color: "#666", textDecoration: "none"}} href="/company"><ReplyIcon color="disabled"/> JobRadar</a></strong>
          {!insertForm ? <JobUpdateForm onUpdate={onUpdate} jobToUpdate={jobToUpdate}/> : <JobForm company={company} onSubmit={handleAddJob} /> }
        </aside>
        <main>
        {Object.keys(company).length > 0 ? (
          <ul>
            {company.jobs.map(job => (
              <li key={job._id} className="dev-item">
                <p>Vaga: <strong>{job.title}</strong></p>
                <span>Tecnologias: {((typeof job.Techs) == 'string') ? (parseStringAsArray(job.Techs)).join(", ") : job.Techs.join(", ")}</span><br />
                <p>Descrição: {job.Desc}</p><br />
                <span><a href={job.Link} target="_blank" rel="noopener noreferrer">Acesse para mais informações</a></span><br />
                <div className="btn-group">
                  <span className="btn " onClick={() => updateForm(job)}>
                    Editar Vaga
                  </span>
                  <span className="btn delete" onClick={() => deleteJob(job._id)}>
                    Deletar Vaga
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          ''
        )}
        </main>
      </div>
    </div>
  );
}

export default Jobs;
