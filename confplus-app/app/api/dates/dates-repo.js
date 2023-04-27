import path from "path";
import { promises as fs } from "fs";

const datesPath = path.join(process.cwd(), "data/conference-dates.json");


class DatesRepo {

    async getDates() {
        const dates = await fs.readFile(datesPath, "utf8");
        return JSON.parse(dates);
    }

    async getDateById(id) {
        const dates = await this.getDates();
        return dates.find((d) => d.id == id);
    }

    async updateDate(date, id) {
        const dates = await this.getDates();
        const index = dates.findIndex((d) => d.id == id);
        if (index > -1) {
            dates[index] = { id, ...date };
            await fs.writeFile(datesPath, JSON.stringify(dates));
        } else {
            throw new Error("Date not found");
        }
    }

}

export default new DatesRepo();