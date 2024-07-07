import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [qrCode, setQrCode] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://qrcode-dga7.onrender.com/generate', { url });
      setQrCode(response.data.qrCode);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>QR Code Generator</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
            required
          />
          <button type="submit">Generate QR Code</button>
        </form>
        {qrCode && (
          <div>
            <img src={`data:image/png;base64,${qrCode}`} alt="QR Code" />
            <a href={`data:image/png;base64,${qrCode}`} download="qr_code.png">Download QR Code</a>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
