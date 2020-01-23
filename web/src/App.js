import React, { useState, useEffect } from "react";
import api from "./services/api.js";

import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";

import DevForm from "./components/DevForm/index.js";
import DevFormUpdate from "./components/DevFormUpdate/index.js";
import DevItem from "./components/DevItem/index.js";

// Componente -> Bloco isolado de HTML, CSS e JS o qual não interfere no restante da aplicação.
// Propriedade -> Informações que um componente PAI passa para o componente FILHO
// Estado -> Informações mantidas pelo componente (Lembrar: Imutabilidade)

function App() {
  const [devs, setDevs] = useState([]);
  const [devUpdate, setDevUpdate] = useState([]);
  const [insertForm, setInsertForm] = useState(true);
  
  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs");
      
      setDevs(response.data);
    }
    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post("/devs", data);

    setDevs([...devs, response.data]);
  }

  async function changeFormToUpdate(devUpdate){
    await setInsertForm(true);
    setDevUpdate(devUpdate.dev);
    setInsertForm(false);
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

  return (
    <div id="app">
      <aside>
        <strong>DevRadar</strong>
        {(!insertForm) ? <DevFormUpdate devUpdate={devUpdate} onSubmitUpdate={handleUpdateDev} changeFormToCreate={changeFormToCreate} /> : <DevForm onSubmit={handleAddDev} />}
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} changeFormToUpdate={changeFormToUpdate} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
