declare module "@/utils/web3" {
	import type { Contract } from "web3";
	import type Web3 from "web3";
	const web3: Web3;
	const contract: Contract;
	export { web3, contract };
}
