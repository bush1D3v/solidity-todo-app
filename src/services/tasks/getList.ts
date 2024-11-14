import type { Tasks } from "@/types/Tasks";
import { contract } from "@/utils/web3";
import { getAccounts, getGasPrice } from "../web3";

/**
 * @param limit number
 * @param offset number
 */
export default async function getTasks(limit = 10, offset = 0): Promise<Tasks[]> {
    try {
        const accounts = await getAccounts();
        const gasPrice = await getGasPrice();

        const tasks = await contract.methods
            .getTasks(0, 0)
            .call({ from: accounts[ 0 ], gasPrice });

        return tasks;
    } catch (error) {
        console.error(error);
        return [ {
            id: BigInt(0),
            name: "Task 1",
            description: "Description 1",
            completed: false,
        } ];
    }
}
