import scheduleRepo from "../../../schedules-repo"


export async function GET(request, { params }) {
    try {
        const scheduleId = params.id;
        const sessionId = params.sid;
        const session = await scheduleRepo.getSessionById(scheduleId, sessionId);
        return Response.json(session, { status: 200 })
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 })
    }
}

export async function PUT(request, { params }) {
    try {
        const scheduleId = params.id;
        const sessionId = params.sid;
        const session = await request.json()
        await scheduleRepo.updateSession(scheduleId, sessionId, session)
        return Response.json({ message: "Session updated successfully" }, { status: 201 })
    }
    catch (error) {
        return Response.json({ message: error.message }, { status: 500 })
    }
}

export async function DELETE(request, { params }) {
    try {
        const scheduleId = params.id;
        const sessionId = params.sid;
        await scheduleRepo.deleteSession(scheduleId, sessionId)
        return Response.json({ message: "Session deleted successfully" }, { status: 201 })
    }
    catch (error) {
        return Response.json({ message: error.message }, { status: 500 })
    }
}