import incidentsData from "@/services/mockData/incidents.json";

let incidents = [...incidentsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const incidentService = {
  async getAll() {
    await delay(300);
    return [...incidents];
  },

  async getById(id) {
    await delay(200);
    const incident = incidents.find(item => item.Id === parseInt(id));
    if (!incident) {
      throw new Error(`Incident with Id ${id} not found`);
    }
    return { ...incident };
  },

  async create(incident) {
    await delay(400);
    const maxId = Math.max(...incidents.map(item => item.Id));
    const newIncident = {
      ...incident,
      Id: maxId + 1,
      timestamp: new Date().toISOString()
    };
    incidents.push(newIncident);
    return { ...newIncident };
  },

  async update(id, updates) {
    await delay(350);
    const index = incidents.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Incident with Id ${id} not found`);
    }
    incidents[index] = { ...incidents[index], ...updates };
    return { ...incidents[index] };
  },

  async delete(id) {
    await delay(250);
    const index = incidents.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Incident with Id ${id} not found`);
    }
    const deleted = incidents.splice(index, 1)[0];
    return { ...deleted };
  },

  async getActiveCount() {
    await delay(200);
    return incidents.filter(incident => incident.status === "Active").length;
  },

  async getResolvedCount() {
    await delay(200);
    return incidents.filter(incident => incident.status === "Resolved").length;
  },

  async updateStatus(id, status) {
    await delay(300);
    return this.update(id, { status });
  }
};