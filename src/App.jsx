import React, { useState } from 'react';

function App() {
  const [url, setUrl] = useState('');

  const handleCreateApp = async () => {
    // ⚠️ အရေးကြီး - အစ်ကို့ရဲ့ Token အသစ်ကို ဒီနေရာမှာ ထည့်ပါ
    const GITHUB_TOKEN = "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"; 
    const OWNER = "theinlwin451"; 
    const REPO = "tl-webview-builder";

    if(!url) return alert("Link အရင်ထည့်ပါ");

    try {
      // ⚠️ ဒီစာကြောင်းမှာ Backtick ( ` ) ကို သေသေချာချာ သုံးထားပါတယ်
      const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/dispatches`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({
          event_type: 'build_apk',
          client_payload: { url: url }
        })
      });

      if (response.ok) {
        alert("အောင်မြင်ပါတယ်။ GitHub Actions မှာ APK စဆွဲနေပါပြီ။");
      } else {
        alert("GitHub နှင့် ချိတ်ဆက်ရာတွင် အဆင်မပြေပါ။ Token မှန်မမှန် ပြန်စစ်ပေးပါ။");
      }
    } catch (e) { 
      alert("Error တက်သွားပါတယ်"); 
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#E1B000', minHeight: '100vh' }}>
      <h1 style={{ color: '#7b1fa2' }}>TL App Builder</h1>
      <div style={{ margin: '40px 0' }}>
        <p style={{ fontWeight: 'bold' }}>Enter Website URL:</p>
        <input 
          type="text" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://google.com"
          style={{ width: '80%', padding: '12px', borderRadius: '8px', border: '2px solid #ccc' }}
        />
      </div>
      <button 
        onClick={handleCreateApp}
        style={{ padding: '15px 40px', backgroundColor: '#7b1fa2', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
      >
        Create App (Build APK)
      </button>
    </div>
  );
}

export default App;
