import path from "path";
import { promises as fs } from "fs";


const institutionsPath = path.join(process.cwd(), "data/institutions.json");

class InstitutionsRepo {

    async getInstitutions() {
        const institutions = await fs.readFile(institutionsPath, "utf8");
        return JSON.parse(institutions);
    }


}