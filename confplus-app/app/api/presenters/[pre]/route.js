import presentersRepo from "../presenters-repo"


export async function GET(request, { params }) {
    try {
        const id = params.pre
        const presenter = await presentersRepo.getPresenterById(id)
        return Response.json(presenter, { status: 200 })
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 })
    }
}



export async function PUT(request, { params }) {
    try {
        const presenter = await request.json()
        const id = params.pre
        await presentersRepo.updatePresenter(presenter, id)
        return Response.json({ message: "Presenter updated successfully" }, { status: 201 })
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 })
    }
}