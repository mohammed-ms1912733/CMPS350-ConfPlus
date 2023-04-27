import scheduleRepo from "../../schedules-repo"

export async function GET(request, { params }) {
    try {
        const scheduleId = params.id;
        const sessions = await scheduleRepo.getSessions(scheduleId);
        return Response.json(sessions, { status: 200 })
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 })
    }
}

export async function POST(request, { params }) {
    try {
        const scheduleId = params.id;
        const session = await request.json()
        await scheduleRepo.addSession(scheduleId, session)
        return Response.json({ message: "Session added successfully" }, { status: 201 })
    }
    catch (error) {
        return Response.json({ message: error.message }, { status: 500 })
    }
}
