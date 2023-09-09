---
sidebar_position: 1
title: Nexys.Events.subscribe()
description: Subscribe to any Nexys event.
---

# Nexys.Events.subscribe()

---

Subscribe to any Nexys event. You can subscribe to any event listed in [Event Types](/docs/functions/events/event-types).

## Usage

```js
Nexys.Events.subscribe("event.name", (data) => {
  // do something
});
```

## Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `eventName` | `string` | Event name to subscribe. |
| `callback` | `function` | Callback function to execute when event is triggered. |