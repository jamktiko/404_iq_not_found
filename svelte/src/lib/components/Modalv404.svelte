<script lang="ts">
	import { blur } from 'svelte/transition';

	interface MoProps {
		open?: boolean;
		title?: string;
		onConfirm?: () => void;
		onCancel?: () => void;
		onClose?: () => void;
		showFooter?: boolean;
		children?: () => any;
		info: boolean;
	}

	let {
		open = $bindable(false),
		title = '',
		onConfirm = () => {},
		onCancel = () => {},
		onClose = () => {},
		showFooter = true,
		children,
		info
	}: MoProps = $props();

	function closeModal() {
		open = false;
	}
</script>

{#if open}
	<div class="modal-overlay" transition:blur={{ duration: 355 }}>
		{#if info}
			<div class="modal_info">
				<!--Otsikko-->
				<!-- <div class="modal-header">
				<h2>{title}</h2>
				<button class="close-btn" onclick={closeModal}>x</button>
			</div> -->
				<!--Sisältö-->
				<div class="close" onclick={closeModal}>X</div>
				<div class="modal-content_info">
					{#if children}
						{@render children()}
					{:else}
						<p>ei sisältöä</p>
					{/if}
				</div>
				<!--Vahvistus elementti footerissa-->
				{#if showFooter}
					<div class="modal-footer_info">
						<button
							class="confirm-btn"
							onclick={() => {
								onConfirm();
								closeModal();
							}}>Kyllä</button
						>
						<button
							class="cancel-btn"
							onclick={() => {
								onCancel();
								closeModal();
							}}>Ei</button
						>
					</div>
				{/if}
			</div>
		{:else if !info}
			<div class="modal_muu">
				<!--Otsikko-->
				<!-- <div class="modal-header">
				<h2>{title}</h2>
				<button class="close-btn" onclick={closeModal}>x</button>
			</div> -->
				<!--Sisältö-->
				<div class="close" onclick={closeModal}>X</div>
				<div class="modal-content_muu">
					{#if children}
						{@render children()}
					{:else}
						<p>ei sisältöä</p>
					{/if}
				</div>
				<!--Vahvistus elementti footerissa-->
				{#if showFooter}
					<div class="modal-footer_muu">
						<button
							class="confirm-btn"
							onclick={() => {
								onConfirm();
								closeModal();
							}}>Kyllä</button
						>
						<button
							class="cancel-btn"
							onclick={() => {
								onCancel();
								closeModal();
							}}>Ei</button
						>
					</div>
				{/if}
			</div>
		{/if}
	</div>
{/if}

<style>
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.close {
		position: absolute;
		top: 6px;
		right: 5px;
		background-color: #000000;
		color: white;
		border: 2px solid white;
		border-radius: 50%;
		width: 35px;
		height: 35px;
		cursor: pointer;
		text-align: center;
		font-family: 'Jaro', sans-serif;
		font-size: 28px;
		font-style: normal;
		font-weight: 400;
	}
	.modal_info {
		background-color: black;
		border: 2px solid lightgray;
		border-radius: 10px;
		padding: 10px;
		width: 750px;
		height: 450px;
		position: relative;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		color: white;
		font-family: sans-serif;
		font-size: 25px;
		font-style: normal;
		font-weight: 400;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		-webkit-text-stroke: 1px #fff;
	}
	/* .modal-header_info {
		display: flex;
		justify-content: space-between;
		align-items: center;
	} */
	.modal-content_info {
		margin-bottom: 70px;
	}
	.modal-footer_info {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		gap: 20px;
		margin-top: 200px;
	}
	/* Info modaalin responsiivisuus */
	@media (max-width:800px) {
		.modal_info {
		 width: 500px;
		 height: 350px;
		}
		.modal-content_info {
			margin-top: 50px;
			font-size: 20px;
		}
	}
	@media (max-width: 600px) {
	.modal_info {
		width:400px ;
		height:320px ;
	} 
  .modal-content_info {
		margin-top: 90px;
		font-size: 20px;
	}
	.close {
		width: 25px;
		height: 25px;
		font-size: 20px;
	}
}
	/* .close-btn {
		background: white;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
	} */
	.cancel-btn {
		width: 80px;
		background-color: #f44336;
		color: white;
		border: none;
		padding: 10px 20px;
		border-radius: 4px;
		cursor: pointer;
	}
	.confirm-btn {
		width: 80px;
		background-color: #4caf50;
		color: white;
		border: none;
		padding: 10px 20px;
		border-radius: 4px;
		cursor: pointer;
	}
	.cancel-btn:hover {
		background-color: #d32f2f;
	}
	.confirm-btn:hover {
		background-color: #388e3c;
	}
	.modal_muu {
		background-color: black;
		border: 2px solid lightgray;
		border-radius: 10px;
		padding: 10px;
		width: 650px;
		height: 350px;
		position: relative;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		color: white;
		font-family: sans-serif;
		font-size: 25px;
		font-style: normal;
		font-weight: 400;
		justify-content: center;
		align-items: center;
		text-align: center;
		-webkit-text-stroke: 1px #fff;
	}
	.modal-content_muu {
		align-items: center;
		margin-top: 150px;
		margin-bottom: 50px;
	}
	.modal-footer_muu {
		display: flex;
		justify-content: center;
		gap: 35px;
	}
	/* Lopeta kesken-responsiivisuus*/
	@media (max-width: 600px) {
  .modal_muu {
   width: 400px;
	 height: 200px;
  }
	.modal-content_muu {
		margin-top:40px;
		font-size: 20px;
	}
}

</style>
