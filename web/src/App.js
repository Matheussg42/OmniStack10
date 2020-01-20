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

  async function changeForUpdateForm(){
    setInsertForm(false);
    console.log('mudou');
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        {(!insertForm) ? <DevFormUpdate /> : <DevForm onSubmit={handleAddDev} />}
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} form={changeForUpdateForm} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
