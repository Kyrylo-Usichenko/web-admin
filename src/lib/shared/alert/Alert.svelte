<div class="wrapper">
	<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 2048 2048">
		<rect x="0" y="0" width="2048" height="2048" fill="none" stroke="none" /><path
			fill="currentColor"
			d="M1024 0q141 0 272 36t244 104t207 160t161 207t103 245t37 272q0 141-36 272t-104 244t-160 207t-207 161t-245 103t-272 37q-141 0-272-36t-244-104t-207-160t-161-207t-103-245t-37-272q0-141 36-272t104-244t160-207t207-161T752 37t272-37zm128 1536v-256H896v256h256zm0-384V512H896v640h256z"
		/>
	</svg>
	<div>
		<slot />
	</div>
</div>

<style>
	.wrapper {
		margin: 26px 0;
		width: fit-content;
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 10px 16px;
		background: #e9d502;
		border-radius: 10px;
	}
</style>
