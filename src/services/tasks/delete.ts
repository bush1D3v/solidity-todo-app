import type { Task } from "@/types/Task";
import { contract } from "@/utils/web3";
import { getAccounts, getGasPrice } from "../web3";

export default async function deleteTask(id: number): Promise<Task> {
	const accounts = await getAccounts();
	const gasPrice = await getGasPrice();
	const task: Task = await contract.methods.deleteTask(id).call({ from: accounts[0], gasPrice });
	return task;
}
