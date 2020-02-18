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

function Jobs({match}) {
  console.log(match.params.id);
  const [companies, setCompanies] = useState([]);
  const [insertForm, setInsertForm] = useState(true);
  const [showJobs, setShowJobs] = useState(false);
  const [companyToShow, setCompanyToShow] = useState(false);
  const [companyUpdate, setCompanyUpdate] = useState([]);
  
  useEffect(() => {

    async function loadCompanies() {
      const response = await api.get("/company");
      
      setCompanies(response.data);
    }
    loadCompanies();
  }, []);

  return (
    <div>
      <Header />
      <div id="app">
        <aside>
          <strong>JobRadar</strong>
          {/* {!insertForm ? <CompanyFormUpdate companyUpdate={companyUpdate} onSubmitUpdate={handleUpdateCompany} changeFormToCreate={changeFormToCreate} /> : <CompanyForm onSubmit={handleAddCompany} /> } */}
        </aside>
        <main>
          <ul>
            <CompanyJobs key={companyToShow._id} company={companyToShow}/>
          </ul>
        </main>
      </div>
    </div>
  );
}

export default Jobs;
