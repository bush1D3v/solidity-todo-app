import { contract } from "@/utils/web3";
import { getAccounts, getGasPrice } from "../web3";
import type { Task } from "@/types/Task";
import { bus } from "@/events/taskEventEmitter";
import type { Router } from "vue-router";

export default async function insert(
    name: string,
    description: string,
    router: Router,
): Promise<void> {
    try {
        const accounts = await getAccounts();
        const gasPrice = await getGasPrice();
        const response: Task = await contract.methods.createTask(name, description)
            .call({ from: accounts[ 0 ], gas: 3000000, gasPrice });

        console.log(response);

        bus.emit("insertTask", { id: response.id, name: response.name, router });
    } catch (error) {
        console.error(error);
    }
}
