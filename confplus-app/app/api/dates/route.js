import datesRepo from "./dates-repo"

export async function GET(request) {
    try {
        const dates = await datesRepo.getDates()
        return Response.json(dates, { status: 200 })
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 })
    }
}