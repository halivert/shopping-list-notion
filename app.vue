<template>
  <NuxtPage />
</template>

<style lang="postcss">
:root {
  --text: #333;
  --background: #d5d0cd;
  --background-b: #d1cbc7;
  --background-c: #c7c0bc;
  --accent: #008f8f;
  --accent-hover: #00a3a3;
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
  scroll-behavior: smooth;
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
  @apply box-border accent-green-a;
}

::selection {
  @apply bg-green-300;
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

img {
  max-width: 100%;
}
</style>
