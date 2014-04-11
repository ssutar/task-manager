function TaskList () {
    this.list = {};
}

TaskList.prototype.init = function (list) {
    //get the list from server
    this.list = {};
};

TaskList.prototype.add = function (task) {
    this.list[task.getId()] = task;
};

TaskList.prototype.remove = function (task) {
    delete this.list[task.getId()];
};

TaskList.prototype.getById = function (id) {
    return this.list[id];
};
