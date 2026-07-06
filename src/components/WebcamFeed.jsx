import { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { loadFaceDetector } from "../services/faceDetection";

function WebcamFeed({
  setStatus,
  setFaceCount,
  setLogs,
  setMultipleFaceAlerts,
  setLookingAwayAlerts,
}) {
  const webcamRef = useRef(null);
  const detectorRef = useRef(null);

  const awayStart = useRef(null);
  const lastFaceAlert = useRef(0);
  const lastAwayAlert = useRef(0);

  useEffect(() => {
    let interval;

    async function init() {
      detectorRef.current = await loadFaceDetector();

      interval = setInterval(() => {
        detectFrame();
      }, 300);
    }

    init();

    return () => clearInterval(interval);
  }, []);

  const detectFrame = () => {
    if (!detectorRef.current) return;
    if (!webcamRef.current?.video) return;

    const video = webcamRef.current.video;

    if (video.readyState !== 4) return;

    const results = detectorRef.current.detectForVideo(
      video,
      performance.now()
    );

    const faces = results.faceLandmarks?.length || 0;

    console.log("Faces:", faces);

    setFaceCount(faces);

    // -----------------------------
    // NO FACE
    // -----------------------------

    if (faces === 0) {
      setStatus("🟠 No Face Detected");
      awayStart.current = null;
      return;
    }

    // -----------------------------
    // MULTIPLE FACE
    // -----------------------------

    if (faces > 1) {
      setStatus("🔴 Multiple Faces Detected");

      if (Date.now() - lastFaceAlert.current > 3000) {
        lastFaceAlert.current = Date.now();

        setMultipleFaceAlerts((c) => c + 1);

        setLogs((prev) => [
          `👥 Multiple Faces - ${new Date().toLocaleTimeString()}`,
          ...prev,
        ]);
      }

      return;
    }

    // -----------------------------
    // SINGLE FACE
    // -----------------------------

    const face = results.faceLandmarks[0];

    if (!face) return;

    // Nose landmark
    const nose = face[1];

    console.log("Nose X:", nose.x);

    // Demo threshold
    if (nose.x < 0.40 || nose.x > 0.60) {
      if (!awayStart.current) {
        awayStart.current = Date.now();
      }

      const elapsed = Date.now() - awayStart.current;

      if (elapsed >= 5000) {
        setStatus("🟠 Looking Away");

        if (Date.now() - lastAwayAlert.current > 5000) {
          lastAwayAlert.current = Date.now();

          setLookingAwayAlerts((c) => c + 1);

          setLogs((prev) => [
            `👀 Looking Away - ${new Date().toLocaleTimeString()}`,
            ...prev,
          ]);
        }
      } else {
        setStatus(
          `🟠 Looking Away (${Math.ceil((5000 - elapsed) / 1000)}s)`
        );
      }
    } else {
      awayStart.current = null;
      setStatus("🟢 Looking at Screen");
    }
  };

  return (
    <div className="card">
      <h2>📷 Webcam Feed</h2>

      <div className="webcam-container">
        <Webcam
          ref={webcamRef}
          audio={false}
          mirrored
          screenshotFormat="image/jpeg"
          videoConstraints={{
            width: 640,
            height: 480,
            facingMode: "user",
          }}
          className="webcam"
        />
      </div>
    </div>
  );
}

export default WebcamFeed;