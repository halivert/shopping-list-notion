<template>
	<dialog>
		<div>
			<slot />
		</div>
	</dialog>
</template>

<style scoped>
dialog {
	inset: 0;
	position: fixed;
	height: 100vh;
	width: 100vw;
	z-index: 10;
	display: flex;
	place-items: center;
	justify-content: center;
	padding: 0;
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
	opacity: 0.8;
}
</style>
