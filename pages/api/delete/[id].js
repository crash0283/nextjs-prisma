import prisma from "../../../lib/prisma"

export default async function handle(req, res) {
    const postId = req.query.id
    if (req.method === "DELETE") {
        const result = await prisma.employees.delete({
            where: { id: Number(postId) }
        })
        res.json(result)
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        )
    }
}