import datesRepo from "../dates-repo"


export async function GET(request, { params }) {
    try {
        const id = params.did
        const date = await datesRepo.getDateById(id)
        return Response.json(date, { status: 200 })
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 })
    }
}

export async function PUT(request, { params }) {
    try {
        const date = await request.json()
        const id = params.did
        await datesRepo.updateDate(date, id)
        return Response.json({ message: "Date updated successfully" }, { status: 201 })
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 })
    }
}