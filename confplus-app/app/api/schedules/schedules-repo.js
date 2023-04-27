import path from "path";
import { promises as fs } from "fs";

const schedulesPath = path.join(process.cwd(), "data/schedule.json");

function generateIDS() {
  const ID = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000);
  return ID;
}

class ScheduleRepo {
  async getSchedules() {
    const schedules = await fs.readFile(schedulesPath, "utf8");
    return JSON.parse(schedules);
  }

  async getScheduleById(id) {
    const schedules = await this.getSchedules();
    return schedules.find((s) => s.id == id);
  }

  async addSchedule(schedule) {
    const schedules = await this.getSchedules();
    const newSchedule = {
      id: generateIDS(),
      ...schedule,
    };
    newSchedule.sessions = [];
    schedules.push(newSchedule);
    await fs.writeFile(schedulesPath, JSON.stringify(schedules));
  }

  async updateSchedule(schedule, id) {
    const schedules = await this.getSchedules();
    const index = schedules.findIndex((s) => s.id == id);
    if (index > -1) {
      schedules[index] = { id, ...schedule };
      await fs.writeFile(schedulesPath, JSON.stringify(schedules));
    } else {
      throw new Error("Schedule not found");
    }
  }

  async deleteSchedule(id) {
    const schedules = await this.getSchedules();
    const index = schedules.findIndex((s) => s.id == id);
    if (index > -1) {
      schedules.splice(index, 1);
      await fs.writeFile(schedulesPath, JSON.stringify(schedules));
    } else {
      throw new Error("Schedule not found");
    }
  }

  async getSessions(scheduleId) {
    const schedule = await this.getScheduleById(scheduleId);
    return schedule.sessions;
  }

  async addSession(scheduleId, session) {
    const schedule = await this.getScheduleById(scheduleId);
    const newSession = {
      id: generateIDS(),
      // id: schedule.sessions.length + 1,
      ...session,
    };
    newSession.presenters = [];
    schedule.sessions.push(newSession);
    await this.updateSchedule(schedule, scheduleId);
  }

  async getSessionById(scheduleId, sessionId) {
    const sessions = await this.getSessions(scheduleId);
    return sessions.find((s) => s.id == sessionId);
  }

  async updateSession(scheduleId, sessionId, session) {
    const sessions = await this.getSessions(scheduleId);
    const index = sessions.findIndex((s) => s.id == sessionId);
    const schedule = await this.getScheduleById(scheduleId);

    if (index > -1) {
      schedule.sessions[index] = { id: sessionId, ...session };
      await this.updateSchedule(schedule, scheduleId);
    } else {
      throw new Error("Session not found");
    }
  }

  async deleteSession(scheduleId, sessionId) {
    const sessions = await this.getSessions(scheduleId);
    const index = sessions.findIndex((s) => s.id == sessionId);
    const schedule = await this.getScheduleById(scheduleId);

    if (index > -1) {
      schedule.sessions.splice(index, 1);
      await this.updateSchedule(schedule, scheduleId);
    } else {
      throw new Error("Session not found");
    }
  }

  async getPresenters(scheduleId, sessionId) {
    const session = await this.getSessionById(scheduleId, sessionId);
    return session.presenters;
  }

  async addPresenter(scheduleId, sessionId, presenter) {
    const session = await this.getSessionById(scheduleId, sessionId);
    const newPresenter = {
      id: generateIDS(),
      ...presenter,
    };
    session.presenters.push(newPresenter);
    await this.updateSession(scheduleId, sessionId, session);
  }

  async deletePresenter(scheduleId, sessionId, presenterId) {
    const session = await this.getSessionById(scheduleId, sessionId);
    const index = session.presenters.findIndex((p) => p.id == presenterId);
    if (index > -1) {
      session.presenters.splice(index, 1);
      await this.updateSession(scheduleId, sessionId, session);
    } else {
      throw new Error("Presenter not found");
    }
  }
}

export default new ScheduleRepo();
