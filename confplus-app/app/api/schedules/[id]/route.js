import scheduleRepo from "../schedules-repo"

export async function GET(request, { params }) {
    try {
        const id = params.id;
        const schedule = await scheduleRepo.getScheduleById(id);
        return Response.json(schedule, { status: 200 });
        
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const schedule = await request.json();
        const id = params.id;
        await scheduleRepo.updateSchedule(schedule, id);
        return Response.json({ message: "Schedule updated successfully" }, { status: 201 });
      
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
  }

export async function DELETE(request, { params }) {
    try {
        const id = params.id;
        await scheduleRepo.deleteSchedule(id);
        return Response.json({ message: "Schedule deleted successfully" }, { status: 201 });
      
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}