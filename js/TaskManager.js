var TaskManager;
(function () {
    "use strict";
    TaskManager = function (options) {
        var taskList,
            down = false,
            dragObj = false,
            curDragObject,
            dropTarget = false,
            width,
            height,
            offsetLeft,
            offsetTop;
        
        function init () {
            //Initialize the task list 
            //Ideally this should get the data from server and render the tasks
            taskList = new TaskList();
            taskList.init();
            //Event handlers for form and drag 
            attach();
            drag();
        }
        
        function attach () {
            var addTaskForm = document.getElementById("add-task-form");
            
            DomUtil.addListener(addTaskForm, "submit", function (e) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                e.preventDefault ? e.preventDefault() : e.returnValue = false;
                
                var desc = target['desc'].value,
                    task = new Task(desc),
                    pendingEl = document.getElementById("pending-task-list");
                taskList.add(task);
                target['desc'].value = '';
                pendingEl.innerHTML += task.getHtml();
                return false;
            });
        }
        
        function drag () {
            var dragEl = document.getElementById("task-list");
            
            DomUtil.addListener(dragEl, "mousedown", function (e) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                e.preventDefault ? e.preventDefault() : e.returnValue = false;
                
                if (!DomUtil.hasClass(target, "drag")) {
                    return false;
                }
                
                down = true;
                dragObj = target;
                DomUtil.addClass(dragEl, "drop-hover");
                
                var x = e.clientX;
                var y = e.clientY; 
                width = target.offsetWidth;
                height = target.offsetHeight;
                offsetLeft = x - target.offsetLeft;
                offsetTop = y - target.offsetTop;
            });

            DomUtil.addListener(dragEl, "mouseup", function (e) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                e.preventDefault ? e.preventDefault() : e.returnValue = false;
                
                DomUtil.removeClass(dragEl, "drop-hover");
                var curTask = taskList.getById(dragObj.id);
                
                console.log(target.className);
                
                if (DomUtil.hasClass(target, "completed")) {
                    curTask.setStatus("completed");
                    target.appendChild(dragObj);
                    
                }
                
                if (DomUtil.hasClass(target, "progress")) {
                    curTask.setStatus("progress");
                    target.appendChild(dragObj);
                }
                
                if (DomUtil.hasClass(target, "pending")) {
                    curTask.setStatus("pending");
                    target.appendChild(dragObj);
                }
                
                dragObj.style.position = 'static';
                down = false;
                dragObj = false;
                dropTarget = false;
                offsetLeft = 0;
                offsetTop = 0;
            });

            DomUtil.addListener(dragEl, "mousemove", function (e) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                e.preventDefault ? e.preventDefault() : e.returnValue = false;
                
                if (e.type !== "click" && !down) {
                    return;
                }
                
                var x = e.clientX;
                var y = e.clientY;
                                
                dragObj.style.top = y + window.scrollY + 'px';
                dragObj.style.left = x + window.scrollX + 'px';
                dragObj.style.width = width + 'px';
                dragObj.style.height = height + 'px';
                dragObj.style.position = 'absolute';
            });
            
        }
        
        init();
    };
    
}());