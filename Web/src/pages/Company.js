import React, { useState, useEffect } from "react";
import api from "../services/api.js";

import "../global.css";
import "../App.css";
import "../Sidebar.css";
import "../Main.css";


import CompanyForm from "../components/CompanyForm/index.js";
import CompanyFormUpdate from "../components/CompanyFormUpdate/index.js";
import CompanyItem from "../components/CompanyItem/index.js";
import CompanyJobs from "../components/CompanyJob/index";
import Header from "../components/Header/index";

// Componente -> Bloco isolado de HTML, CSS e JS o qual não interfere no restante da aplicação.
// Propriedade -> Informações que um componente PAI passa para o componente FILHO
// Estado -> Informações mantidas pelo componente (Lembrar: Imutabilidade)

function Company() {
  const [companies, setCompanies] = useState([]);
  const [insertForm, setInsertForm] = useState(true);
  const [companyUpdate, setCompanyUpdate] = useState([]);
  const [showJobs, setShowJobs] = useState(false);
  const [companyToShow, setCompanyToShow] = useState(false);

  useEffect(() => {

    async function loadCompanies() {
      const response = await api.get("/company");
      
      console.log(response);

      setCompanies(response.data);
    }
    loadCompanies();
  }, []);

  async function handleAddCompany(data) {
    const response = await api.post("/company", data);

    setCompanies([...companies, response.data]);
  }

  async function changeFormToUpdate(companyUpdate){
    await setInsertForm(true);
    setCompanyUpdate(companyUpdate.company);
    setInsertForm(false);
  }

  async function changeFormToCreate(){
    setInsertForm(true);
  }

  async function handleUpdateCompany(data){

    var mapped = companies.map((elem) =>{
      if(elem._id === data._id){
        elem.name = data.name;
        elem.desc = data.desc;
        elem.avatar_url = data.avatar_url;
        elem.jobs = ( data.jobs === null || data.jobs === undefined) ? [] : data.jobs;
        elem.location.coordinates[0] = data.longitude;
        elem.location.coordinates[1] = data.latitude;
      }
      return elem;
    })

    await api.post(`/company/${data._id}`, data);
    setCompanies(mapped);
  }

  async function deleteCompany(deleteCompany){
    await api.delete(`/company/${deleteCompany.company._id}`);

    let filtered = await companies.filter((elem) => {
      return elem._id !== deleteCompany.company._id;
    })

    setCompanies(filtered);
  }

  return (
    <div>
      <Header />
      <div id="app">
        <aside>
          <strong>JobRadar</strong>
          {!insertForm ? <CompanyFormUpdate companyUpdate={companyUpdate} onSubmitUpdate={handleUpdateCompany} changeFormToCreate={changeFormToCreate} /> : <CompanyForm onSubmit={handleAddCompany} /> }
        </aside>
        <main>
          <ul>
            {companies.map(company => (
                <CompanyItem key={company._id} changeFormToUpdate={changeFormToUpdate} deleteCompany={deleteCompany} company={company} />
              ))
            }
          </ul>
        </main>
      </div>
    </div>
  );
}

export default Company;
