// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19;

contract TodoTasksStorage {
    struct Task {
        uint256 id;
        string name;
        string description;
        bool completed;
    }

    mapping(uint256 => Task) public tasks;
    uint256 public taskCount;

    event TaskCreated(uint256 id, string name, string description);
    event TaskCompletedToggle(uint256 id, bool completed);
    event TaskDeleted(uint256 id);
    event TasksCleared(uint256 remainingTasks);
    event TaskRetrieved(
        uint256 id,
        string name,
        string description,
        bool completed
    );
    event TasksRetrieved(uint256 count);

    function getTask(uint256 _id) public returns (Task memory) {
        Task memory task = tasks[_id];
        emit TaskRetrieved(
            task.id,
            task.name,
            task.description,
            task.completed
        );
        return task;
    }

    function getTasks(
        uint256 _limit,
        uint256 _offset
    ) public returns (Task[] memory) {
        require(_offset <= taskCount, "Offset out of bounds");

        if (_limit == 0) {
            _limit = 10;
        }

        uint256 end = _offset + _limit;
        if (end > taskCount) {
            end = taskCount;
        }

        Task[] memory _tasks = new Task[](end - _offset);
        for (uint256 i = _offset; i < end; i++) {
            _tasks[i - _offset] = tasks[i];
        }
        emit TasksRetrieved(_tasks.length);
        return _tasks;
    }

    function createTask(
        string memory _name,
        string memory _description
    ) public returns (Task memory) {
        tasks[taskCount] = Task(taskCount, _name, _description, false);
        emit TaskCreated(taskCount, _name, _description);
        taskCount++;
        return tasks[taskCount - 1];
    }

    function toggleTask(uint256 _id) public {
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
        delete tasks[_id];
        taskCount--;
        emit TaskDeleted(_id);
    }

    function getTaskCount() public view returns (uint256) {
        return taskCount;
    }
}
