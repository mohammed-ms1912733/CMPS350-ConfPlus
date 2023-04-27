import scheduleRepo from "../../../../../schedules-repo"

export async function DELETE(request, { params }) {
    try {
        const scheduleId = params.id;
        const sessionId = params.sid;
        const presenterId = params.pid;
        await scheduleRepo.deletePresenter(scheduleId, sessionId, presenterId)
        return Response.json({ message: "Presenter deleted successfully" }, { status: 201 })
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 })
    }
}

