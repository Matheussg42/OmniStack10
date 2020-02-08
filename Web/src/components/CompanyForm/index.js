import React, { useState, useEffect } from "react";

function DevForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [avatar_url, setAvatar_url] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      error => {
        console.log(error);
      },
      {
        timeout: 30000
      }
    );
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const jobs =[];

    await onSubmit({
      name,
      desc,
      avatar_url,
      jobs,
      latitude,
      longitude
    });

    setName("");
    setDesc("");
    setAvatar_url("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="name">Nome da Empresa</label>
        <input
          name="name"
          id="name"
          required
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="desc">Descrição</label>
        <input
          name="desc"
          id="desc"
          required
          value={desc}
          onChange={e => setDesc(e.target.value)}
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
