import presentersRepo from "./presenters-repo"


export async function GET(request) {
    try {
        const presenters = await presentersRepo.getPresenters()
        return Response.json(presenters, { status: 200 })
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 })
    }
}