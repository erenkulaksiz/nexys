import nexys from "nexys";

export default function App() {
  return (
    <div>
      <h1>Web</h1>
      <button onClick={() => nexys.log("test.", "internal/button")}>
        click to log
      </button>
    </div>
  );
}
