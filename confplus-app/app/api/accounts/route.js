import accountRepo from './account-repo';

export async function GET(request){
    try {
        const users = await accountRepo.getAccounts();
        return Response.json(users, {status: 200})
    } catch (error) {
        return Response.json({message: error.message}, {status: 500})
    }
}