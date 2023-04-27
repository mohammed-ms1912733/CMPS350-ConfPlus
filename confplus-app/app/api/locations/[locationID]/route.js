import locationsRepo from "../locations-repo"

export async function GET(request, { params }) {
    try {
        const id = params.locationID;
        const location = await locationsRepo.getLocationById(id);
        return Response.json(location, { status: 200 });
        
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const id = params.locationID;
        const location = await request.json();
        await locationsRepo.updateLocation(location, id);
        return Response.json({ message: "Location updated successfully" }, { status: 200 });
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}
