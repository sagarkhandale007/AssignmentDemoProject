
import TaskData from '../components/TaskData';


export async function getApiTaskData() {
    try {
        const response = await fetch('https://task-mangement-13551-default-rtdb.firebaseio.com/data.json',
            {
                method: 'GET',
            });

        if (!response.ok) {
            const errorRes = await response.json();
            console.log('error' + response);
            throw new Error(errorRes.error.message);
        }
        const TaskData = await response.json();
        return TaskData;
    } catch (error) {
        throw new Error(error);
    }

}

export async function getTasksData(id) {
    const loadedTask = await getApiTaskData();
    const dataArray = Object.values(loadedTask);
    return dataArray.find((tasks) => (tasks.taskId == id));
}


export async function getTasksListData() {
    const loadedTask = await getApiTaskData();
    const dataArray = Object.values(loadedTask);
    return dataArray;
}


export async function getMyTask(Name) {
    const loadedTask = await getApiTaskData();
    const matchingData = {};
    for (const key in loadedTask) {
        const node = loadedTask[key];
        // Check the condition you are interested in
        if (node.taskShareTo === Name) {
          matchingData[key] = node;
        }
      }
    const dataArray = Object.values(matchingData);
    return dataArray;

}
