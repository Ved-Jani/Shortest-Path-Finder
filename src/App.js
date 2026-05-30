import React, { useState } from 'react';
import './App.css';
import Routes from './routes';

const App = () => {
  const [data, setData] = useState(null);
  const [display, setDisplay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('side-by-side'); // 'outline', 'satellite', 'side-by-side'
  const [sourceVal, setSourceVal] = useState('');
  const [destVal, setDestVal] = useState('');

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    if (!sourceVal || !destVal) return;
    
    setLoading(true);
    setError(null);
    setDisplay(false);

    try {
      const response = await fetch(`/api/shortd/${sourceVal}/${destVal}`);
      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }
      const jsonData = await response.json();
      
      if (jsonData && jsonData.path) {
        setData(jsonData);
        setDisplay(true);
      } else {
        throw new Error("Invalid path data received from server.");
      }
    } catch (err) {
      console.error('Error fetching path:', err);
      setError('Failed to calculate path. Please ensure the local backend server is running or try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSourceVal('');
    setDestVal('');
    setData(null);
    setDisplay(false);
    setError(null);
  };

  return (
    <div className='mainContainer'>
      <header className='appHeader'>
        <div className='headerIcon'>
          <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        </div>
        <div className='headerTextGroup'>
          <h1 className='projectHeader'>IIT Guwahati Navigation</h1>
          <p className='projectSubheader'>Campus Shortest Path Finder</p>
        </div>
      </header>

      <div className='contentLayout'>
        {/* Left Column: Control Panel */}
        <section className='controlPanelCard'>
          <div className='cardHeader'>
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            <h2>Find Route</h2>
          </div>
          
          <form onSubmit={onsubmitHandler} className='formGroup'>
            <div className='inputFieldGroup'>
              <label htmlFor='source'>
                <span className='inputLabelText'>Source Node (1-64)</span>
              </label>
              <div className='inputWrapper'>
                <span className='inputIcon srcPin'></span>
                <input 
                  id='source' 
                  name='a' 
                  type='number' 
                  min={1} 
                  max={64} 
                  placeholder='Enter Source Node' 
                  className='sourceInput' 
                  value={sourceVal}
                  onChange={(e) => setSourceVal(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className='inputFieldGroup'>
              <label htmlFor='destination'>
                <span className='inputLabelText'>Destination Node (1-64)</span>
              </label>
              <div className='inputWrapper'>
                <span className='inputIcon destPin'></span>
                <input 
                  id='destination' 
                  name='b' 
                  type='number' 
                  min={1} 
                  max={64} 
                  placeholder='Enter Destination Node' 
                  className='destinationInput' 
                  value={destVal}
                  onChange={(e) => setDestVal(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className='buttonButtonGroup'>
              <button type='submit' className='formButton' disabled={loading}>
                {loading ? (
                  <span className='loadingSpinnerWrapper'>
                    <span className='loadingSpinner'></span>
                    Calculating...
                  </span>
                ) : 'Find Path'}
              </button>
              
              {(sourceVal || destVal || display) && (
                <button type='button' className='clearButton' onClick={handleClear}>
                  Clear
                </button>
              )}
            </div>
          </form>

          {error && (
            <div className='errorBanner'>
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              <span>{error}</span>
            </div>
          )}

          {loading && (
            <div className='statusBanner info'>
              <span className='loadingPulse'></span>
              <span>Calculating fastest route...</span>
            </div>
          )}

          <div className='projectDisplay'>
            {display && <Routes dataPoint={data} />}
          </div>
        </section>

        {/* Right Column: Maps Display */}
        <section className='mapViewCard'>
          <div className='mapTabsContainer'>
            <button 
              className={`mapTabButton hide-mobile ${activeTab === 'side-by-side' ? 'active' : ''}`}
              onClick={() => setActiveTab('side-by-side')}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="3" x2="12" y2="21"></line></svg>
              Side-by-Side
            </button>
            <button 
              className={`mapTabButton ${activeTab === 'satellite' ? 'active' : ''}`}
              onClick={() => setActiveTab('satellite')}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>
              Campus Map
            </button>
            <button 
              className={`mapTabButton ${activeTab === 'outline' ? 'active' : ''}`}
              onClick={() => setActiveTab('outline')}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
              Node References
            </button>
          </div>

          <div className={`Maps ${activeTab}`}>
            {(activeTab === 'satellite' || activeTab === 'side-by-side') && (
              <div className='mapContainer satelliteMapWrapper'>
                <div className='mapLabel'>Campus Map</div>
                <div className='satMap'></div>
              </div>
            )}
            {(activeTab === 'outline' || activeTab === 'side-by-side') && (
              <div className='mapContainer outlineMapWrapper'>
                <div className='mapLabel'>Node References</div>
                <div className='outMap'></div>
              </div>
            )}
          </div>
        </section>
      </div>
      
      <footer className='appFooter'>
        <p>&copy; {new Date().getFullYear()} IIT Guwahati Shortest Path Finder</p>
      </footer>
    </div>
  );
};

export default App;