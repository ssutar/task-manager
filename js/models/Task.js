function Task (desc) {
    this.id = Task.id++;
    this.description = desc;
    this.status = "pending";
}

Task.id = 1;

Task.prototype.getId = function () {
    return this.id;
};

Task.prototype.getDescription = function () {
    return this.description;
};

Task.prototype.setDescription = function (desc) {
    this.description = desc;
};

Task.prototype.setStatus = function (status) {
    this.status = status;
};

Task.prototype.getHtml = function () {
    //Ideally this should use a template enngine
    return '<li class="task-item drag" id="'+this.id+'">'+this.description+'</li>';
};