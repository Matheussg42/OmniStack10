import React, { useState } from "react";
import parseStringAsArray from '../../utils/parseStringAsArray';

function DevForm({ onUpdate, jobToUpdate }) {
  const [_id, set_id] = useState(jobToUpdate._id);
  const [title, setTitle] = useState(jobToUpdate.title);
  const [Desc, setDesc] = useState(jobToUpdate.Desc);
  const [Link, setLink] = useState(jobToUpdate.Link);
  const [Techs, setTechs] = useState(jobToUpdate.Techs.join(", "));

  async function handleSubmit(e) {
    e.preventDefault();

    await onUpdate({
      _id,
      title,
      Desc,
      Link,
      Techs: parseStringAsArray(Techs)
    });

    set_id("");
    setTitle("");
    setTechs("");
    setDesc("");
    setLink("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="_id" value={_id}/>
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
