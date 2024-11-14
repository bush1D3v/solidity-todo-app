import type { Task } from "@/types/Task";
import { contract } from "@/utils/web3";
import { getAccounts, getGasPrice } from "../web3";

/**
 * @param limit number
 * @param offset number
 */
export default async function getTasks(limit = 10, offset = 0): Promise<Task[]> {
	try {
		const accounts = await getAccounts();
		const gasPrice = await getGasPrice();

		const tasks = await contract.methods
			.getTasks(limit, offset)
			.call({ from: accounts[0], gasPrice });

		return tasks;
	} catch (error) {
		console.error(error);
		return [
			{
				id: BigInt(0),
				name: "Task 1",
				description: "Description 1",
				completed: false,
			},
		];
	}
}
