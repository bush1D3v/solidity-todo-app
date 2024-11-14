// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19;

contract TodoTasksStorage {
    uint256 private taskCount = 0;

    struct Task {
        uint256 id;
        string name;
        string description;
        bool completed;
    }

    mapping(uint256 => Task) private tasks;

    event TaskCreated(uint256 id, string name, string description);
    event TaskCompletedToggle(uint256 id, bool completed);
    event TaskDeleted(uint256 id);
    event TasksCleared(uint256 remainingTasks);

    function getTask(uint256 _id) public view returns (Task memory) {
        require(_id < taskCount, "Task does not exist");
        return tasks[_id];
    }

    function getTasks(uint256 _limit, uint256 _offset) public view returns (Task[] memory) {
        if (_limit == 0) _limit = 10;
        if (_offset == 0) _offset = 0;

        require(_offset < taskCount, "Offset out of bounds");
        uint256 end = _offset + _limit;
        if (end > taskCount) {
            end = taskCount;
        }

        Task[] memory _tasks = new Task[](end - _offset);
        for (uint256 i = _offset; i < end; i++) {
            _tasks[i - _offset] = tasks[i];
        }
        return _tasks;
    }

    function createTask(string memory _name, string memory _description) public {
        tasks[taskCount] = Task(taskCount, _name, _description, false);
        emit TaskCreated(taskCount, _name, _description);
        taskCount++;
    }

    function toggleTask(uint256 _id) public {
        require(_id < taskCount, "Task does not exist");
        tasks[_id].completed = !tasks[_id].completed;
        emit TaskCompletedToggle(_id, tasks[_id].completed);
    }

    function clearCompletedTasks() public {
        uint256 newTaskCount = 0;
        for (uint256 i = 0; i < taskCount; i++) {
            if (!tasks[i].completed) {
                tasks[newTaskCount] = tasks[i];
                newTaskCount++;
            }
        }

        for (uint256 i = newTaskCount; i < taskCount; i++) {
            delete tasks[i];
        }

        taskCount = newTaskCount;
        emit TasksCleared(taskCount);
    }

    function deleteTask(uint256 _id) public {
        require(_id < taskCount, "Task does not exist");
        delete tasks[_id];
        taskCount--;
        emit TaskDeleted(_id);
    }

    function getTaskCount() public view returns (uint256) {
        return taskCount;
    }
}
