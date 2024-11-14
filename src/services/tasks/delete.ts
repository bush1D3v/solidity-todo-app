import type { Tasks } from "@/types/Tasks";
import { contract } from "@/utils/web3";
import { getAccounts, getGasPrice } from "../web3";

export default async function deleteTask(id: number): Promise<Tasks> {
    const accounts = await getAccounts();
    const gasPrice = await getGasPrice();
    const task: Tasks = await contract.methods.deleteTask(id).call({ from: accounts[ 0 ], gasPrice });
    return task;
}
