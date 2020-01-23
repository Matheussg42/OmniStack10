import React, { useState } from "react";

function DevForm({ devUpdate, onSubmitUpdate, changeFormToCreate }) {
  console.log(devUpdate)
  const [_id, set_id] = useState(devUpdate._id);
  const [name, setName] = useState(devUpdate.name);
  const [github_username, setGithubUsername] = useState(devUpdate.github_username);
  const [avatar_url, setAvatar_url] = useState(devUpdate.avatar_url);
  const [bio, setBio] = useState(devUpdate.bio);
  const [techs, setTechs] = useState(devUpdate.techs);
  const [latitude, setLatitude] = useState(devUpdate.location.coordinates[1]);
  const [longitude, setLongitude] = useState(devUpdate.location.coordinates[0]);
  
  async function handleSubmitUpdate(e) {
    e.preventDefault();

    await changeFormToCreate();
    await onSubmitUpdate({
      _id,
      name,
      bio,
      techs,
      github_username,
      avatar_url,
      latitude,
      longitude
    });

    set_id("");
    setGithubUsername("");
    setAvatar_url("");
    setName("");
    setBio("");
    setTechs("");
    setLatitude("");
    setLongitude("");
  }

  return (
    <form onSubmit={handleSubmitUpdate}>
     
      <input name="_id" id="_id" type="hidden" value={_id} />
      <input name="github_username" id="github_username" type="hidden" value={github_username} />
      <input name="avatar_url" id="avatar_url" type="hidden" value={avatar_url} />

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
        <label htmlFor="name">Bio</label>
        <input
          name="bio"
          id="bio"
          required
          value={bio ? bio : ''}
          onChange={e => setBio(e.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input
          name="techs"
          id="techs"
          required
          value={techs}
          onChange={e => setTechs(e.target.value)}
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

export default DevForm;
