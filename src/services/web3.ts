import { web3 } from "@/utils/web3";

export async function getAccounts(): Promise<string[]> {
	return await web3.eth.getAccounts();
}

export async function getGasPrice(): Promise<bigint> {
	return await web3.eth.getGasPrice();
}
