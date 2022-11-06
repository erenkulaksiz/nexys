import { useEffect } from "react";
import { init } from "speedlog";

export default function App() {
  useEffect(() => {
    /**{
      url: "https://speedlog.io/api/v1",
      token: "YOUR_TOKEN",
      debug: true,
    } */
    init();
  }, []);

  return (
    <div>
      <h1>Web</h1>
    </div>
  );
}
