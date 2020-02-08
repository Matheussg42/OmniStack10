import React, { useState, useEffect } from "react";
import api from "./services/api.js";

import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";

import DevForm from "./components/DevForm/index.js";
import DevFormUpdate from "./components/DevFormUpdate/index.js";
import CompanyForm from "./components/CompanyForm/index.js";
import CompanyFormUpdate from "./components/CompanyFormUpdate/index.js";
import DevItem from "./components/DevItem/index.js";
import CompanyItem from "./components/CompanyItem/index.js";

// Componente -> Bloco isolado de HTML, CSS e JS o qual não interfere no restante da aplicação.
// Propriedade -> Informações que um componente PAI passa para o componente FILHO
// Estado -> Informações mantidas pelo componente (Lembrar: Imutabilidade)

function App() {
  const [devs, setDevs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [devUpdate, setDevUpdate] = useState([]);
  const [insertForm, setInsertForm] = useState(true);
  const [typeProject, setTypeProject] = useState('dev');
  const [insertFormCompany, setInsertFormCompany] = useState(true);
  
  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs");
      
      setDevs(response.data);
    }
    async function loadCompanies() {
      const response = await api.get("/company");
      
      setCompanies(response.data);
    }
    loadDevs();
    loadCompanies();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post("/devs", data);

    setDevs([...devs, response.data]);
  }

  async function deleteUser(deleteUser){
    await api.delete(`/devs/${deleteUser.dev._id}`);

    let filtered = await devs.filter((elem) => {
      return elem._id !== deleteUser.dev._id;
    })

    setDevs(filtered);
  }

  async function changeFormToUpdate(devUpdate){
    await setInsertForm(true);
    setDevUpdate(devUpdate.dev);
    setInsertForm(false);
  }
  
  function setTypeDev(e){
    e.preventDefault();
    setTypeProject('dev');
  }
  
  function setTypeJob(e){
    e.preventDefault();
    setTypeProject('job');
  }

  async function changeFormToCreate(){
    setInsertForm(true);
  }

  async function handleUpdateDev(data){

    var mapped = devs.map((elem) =>{
      if(elem._id === data._id){
        elem.name = data.name;
        elem.bio = data.bio;
        elem.techs = data.techs;
        elem.location.coordinates[0] = data.longitude;
        elem.location.coordinates[1] = data.latitude;
      }
      return elem;
    })

    await api.post(`/devs/${data._id}`, data);
    setDevs(mapped);
  }

  let form;
  let title;
  let item;
  if(typeProject === 'dev'){
    title = 'DevRadar';
    form = !insertForm ? <DevFormUpdate devUpdate={devUpdate} onSubmitUpdate={handleUpdateDev} changeFormToCreate={changeFormToCreate} /> : <DevForm onSubmit={handleAddDev} />
    item = devs.map(dev => (
      <DevItem key={dev._id} dev={dev} changeFormToUpdate={changeFormToUpdate} deleteUser={deleteUser} />
    ));
  }else{ 
    title = 'JobRadar';
    form = !insertFormCompany ? <CompanyFormUpdate devUpdate={devUpdate} onSubmitUpdate={handleUpdateDev} changeFormToCreate={changeFormToCreate} /> : <CompanyForm onSubmit={handleAddDev} />;
    item = companies.map(company => (
      <CompanyItem key={company._id} company={company} changeFormToUpdate={changeFormToUpdate} deleteUser={deleteUser} />
    ));
  }

  return (
    <div id="app">
      <aside>
        <strong>{title}</strong>
        <div className="option-group">
          <span className="btn-item" onClick={setTypeDev}>
            Dev
          </span>
          <span className="btn-item" onClick={setTypeJob}>
            Empresa
          </span>
        </div>
        
        {form}
        
      </aside>
      <main>
        <ul>
          {item}
        </ul>
      </main>
    </div>
  );
}

export default App;
