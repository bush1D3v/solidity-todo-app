import { contract } from "@/utils/web3";
import { getAccounts, getGasPrice } from "../web3";

export default async function clearCompletedTasks(): Promise<void> {
    const accounts = await getAccounts();
    const gasPrice = await getGasPrice();
    await contract.methods.clearCompletedTasks().send({ from: accounts[ 0 ], gasPrice });
}