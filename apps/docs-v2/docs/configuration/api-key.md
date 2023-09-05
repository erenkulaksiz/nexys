---
sidebar_position: 2
description: API Key configuration
---

# API Key (required)

---

This option is required. It is to identify your application in **Nexys** dashboard. You can retrieve this key from your [Nexys dashboard](https://dash.nexys.app) in the **Settings** tab.

This API key is public and can be used in your frontend code, also in server-side code. It is not a secret key.

The only you need to look for, if you are using this key on frontend code is to restrict the origin of the requests to your domain. You can do this in the **Settings** tab of your [Nexys dashboard](https://dash.nexys.app). **Settings** tab > **API** tab > **Allow Localhost Access** (should be disabled so only your production domain can access the API).

Currently, we do not allow entering multiple domains, but you can contact us if you need this feature. We will add this soon.

| Option | Type | Default |
| --- | --- | --- |
| first parameter | `string` | "" |

## Example

```javascript
const nexys = new Nexys(
  // highlight-next-line
  "API_KEY", 
  { appName: "APP_NAME" }
);
```

