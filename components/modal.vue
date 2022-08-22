<template>
	<dialog>
		<div>
			<slot />
		</div>
	</dialog>
</template>

<style scoped>
dialog[open] {
	display: flex;
}

dialog {
	inset: 0;
	position: fixed;
	height: 100vh;
	width: 100vw;
	z-index: 10;
	display: none;
	place-items: center;
	justify-content: center;
	padding: 0;
	color: var(--text);
	background-color: transparent;
}

dialog div {
	position: relative;
	z-index: 2;
}

dialog::after {
	content: "";
	position: absolute;
	inset: 0;
	background-color: var(--background);
	z-index: 1;
	opacity: 0.85;
}
</style>
