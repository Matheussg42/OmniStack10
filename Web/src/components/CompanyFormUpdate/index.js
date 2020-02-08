import React, { useState } from "react";

function CompanyFormUpdate({ companyUpdate, onSubmitUpdate, changeFormToCreate }) {
  console.log(companyUpdate)
  const [_id, set_id] = useState(companyUpdate._id);
  const [name, setName] = useState(companyUpdate.name);
  const [avatar_url, setAvatar_url] = useState(companyUpdate.avatar_url);
  const [desc, setDesc] = useState(companyUpdate.desc);
  const [jobs, setJobs] = useState(companyUpdate.jobs);
  const [latitude, setLatitude] = useState(companyUpdate.location.coordinates[1]);
  const [longitude, setLongitude] = useState(companyUpdate.location.coordinates[0]);
  
  async function handleSubmitUpdate(e) {
    e.preventDefault();

    await changeFormToCreate();
    await onSubmitUpdate({
      _id,
      name,
      desc,
      jobs,
      avatar_url,
      latitude,
      longitude
    });

    set_id("");
    setAvatar_url("");
    setName("");
    setDesc("");
    setJobs("");
    setLatitude("");
    setLongitude("");
  }

  return (
    <form onSubmit={handleSubmitUpdate}>
     
      <input name="_id" id="_id" type="hidden" value={_id} />

      <div className="input-block">
        <label htmlFor="name">Nome</label>
        <input
          name="name"
          id="name"
          required
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className="input-block">
        <label htmlFor="avatar_url">Link da Imagem</label>
        <input
          name="avatar_url"
          id="avatar_url"
          required
          value={avatar_url}
          onChange={e => setAvatar_url(e.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="desc">Descrição</label>
        <input
          name="desc"
          id="desc"
          required
          value={desc ? desc : ''}
          onChange={e => setDesc(e.target.value)}
        />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number"
            name="latitude"
            id="latitude"
            required
            value={latitude}
            onChange={e => setLatitude(e.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="logitude">Logitude</label>
          <input
            type="number"
            name="logitude"
            id="logitude"
            required
            value={longitude}
            onChange={e => setLongitude(e.target.value)}
          />
        </div>
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
}

export default CompanyFormUpdate;
