import createApiClient from "./api.service";

class TodoService {
	constructor(baseUrl = "/api/todos") {
		this.api = createApiClient(baseUrl);
	}
	async getTodos() {
		return (await this.api.get("/")).data;
	}
	async createTask(data) {
		return (await this.api.post("/", data)).data;
	}
    async deleteTask(id) {
        return (await this.api.delete(`/deleteTask/${id}`)).data;
    }
	async deleteAllTask() {
		return (await this.api.delete("/deleteAll")).data;
	}
	async updateTask(id, data) {
		return (await this.api.put(`/${id}`, data)).data;
	}
	async deleteAllCompleted() {
		return (await this.api.delete("/deleteAllCompleted")).data;
	}
}
export default new TodoService();
