import path from 'path'
import { promises as fs } from 'fs'

const schedulesPath = path.join(process.cwd(), 'data/locations.json')

function generateIDS() {
    const ID = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000);
    return ID;
}

class LocationsRepo {

    async getLocations() {
        const locations = await fs.readFile(schedulesPath, 'utf8')
        return JSON.parse(locations)
    }

    async getLocationById(id) {
        const locations = await this.getLocations()
        return locations.find((s) => s.id == id)
    }

    async updateLocation(location, id) {
        const locations = await this.getLocations()
        const index = locations.findIndex((s) => s.id == id)
        if (index > -1) {
            locations[index] = { id, ...location }
            await fs.writeFile(schedulesPath, JSON.stringify(locations))
        } else {
            throw new Error('Location not found')
        }
    }


}

export default new LocationsRepo()
