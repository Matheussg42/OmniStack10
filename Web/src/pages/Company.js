import React, { useState, useEffect } from "react";
import api from "../services/api.js";

import "../global.css";
import "../App.css";
import "../Sidebar.css";
import "../Main.css";


import CompanyForm from "../components/CompanyForm/index.js";
import CompanyFormUpdate from "../components/CompanyFormUpdate/index.js";
import CompanyItem from "../components/CompanyItem/index.js";

// Componente -> Bloco isolado de HTML, CSS e JS o qual não interfere no restante da aplicação.
// Propriedade -> Informações que um componente PAI passa para o componente FILHO
// Estado -> Informações mantidas pelo componente (Lembrar: Imutabilidade)

function App() {
  const [companies, setCompanies] = useState([]);
  const [insertForm, setInsertForm] = useState(true);
  const [companyUpdate, setCompanyUpdate] = useState([]);
  
  useEffect(() => {

    async function loadCompanies() {
      const response = await api.get("/company");
      
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


  return (
    <div id="app">
      <aside>
        <strong>JobRadar</strong>
        {/* <div className="option-group">
          <span className="btn-item" onClick={setTypeDev}>
            Dev
          </span>
          <span className="btn-item" onClick={setTypeJob}>
            Empresa
          </span>
        </div> */}
        
        {!insertForm ? <CompanyFormUpdate companyUpdate={companyUpdate} onSubmitUpdate={handleUpdateCompany} changeFormToCreate={changeFormToCreate} /> : <CompanyForm onSubmit={handleAddCompany} /> }
        
      </aside>
      <main>
        <ul>
          {companies.map(company => (
            <CompanyItem key={company._id} changeFormToUpdate={changeFormToUpdate} company={company} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
