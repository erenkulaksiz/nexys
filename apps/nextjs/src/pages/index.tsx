import { nexys } from "../utils";

export default function App() {
  return (
    <div>
      <h1>Web</h1>
      <button
        onClick={async () => {
          const log = nexys.log("test.");
          //console.log("Client return:", log);
        }}
      >
        click to log
      </button>
      <button
        onClick={() => {
          throw new Error("Exception test");
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
      {/*<button
        onClick={async () => {
          const log = await nexys.log("test.");
          console.log("Client return:", log);
        }}
      >
        click to log
      </button>

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
      </button>*/}
    </div>
  );
}
