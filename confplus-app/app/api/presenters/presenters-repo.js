import path from 'path'
import { promises as fs } from 'fs'

const presentersPath = path.join(process.cwd(), 'data/presenters.json')

function generateIDS() {
    const ID = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000);
    return ID;
}

class PresentersRepo {
    async getPresenters() {
        const presenters = await fs.readFile(presentersPath, 'utf8')
        return JSON.parse(presenters)
    }

    async getPresenterById(id) {
        const presenters = await this.getPresenters()
        return presenters.find(p => p.id == id)
    }

    async updatePresenter(presenter, id) {
        const presenters = await this.getPresenters()
        const index = presenters.findIndex(p => p.id == id)
        if (index > -1) {
            presenters[index] = { id, ...presenter }
            await fs.writeFile(presentersPath, JSON.stringify(presenters))
        } else {
            throw new Error('Presenter not found')
        }
    }
}


export default new PresentersRepo()