import React, { useState } from 'react';

export const Compare = () => {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [Data, setData] = useState('');

    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    }
    const handleChange = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
    fetch('http://localhost:4000//upload', {
        method: 'POST',
        body: formData
    }).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
      });
    };
    const handleSubmit = async () => {
        try {
            // Perform GET request to http://localhost:4000/matching with query parameter
            const getResponse = await fetch(`http://localhost:4000/matching?content=${inputText}`, {
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
            <input type="text" value={inputText} onChange={handleInputChange} />
            <input type="file" className='form-control' onChange={handleChange} />
            <button onClick={handleSubmit}>Submit</button>
            {error && <div>Error: {error.message}</div>}
            <div>Output: {Data}</div>
        </div>
    );
}
