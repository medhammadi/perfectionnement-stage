import React, { useState } from 'react';

export const Services = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [langues, setLangues] = useState('');
  const [softskills, setSoftSkills] = useState('');
  const [hardskills, setHardSkills] = useState('');
  const [jobdescription, setjobdescription] = useState('');
  const [Data, setData] = useState('');

  const handleInputChange = (event) => {
    setNom(event.target.value);
}
const handleprnom = (event) => {
  setPrenom(event.target.value);
}

const handleadresse = (event) => {
  setAdresse(event.target.value);
}
const handletelephone = (event) => {
  setTelephone(event.target.value);
}
const handleemail = (event) => {
  setEmail(event.target.value);
}
const handlelangues = (event) => {
  setLangues(event.target.value);
}
const handlesoftskills = (event) => {
  setSoftSkills(event.target.value);
}
const handlehardskills = (event) => {
  setHardSkills(event.target.value);
}
const handlejob = (event) => {
  setjobdescription(event.target.value);
}
  const handleSubmit = async () => {
    try {
        // Perform GET request to http://localhost:4000/matching with query parameter
        const getResponse = await fetch(`http://localhost:4000/match?nom=${nom}&prenom=${prenom}&adresse=${adresse}&telephone=${telephone}&Email=${email}&langues=${langues}&softskills=${softskills}&hardskills=${hardskills}&jobdescription=${jobdescription}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!getResponse.ok) {
            throw new Error('Failed to fetch');
        }

        const getResponseData = await getResponse.text();
        setData(getResponseData);
        setError(null);
    } catch (error) {
        setError(error);
        console.error('Error response:', error);
    }
  }

  

  return (
    <div>
      <h1>Please provide your information</h1>
      <input type="text" placeholder="Nom" value={nom} onChange={handleInputChange}  />
      <input type="text" placeholder="Prenom" value={prenom} onChange={handleprnom}  />
      <input type="text" placeholder="Adresse" value={adresse} onChange={handleadresse} />
      <input type="text" placeholder="Telephone" value={telephone} onChange={handletelephone} />
      <input type="text" placeholder="Email" value={email} onChange={handleemail}/>
      <input type="text" placeholder="Langues" value={langues} onChange={handlelangues} />
      <input type="text" placeholder="Soft Skills" value={softskills} onChange={handlesoftskills} />
      <input type="text" placeholder="Hard Skills" value={hardskills} onChange={handlehardskills}/>
      <input type="text" placeholder="job description" value={jobdescription} onChange={handlejob}/>
      <button onClick={handleSubmit}>Submit</button>
      <p>{Data}</p>
    </div>
  );
}
