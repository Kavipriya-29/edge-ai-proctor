import { useState } from "react";

import Header from "./components/Header";
import WebcamFeed from "./components/WebcamFeed";
import StatusCard from "./components/StatusCard";
import AlertCounter from "./components/AlertCounter";
import EventLogs from "./components/EventLogs";
import Footer from "./components/Footer";

import "./styles/app.css";

function App() {
  const [status, setStatus] = useState("🟢 Looking at Screen");
  const [faceCount, setFaceCount] = useState(0);
  const [multipleFaceAlerts, setMultipleFaceAlerts] = useState(0);
  const [lookingAwayAlerts, setLookingAwayAlerts] = useState(0);
  const [logs, setLogs] = useState([]);

  return (
    <div className="app">
      <Header />

      <div className="dashboard">
        <div className="left-panel">
          <WebcamFeed
            status={status}
            setStatus={setStatus}
            faceCount={faceCount}
            setFaceCount={setFaceCount}
            logs={logs}
            setLogs={setLogs}
            multipleFaceAlerts={multipleFaceAlerts}
            setMultipleFaceAlerts={setMultipleFaceAlerts}
            lookingAwayAlerts={lookingAwayAlerts}
            setLookingAwayAlerts={setLookingAwayAlerts}
          />
        </div>

        <div className="right-panel">
          <StatusCard status={status} />

          <AlertCounter
            faceAlerts={multipleFaceAlerts}
            awayAlerts={lookingAwayAlerts}
          />

          <EventLogs logs={logs} />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;