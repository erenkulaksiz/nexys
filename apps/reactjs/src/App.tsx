import { nexys } from "./utils";

function App() {
  return (
    <div>
      <h1>Web</h1>
      <button
        onClick={() => {
          console.log(window["nexys"]);
          const Nexys = window["nexys"];
          const nexys_ = new Nexys("TEST", { debug: true, appName: "test" });

          console.log(nexys_);
        }}
      >
        window test
      </button>
      <button
        onClick={async () => {
          nexys.error({ message: "test" });
          //console.log("Client return:", log);
        }}
      >
        click to err
      </button>
      <button
        onClick={async () => {
          const log = nexys.log({
            eren: true,
          });
          //console.log("Client return:", log);
        }}
      >
        click to log
      </button>
      <button
        onClick={() => {
          throw new Error("DACIA");
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
        onClick={async () => {
          const userAgent = await nexys.Device.getUserAgent();
          console.log(userAgent);
        }}
      >
        click to console log useragent
      </button>

      <button
        onClick={async () => {
          nexys.clear();
        }}
      >
        click to clear
      </button>

      <button
        onClick={async () => {
          nexys.forceRequest();
        }}
      >
        click to force requst
      </button>
      {/*
      <button
        onClick={async () => {
          const log = await nexys.log("test.", { type: "INFO" });
          console.log("Client return:", log);
        }}
      >
        click to log with options
      </button>

      <button
        onClick={async () => {
          const log = await nexys.log(
            {
              halo: true,
              selamlar: false,
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
              halo: true,
              selamlar: false,
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
          const log = await nexys.clearLogPool();
          console.log("Client return:", log);
        }}
      >
        click to clear
      </button>

      <button
        onClick={async () => {
          const log = await nexys.log(
            {
              halo: true,
              selamlar: false,
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
          nexys.__DO_NOT_USE_THIS();
        }}
      >
        click to view class
      </button>

      <button
        onClick={() => {
          nexys.flushLogPool();
        }}
      >
        click to send all logs
      </button>

      <button
        onClick={() => {
          console.log(nexys.getLogPool());
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
          throw new Error("test");
        }}
      >
        click to cause an error
      </button>*/}
    </div>
  );
}

export default App;
