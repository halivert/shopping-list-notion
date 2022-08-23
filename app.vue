<template>
  <div>
    <Head>
      <link rel="icon" type="image/x-icon" href="/favicon.webp" />
    </Head>
    <NuxtPage />
  </div>
</template>

<style>
:root {
  --text: #333;
  --background: #d5d0cd;
  --background-b: #d1cbc7;
  --background-c: #c7c0bc;
  --accent: #00c0c0;
  --accent-hover: #00f5f5;
}

@media (prefers-color-scheme: dark) {
  :root {
    --text: #d5d0cd;
    --background: #333;
    --background-b: #292929;
    --background-c: #1f1f1f;
    --accent: #00c0c0;
    --accent-hover: #008f8f;
  }
}

@font-face {
  font-family: "Bitter";
  src: url("~/assets/Bitter.ttf") format("truetype");
}

html {
  color: var(--text);
  background-color: var(--background);
  font-size: 18px;
  font-family: "Bitter", sans-serif, serif;
}

html,
body {
  margin: 0;
}

body {
  max-width: 80ch;
  margin: 0 auto;
}

* {
  accent-color: var(--accent);
  box-sizing: border-box;
}

::selection {
  background-color: var(--accent-hover);
}

a {
  text-decoration: none;
  color: var(--accent);
}

a:hover {
  color: var(--accent-hover);
}

main {
  padding: 1em;
}
</style>
