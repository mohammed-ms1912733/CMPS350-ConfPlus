import path from 'path'
import { promises as fs } from 'fs'

const accountsPath = path.join(process.cwd(), 'data/users.json')

class AccountRepo {
    async getAccounts() {
        const users = await fs.readFile(accountsPath, 'utf8')
        return JSON.parse(users)
    }
}

export default new AccountRepo()