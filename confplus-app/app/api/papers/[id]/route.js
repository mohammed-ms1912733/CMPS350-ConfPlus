import papersRepo from "../papers-repo";

export async function PUT(request, { params }) {
    try {
        const paper = await request.json();
        await papersRepo.updatePaper(paper, params.id);
        return Response.json({ message: "Paper updated successfully" }, { status: 200 });
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}