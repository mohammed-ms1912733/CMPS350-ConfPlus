import fs from 'fs-extra'
import { nanoid } from 'nanoid'
import path from 'path'

export default class InformationRepo {
    constructor() {
        this.path = path.join(process.cwd(), 'app/data/information.json')
        console.log(this.path);
    }

    async getInformations(id) {
        const informations = await fs.readJSON(this.path)
        if (id) {
            return informations.find(info => info.id === id)
        }
        return informations;
    }
    async getUsers() {
        const usersPath = path.join(process.cwd(), "app/data/users.json");
        const users = await fs.readFile(usersPath, "utf8");
        return JSON.parse(users);
    }

    async addInformation(info) {
        const informations = await fs.readJSON(this.path);
        const lastInfo = informations[informations.length - 1];
        const id = (lastInfo ? parseInt(lastInfo.id) + 1 : 1).toString();
        // Get all users and filter out non-reviewers
        const allUsers = await this.getUsers();
        const reviewers = allUsers.filter(user => user.role === 'reviewer');
        const shuffledReviewers = reviewers.sort(() => Math.random() - 0.5);
        const selectedReviewers = shuffledReviewers.slice(0, 2);
        const authors = info.authors.map(author => ({
          firstName: author.firstName,
          lastName: author.lastName,
          email: author.email,
          affiliation: author.affiliation
        }));
        const reviewerObjs = selectedReviewers.map(reviewer => ({ id: reviewer.id }));
        const newInfo = {
          id: id,
          paperTitle: info.paperTitle,
          abstract: info.abstract,
          authors: authors,
          reviewers: reviewerObjs
        };
        informations.push(newInfo);
        await fs.writeJSON(this.path, informations, { flag: 'w' });
        return newInfo;
      }
      
    
    async handleRequest(request) {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        if (request.method === 'GET') {
            return this.getInformations(id)
        } else if (request.method === 'POST') {
            const info = await request.json()
            return this.addInformation(info)
        }
    }
    
}
