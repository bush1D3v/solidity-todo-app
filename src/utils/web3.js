import Web3 from "web3";
import TodoTasksStorage from "../../build/contracts/TodoTasksStorage.json";

let web3;
let contract;

if (window.ethereum) {
	web3 = new Web3(window.ethereum);
	window.eth_requestAccounts;
} else if (window.web3) {
	web3 = new Web3(window.web3.currentProvider);
} else {
	console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
}

async function loadContract() {
	const networkId = await web3.eth.net.getId();
	const deployedNetwork = TodoTasksStorage.networks[networkId];
	const contractAddress = deployedNetwork?.address;

	if (contractAddress) {
		contract = new web3.eth.Contract(TodoTasksStorage.abi, contractAddress);
	} else {
		console.error("Contract address not found");
	}
}

await loadContract();

export { loadContract, web3, contract };
