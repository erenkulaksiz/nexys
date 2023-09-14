---
sidebar_position: 1
title: Set User
description: Set User 
---

# Set User

---

:::caution

This is an clientside feature.

Setting different users are not available on serverside since we try to save it to `localStorage`. Since your serverside application probably has more than one user, we don't want to save it to `localStorage`.

:::

You can set the user of your application with this method. This method will be used to identify the user of your application. This feature is crucial for the **User Analytics** feature.

Configuring user will be saved on localStorage. So, you don't need to set it on each page load. You can set it once and it will load it automatically on each page load.

Accepts `string`.

Example:

```ts title="login.ts"
...

function login(){
  // some login logic
  
  // highlight-next-line
  nexys.configure((config) => config.setUser(user.email));

  // other logic
}

...
```

You might want to do this on each page load. Since if not set while logPool is sending data to the dashboard, it will be sent as `undefined`.

```ts title="pages/_app.tsx"
...

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // highlight-next-line
    nexys.configure((config) => config.setUser(user.email));
  }, [router.pathname]);

  return <Component {...pageProps} />;
}

...
```