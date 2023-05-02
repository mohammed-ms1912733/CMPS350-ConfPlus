import path from "path";
import { promises as fs } from "fs";

const papersPath = path.join(process.cwd(), "data/papers.json");

function generateIDS() {
    const ID = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000);
    return ID;
}

class PaperRepo {
    async getPapers() {
        const papers = await fs.readFile(papersPath, "utf8");
        return JSON.parse(papers);
    }

    async getPaperById(id) {
        const papers = await this.getPapers();
        return papers.find((s) => s.id == id);
    }

    async addPaper(paper) {
        const papers = await this.getPapers();
        const newPaper = {
            id: generateIDS(),
            ...paper,
        };
        papers.push(newPaper);
        await fs.writeFile(papersPath, JSON.stringify(papers));
    }

    async updatePaper(paper, id) {
        const papers = await this.getPapers();
        const index = papers.findIndex((s) => s.id == id);
        if (index > -1) {
            papers[index] = { id, ...paper };
            await fs.writeFile(papersPath, JSON.stringify(papers));
        } else {
            throw new Error("Paper not found");
        }
    }
}

export default new PaperRepo();
