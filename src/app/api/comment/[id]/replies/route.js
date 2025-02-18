import db from "prisma/db";

export async function GET(_request, { params }) {

    console.log("params id", params.id)

    try {
        const replies = await db.comment.findMany({
            where: {
                parentId: parseInt(params.id)
            },
            include: {
                author: true
            }
        });
        return Response.json(replies);
    } catch (error) {
        console.error("Error fetching replies:", error);
        return Response.error("Internal Server Error", { status: 500 });
    }
}
