---
sidebar_position: 0
title: Event Types
description: You can subscribe and fire these events.
---

# Event Types

---

| Event Name | Description | Parameters |
| --- | --- | --- |
| `errors.error` | Triggers when automatic error handler has caught an error. Does not trigger when calling `nexys.error()` function. | [ErrorEvent](https://developer.mozilla.org/en-US/docs/Web/API/ErrorEvent) |
| `errors.unhandled.rejection` | Same as above. | [PromiseRejectionEvent](https://developer.mozilla.org/en-US/docs/Web/API/PromiseRejectionEvent)
| `log.add` | Any log has been added to `logPool`. | [logTypes](https://github.com/erenkulaksiz/nexys/blob/master/packages/nexys/src/types.ts#L67)
| `logs.clear` | Logs has been cleared from `logPool`. | - |
| `core.init` | `Nexys` core has been initialized. | - |
| `logpool.process` | `logPool` startes to process the logs. | - |
| `logpool.init` | `logPool` has been initialized. | - |
| `requests.clear` | Requests has been cleared from `logPool`. | - |
| `request.sending` | Sending `logPool` to dashboard. | `data: any` |
| `request.success` | `logPool` has been successfully sent to the dashboard. | { res: [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response), json: any } |
| `request.error` | `logPool` has not been sent to the dashboard.  | Error |
| `request.add` | Failed request has been added to `logPool`. | { req, status, ts }: [requestTypes](https://github.com/erenkulaksiz/nexys/blob/master/packages/nexys/src/types.ts#L96)
| `localstorage.init` | `localStorage` has been initialized. | - |
| `internallogger.init` | `InternalLogger` has been initialized. | - |
| `device.init` | `Device` has been initialized. | - |
| `events.bind.success` | Binding automatic error handler is successful. | - |
| `events.bind.failed` | Binding automatic error handler is failed. | - |
| `config.user` | User has been configured. | data?: string |
| `config.app.version` | App version has been configured. | data?: string |
| `visibility.change` | User has changed visibility. See this [documentation.](https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilitychange_event) | Event |
| `click` | User has clicked on the document. | [ClickEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) |