const TodoTasksStorage = artifacts.require("TodoTasksStorage");

// biome-ignore lint/complexity/useArrowFunction: <explanation>
module.exports = function (deployer) {
	deployer.deploy(TodoTasksStorage);
};
