import type { Task } from "@/types/Task";
import { contract } from "@/utils/web3";
import { getAccounts, getGasPrice } from "../web3";

export default async function getTask(id: number): Promise<Task | undefined> {
    try {
        const accounts = await getAccounts();
        const gasPrice = await getGasPrice();
        const task: Task = await contract.methods.getTask(id).call({ from: accounts[ 0 ], gasPrice });
        console.log(task);

        return task;
    } catch (error) {
        console.error(error);
    }
}
