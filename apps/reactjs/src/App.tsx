import { nexys } from "./utils";

function App() {
  return (
    <div>
      <div>
        <div>
          asdasdassads
          <input type="text" />
        </div>
      </div>
      <input type="text" />
      <button className="test1" id="test1" style={{ background: "red" }}>
        Hello world!
      </button>
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
              name: "steve",
              age: 24,
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
              name: "steve",
              age: 24,
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
              name: "steve",
              age: 24,
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
      <button
        onClick={() => {
          nexys.configure((config) => {
            config.setUser("erenkulaksz@gmail.com");
          });
        }}
      >
        set user
      </button>
      <button id="test" className="test">
        id=test
      </button>
      <button id="test" className="test">
        id=test
      </button>
    </div>
  );
}

export default App;
