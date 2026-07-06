function AlertCounter({ faceAlerts, awayAlerts }) {
  const totalAlerts = faceAlerts + awayAlerts;

  return (
    <div className="card">
      <h2>🚨 Alert Counter</h2>

      <div style={{ marginTop: "15px" }}>
        <p><strong>Total Alerts:</strong> {totalAlerts}</p>

        <hr style={{ margin: "12px 0" }} />

        <p>👥 Multiple Face Alerts : {faceAlerts}</p>

        <p style={{ marginTop: "10px" }}>
          👀 Looking Away Alerts : {awayAlerts}
        </p>
      </div>
    </div>
  );
}

export default AlertCounter;