import camerasData from "@/services/mockData/cameras.json";

let cameras = [...camerasData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const cameraService = {
  async getAll() {
    await delay(400);
    return [...cameras];
  },

  async getById(id) {
    await delay(200);
    const camera = cameras.find(item => item.Id === parseInt(id));
    if (!camera) {
      throw new Error(`Camera with Id ${id} not found`);
    }
    return { ...camera };
  },

  async create(camera) {
    await delay(500);
    const maxId = Math.max(...cameras.map(item => item.Id));
    const newCamera = {
      ...camera,
      Id: maxId + 1,
      lastPing: new Date().toISOString(),
      health: 100
    };
    cameras.push(newCamera);
    return { ...newCamera };
  },

  async update(id, updates) {
    await delay(350);
    const index = cameras.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Camera with Id ${id} not found`);
    }
    cameras[index] = { ...cameras[index], ...updates };
    return { ...cameras[index] };
  },

  async delete(id) {
    await delay(300);
    const index = cameras.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Camera with Id ${id} not found`);
    }
    const deleted = cameras.splice(index, 1)[0];
    return { ...deleted };
  },

  async getOnlineCount() {
    await delay(200);
    return cameras.filter(camera => camera.status === "Online").length;
  },

  async getTotalCount() {
    await delay(200);
    return cameras.length;
  },

  async updateStatus(id, status) {
    await delay(300);
    return this.update(id, { status, lastPing: new Date().toISOString() });
  }
};