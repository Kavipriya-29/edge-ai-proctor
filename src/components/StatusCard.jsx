function StatusCard({ status }) {
  let statusClass = "status-good";

  if (status.includes("Multiple")) {
    statusClass = "status-danger";
  } else if (status.includes("Away")) {
    statusClass = "status-warning";
  }

  return (
    <div className="card">
      <h2>📊 System Status</h2>

      <h3 className={statusClass}>
        {status}
      </h3>
    </div>
  );
}

export default StatusCard;