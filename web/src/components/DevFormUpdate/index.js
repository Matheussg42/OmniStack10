import React, { useState, useEffect } from "react";

function DevForm({ devUpdate, onSubmit }) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [techs, setTechs] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  
  useEffect(() => {
    console.log(devUpdate)
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

    await onSubmit({
      name,
      bio,
      techs,
      latitude,
      longitude
    });

    setName("");
    setBio("");
    setTechs("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="name">Nome</label>
        <input
          name="name"
          id="name"
          required
          value={devUpdate.name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="name">Bio</label>
        <input
          name="bio"
          id="bio"
          required
          value={devUpdate.bio}
          onChange={e => setBio(e.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input
          name="techs"
          id="techs"
          required
          value={devUpdate.techs}
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
            value={devUpdate.location.coordinates[1]}
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
            value={devUpdate.location.coordinates[0]}
            onChange={e => setLongitude(e.target.value)}
          />
        </div>
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
}

export default DevForm;
