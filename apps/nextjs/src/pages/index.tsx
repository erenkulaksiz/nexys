import { nexys } from "../utils";

export default function App() {
  return (
    <div>
      <h1>Web</h1>
      <button
        onClick={async () => {
          const log = nexys.log("Info log.");
          console.log("Client return:", log);
        }}
      >
        click to log
      </button>
      <button
        onClick={() => {
          throw new Error("Test purposed throw error.");
        }}
      >
        click to cause an error
      </button>

      <button
        onClick={() => {
          console.log(nexys);
        }}
      >
        click to console log nexys
      </button>

      <button
        onClick={() => {
          nexys.clear();
        }}
      >
        click to clear nexys
      </button>
    </div>
  );
}
