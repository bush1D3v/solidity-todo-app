import { contract } from "@/utils/web3";
import { getAccounts, getGasPrice } from "../web3";

export default async function createTask(name: string, description: string): Promise<void> {
    const accounts = await getAccounts();
    const gasPrice = await getGasPrice();
    await contract.methods.createTask(name, description).send({ from: accounts[ 0 ], gasPrice });
}
