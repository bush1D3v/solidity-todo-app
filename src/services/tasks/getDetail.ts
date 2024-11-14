import type { Tasks } from "@/types/Tasks";
import { contract } from "@/utils/web3";
import { getAccounts, getGasPrice } from "../web3";

export default async function getTask(id: number): Promise<Tasks> {
    const accounts = await getAccounts();
    const gasPrice = await getGasPrice();
    const task: Tasks = await contract.methods.getTask(id).call({ from: accounts[ 0 ], gasPrice });
    return task;
}
