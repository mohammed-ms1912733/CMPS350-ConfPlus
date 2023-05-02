import InstitutionsRepo from "./institutions-repo.js";

export async function GET(request) {
    try {
        const institutions = await InstitutionsRepo.getInstitutions();
        return Response.json(institutions, {
            status: 200,
        });
    } catch (error) {
        return Response.json(
            {
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }   
}
