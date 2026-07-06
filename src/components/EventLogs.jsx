function EventLogs({ logs }) {
  return (
    <div className="card">
      <h2>📋 Event Logs</h2>

      {logs.length === 0 ? (
        <div className="no-logs">
          <p>✅ No alerts detected</p>
        </div>
      ) : (
        <ul className="logs-list">
          {logs.map((log, index) => (
            <li key={index} className="log-item">
              {log}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EventLogs;