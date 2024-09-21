import './home.css'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState,useEffect} from 'react';



import Box from '@mui/material/Box';

import ModaleMissing from './ModaleMissing';

export const Home = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [viewPdf, setViewPdf] = useState(null);
  const [cvCondidat, setcvCondidat] = useState('');
  const [data, setData] = useState('');
  const [scoreEurope, setEuropeScore] = useState('');
  const [scoreCanda, setCanadaScore] = useState('');

  const [missingEurope, setEuropeMissing] = useState('');
  const [missingCanda, setCanadaMissing] = useState('');
  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  


  

  if (data === null) {
    return null; // Render nothing if data is null
  }
  const userCondidatName = localStorage.getItem('username');
  const user_id = localStorage.getItem('user_id');
  const navigate = useNavigate();

  const fileType = ['application/pdf'];
  const workerUrl = 'https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js';

  const handleChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:4000//upload', {
        method: 'POST',
        body: formData
    })
    .then(response => {
      console.log(response)
      fetchCVData()
    })
    .catch(error => {
      console.log(error)
      });
      
    let selectedFile = e.target.files[0];
    if (selectedFile && fileType.includes(selectedFile.type)) {
      let reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = (e) => {
        setPdfFile(e.target.result);
        setcvCondidat(selectedFile); // Set the file itself to cvCondidat state
      };
    } else {
      setPdfFile(null);
      setcvCondidat(''); // Reset cvCondidat if no valid file selected
    }
    
  };

  const fetchCVData = () => {
    fetch('http://localhost:4000//cv')
    .then(response => response.json())
    .then(data => {
      console.log('CV Data:', data);
      setCanadaScore(data.canadian_score)
      setEuropeScore(data.european_score)
      setCanadaMissing(data.missingElementsCanadian)
      setEuropeMissing(data.missingElementsEuropean)
      console.log(scoreEurope)

      
    })
    .catch(error => console.error('Error fetching CV data:', error));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pdfFile !== null) {
      if (user_id === null) {
        navigate("/login");
      } else {
   
        setViewPdf(pdfFile);
       
        
        
        const endpoint = 'http://localhost:5000/cv';
        try {
          const formData = new FormData();
          formData.append('cvCondidat', cvCondidat);
          formData.append('userId', user_id);
          const response = await axios.post(endpoint, formData);
          console.log(response.data);
        } catch (error) {
          console.error('Error posting data:', error);
        }
      }
    } else{
      setViewPdf(null);
    }
  };


  return (
    <div>
      <section id="mainContainer">
        <center>
          <div className='container'>
            <form onSubmit={handleSubmit}>
              <input type="file" className='form-control' onChange={handleChange}  />
              <button type='submit' className='btn btn-success'>👀 View PDF 📄</button>
            </form>
            <h2>👀 View PDF 📄</h2>
            <div className='pdf-container'>
              <Worker workerUrl={workerUrl}>
                {viewPdf ? <Viewer fileUrl={viewPdf} /> : <>No PDF 🙅‍♂️</>}
              </Worker>
            </div>
          </div>
          <p>{data}</p>
        </center>

        <ModaleMissing scoreEurope={scoreEurope} scoreCanda={scoreCanda} missingEurope={missingEurope} missingCanda={missingCanda}/>
        
      </section>
      
      
    </div>

  );
};

