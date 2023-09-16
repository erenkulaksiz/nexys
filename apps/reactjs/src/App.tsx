import { nexys } from "./utils";

function App() {
  return (
    <div>
      <button>Hello world!</button>
      <button onClick={() => nexys.init()}>init</button>
      <button
        onClick={async () => {
          const log = await nexys.log("Info log.", { type: "INFO" });
          console.log("Client return:", log);
        }}
      >
        click to log with options
      </button>

      <button
        onClick={async () => {
          const log = await nexys.log(
            {
              name: 'steve',
              age: 24
            },
            { type: "INFO" }
          );
          console.log("Client return:", log);
        }}
      >
        click to log with options & data is object
      </button>

      <button
        onClick={async () => {
          const log = await nexys.log(
            {
              name: 'steve',
              age: 24
            },
            { type: "ERROR" }
          );
          console.log("Client return:", log);
        }}
      >
        click to log with type error
      </button>

      <button
        onClick={async () => {
          const log = await nexys.clear();
          console.log("Client return:", log);
        }}
      >
        click to clear
      </button>

      <button
        onClick={async () => {
          const log = await nexys.log(
            {
              name: 'steve',
              age: 24
            },
            { type: "WARNING" }
          );
          console.log("Client return:", log);
        }}
      >
        click to log with type warning
      </button>

      <button
        onClick={() => {
          nexys.forceRequest();
        }}
      >
        click to send all logs
      </button>

      <button
        onClick={() => {
          console.log(nexys.getLogPoolLogs());
        }}
      >
        click to view log pool
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
          throw new Error("Test purposed throw error.");
        }}
      >
        click to cause an error
      </button>

      <button
        onClick={() => {
          nexys.configure((config) => {
            config.setPlatform("web");
          });
        }}
      >
        set platform
      </button>
    </div>
  );
}

export default App;
