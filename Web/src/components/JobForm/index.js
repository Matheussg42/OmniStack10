import React, { useState } from "react";

function DevForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [Desc, setDesc] = useState("");
  const [Link, setLink] = useState("");
  const [Techs, setTechs] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      title,
      Desc,
      Link,
      Techs
    });

    // setTitle("");
    // setTechs("");
    // setDesc("");
    // setLink("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="title">Titulo</label>
        <input
          name="title"
          id="title"
          required
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="Desc">Descrição</label>
        <input
          name="Desc"
          id="Desc"
          required
          value={Desc}
          onChange={e => setDesc(e.target.value)}
        />
      </div>
      <div className="input-block">
        <label htmlFor="Link">Link da Vaga</label>
        <input
          name="Link"
          id="Link"
          required
          value={Link}
          onChange={e => setLink(e.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="Techs">Tecnologias</label>
        <input
          name="Techs"
          id="Techs"
          required
          value={Techs}
          onChange={e => setTechs(e.target.value)}
        />
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
}

export default DevForm;
