---
sidebar_position: 2
title: Nexys.error()
description: Logging synthetic errors with Nexys.
---

# Nexys.error()

Returns `Promise<void>`.

---

## Get Started

You might not want to throw exceptions to make **Nexys** to detect it as an error. So we made synthetic errors for you.

## Error Log Instance

You can simply enter the data you want to log as the first parameter and the options as the second parameter. You don't need to enter the type of the log. It will be automatically set to `ERROR`. But you can change it if you want.

## Example

```ts
nexys.error({ message: "Hello World!" }, { action: "HEY" });
```

First parameter is the data you want to log. Second parameter is the options for the log. You can check the options below.

## Error Log Options

| Option | Type | Description |
| --- | --- | --- |
| type | `string` | Type of the log. You can use whatever you want. Example: `ERROR` |
| action | `string` | Action of the log. You can use whatever you want. Example: `LOGIN` |