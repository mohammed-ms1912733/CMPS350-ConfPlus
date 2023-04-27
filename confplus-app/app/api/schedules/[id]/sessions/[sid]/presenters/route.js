import scheduleRepo from "../../../../schedules-repo"

export async function GET(request, { params }) {
    try {
        const scheduleId = params.id;
        const sessionId = params.sid;
        const presenters = await scheduleRepo.getPresenters(scheduleId, sessionId);
        return Response.json(presenters, { status: 200 })
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 })
    }
}

export async function POST(request, { params }) {
    try {
        const scheduleId = params.id;
        const sessionId = params.sid;
        const presenter = await request.json()
        await scheduleRepo.addPresenter(scheduleId, sessionId, presenter)
        return Response.json({ message: "Presenter added successfully" }, { status: 201 })
    }
    catch (error) {
        return Response.json({ message: error.message }, { status: 500 })
    }
}