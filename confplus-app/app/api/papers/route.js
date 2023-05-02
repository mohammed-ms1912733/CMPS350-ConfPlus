import papersRepo from "./papers-repo";

export async function GET(request) {
    try {
        const papers = await papersRepo.getPapers();
        return Response.json(papers, { status: 200 });
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const paper = await request.json();
        await papersRepo.addPaper(paper);
        return Response.json({ message: "Paper added successfully" }, { status: 201 });
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}