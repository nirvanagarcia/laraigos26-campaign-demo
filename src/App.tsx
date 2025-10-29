import { CampaignAdvanced } from './components/CampaignAdvanced';

function App() {
  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '200px',
        height: '200px',
        background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.1), rgba(245, 87, 108, 0.1))',
        borderRadius: '50%',
        filter: 'blur(40px)',
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '5%',
        width: '300px',
        height: '300px',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(52, 211, 153, 0.1))',
        borderRadius: '50%',
        filter: 'blur(60px)',
      }} />
      
      <CampaignAdvanced />
    </div>
  );
}

export default App;