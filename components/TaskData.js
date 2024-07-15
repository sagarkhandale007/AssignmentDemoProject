/* eslint-disable prettier/prettier */
class TaskData {

    constructor( taskTitle, taskDescription, taskId,category, priority,status,date,addTask,taskShareFrom,taskShareTo,key) {

        this.taskTitle = taskTitle;

        this.taskDescription = taskDescription;

        this.taskId = taskId;

        this.category = category;

        this.priority = priority;

        this.key = key;

        this.status = status;

        this.date = date;

        this.addTask = addTask;

        this.taskShareFrom = taskShareFrom;

        this.taskShareTo = taskShareTo;

     }
}

export default TaskData;





