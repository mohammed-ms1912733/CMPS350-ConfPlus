import scheduleRepo from "./schedules-repo"

export async function GET(request) {
    try {
        const schedules = await scheduleRepo.getSchedules()
        return Response.json(schedules, { status: 200 })
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const schedule = await request.json()
        await scheduleRepo.addSchedule(schedule)
        return Response.json({ message: "Schedule added successfully" }, { status: 201 })
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 })
    }
}



