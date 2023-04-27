import locationsRepo from "./locations-repo"

export async function GET(request) {
    try {
        const locations = await locationsRepo.getLocations()
        return Response.json(locations, { status: 200 })
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 })
    }
}