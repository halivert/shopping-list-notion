<template>
  <div>
    <NuxtPage />
  </div>
</template>

<style>
:root {
  --text: #333;
  --background: #fff;
  --accent: #00c0c0;
  --accent-hover: #00f5f5;
}

@media (prefers-color-scheme: dark) {
  :root {
    --text: #fff;
    --background: #333;
    --accent: #00c0c0;
    --accent-hover: #00a3a3;
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
</style>
