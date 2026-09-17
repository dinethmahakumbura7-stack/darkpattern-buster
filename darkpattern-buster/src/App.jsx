import { useState, useEffect } from 'react';

export default function App() {
  const [scanData, setScanData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Read latest scan results from Chrome local storage
  const loadLatestScan = () => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(['latestScan'], (result) => {
        if (result.latestScan) {
          setScanData(result.latestScan);
        }
        setLoading(false);
      });
    } else {
      // Mock data preview for local web development
      setScanData({
        score: 55,
        findings: [
          { id: '1', label: 'Preselected Charge', details: 'Add $14.99 extended replacement plan', severity: 'high' },
          { id: '2', label: 'Artificial Urgency Timer', details: 'Active timer detected: "04:59"', severity: 'medium' },
          { id: '3', label: 'Confirmshaming Opt-out', details: 'No thanks, I prefer paying full price', severity: 'medium' }
        ]
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLatestScan();
  }, []);

  // Dynamic color coding based on Deception Score
  const getScoreColor = (score) => {
    if (score >= 50) return 'text-red-400 border-red-500';
    if (score >= 20) return 'text-amber-400 border-amber-500';
    return 'text-emerald-400 border-emerald-500';
  };

  return (
    <div className="w-[360px] min-h-[420px] bg-slate-900 text-slate-100 font-sans p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div>
          <h1 className="text-base font-bold text-slate-100 flex items-center gap-1.5">
            🛡️ DarkPattern Buster
          </h1>
          <p className="text-[11px] text-slate-400">Manipulative UX Inspector</p>
        </div>
        <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 font-mono">
          v1.0
        </span>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
          Scanning current page...
        </div>
      ) : (
        <>
          {/* Deception Score Gauge */}
          <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 flex items-center justify-between mb-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                Deception Score
              </span>
              <span className="text-xs text-slate-400">
                {scanData?.score >= 50
                  ? 'Severe manipulation detected'
                  : scanData?.score > 0
                  ? 'Deceptive patterns present'
                  : 'Page looks safe'}
              </span>
            </div>
            <div className={`w-14 h-14 rounded-full border-4 flex items-center justify-center text-xl font-black ${getScoreColor(scanData?.score || 0)}`}>
              {scanData?.score || 0}
            </div>
          </div>

          {/* Findings List */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-2">
            <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Detected Patterns ({scanData?.findings?.length || 0})
            </h2>

            {scanData?.findings?.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-500 bg-slate-800/40 rounded-lg border border-slate-800">
                No active deceptive patterns detected on this page.
              </div>
            ) : (
              scanData?.findings?.map((item) => (
                <div key={item.id} className="p-3 bg-slate-800/60 rounded-lg border border-slate-700/80 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-slate-200">{item.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-bold ${
                        item.severity === 'high'
                          ? 'bg-red-950 text-red-400 border border-red-800'
                          : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}
                    >
                      {item.severity}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px] truncate">{item.details}</p>
                </div>
              ))
            )}
          </div>

          {/* Refresh Trigger */}
          <button
            onClick={loadLatestScan}
            className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition"
          >
            Refresh Analysis
          </button>
        </>
      )}
    </div>
  );
}