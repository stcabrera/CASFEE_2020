import { httpService } from './http-service.js'
const server = 'http://localhost:3000/tasks/';

class TaskService {    
    async createTask(task) {
        return await httpService.ajax('POST', server, { name: task });
    }
    async getTasks() {
        return await httpService.ajax('GET', server);
    }
    async getSingleTask(id) {
        return await httpService.ajax('GET', server , undefined);
    }
    async deleteTask(id) {
        return await httpService.ajax('DELETE', server, undefined);
    }
    async updateTask(id) {
        return await httpService.ajax('PUT', server, undefined);
    }
}

export const taskService = new TaskService();

const getTask = new TaskService
console.log(getTask.getTasks)