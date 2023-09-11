---
sidebar_position: 2
title: Nexys.Events.fire()
description: Trigger any Nexys event.
---

# Nexys.Events.fire()

---

Trigger any Nexys event. You can trigger any event listed in [Event Types](/functions/events/event-types).

## Usage

```js
Nexys.Events.fire("event.name", data);
```

## Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `eventName` | `string` | Event name to trigger. |
| `data` | `any` | Data to pass to the event. |