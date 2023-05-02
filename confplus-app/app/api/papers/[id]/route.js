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

export async function POST(request, { params }) {
    try {
        const review = await request.json();
        await papersRepo.addReview(review, params.id);
        return Response.json({ message: "Review added successfully" }, { status: 200 });
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}