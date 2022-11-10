import { request } from "./request";
let logPool = [];
// @ts-ignore-next-line
let _internalData = {};
export function addToLogPool({ logMsg, logTag, logType, internalData, }) {
    _internalData = internalData;
    logPool.push({ logMsg, logTag, logType }); // push to log pool
    return processLogPool();
}
export function processLogPool() {
    if (logPool.length == 0)
        return Promise.reject("log-pool/empty");
    if (!_internalData)
        return Promise.reject("internal-data/empty");
    if (_internalData.settings.logTreshold === 0) {
        return Promise.all(logPool.map((log) => {
            _internalData.settings.logToConsole &&
                console.log("log->", log.logMsg, log.logTag);
            return request({
                url: "log",
                method: "POST",
                body: {
                    _l: Object.assign({}, log),
                    ts: Date.now(),
                    apiKey: _internalData.apiKey,
                },
            });
        })).then(() => {
            logPool = [];
            console.log("logs sent to server");
        });
    }
    if (_internalData.settings.logTreshold &&
        logPool.length < _internalData.settings.logTreshold)
        return Promise.reject("log-pool/under-treshold");
    // instead of sending in batches, send all in one request on treshold enabled
    return request({
        url: "log",
        method: "POST",
        body: { _l: [...logPool], ts: Date.now(), apiKey: _internalData.apiKey },
    })
        .then(() => {
        logPool = []; // clear log pool
    })
        .catch((err) => {
        console.log("error sending logs", err);
    });
}
