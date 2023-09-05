---
sidebar_position: 1
title: Nexys.log()
description: You can log anything you want with Nexys.
---

# Nexys.log()

Returns `Promise<void>`.

---

## Get Started

Let's assume you have been configured your **Nexys** instance.

## Example

```ts
nexys.log("Hello World!", { type: "INFO" });
```

First parameter is the data you want to log. Second parameter is the options for the log. You can check the options below.

## Log Options

| Option | Type | Description |
| --- | --- | --- |
| type | `string` | Type of the log. You can use whatever you want. Example: `ERROR` |
| action | `string` | Action of the log. You can use whatever you want. Example: `LOGIN` |

## Reserved Log Types

These types are reserved for **Nexys**. Please do not use these types.

| Type | Description |
| --- | --- |
| AUTO:ERROR | Error logs |
| AUTO:UNHANDLEDREJECTION | Information logs |
| METRIC | Metric logs |