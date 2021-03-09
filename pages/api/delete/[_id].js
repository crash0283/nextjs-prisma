import Employee from "../../../models/employee.js"
import connectDB from "../../../lib/connect/connect"

export default async function handle(req, res) {
    await connectDB()
    const postId = req.query._id
    if (req.method === "DELETE") {
        const result = await Employee.deleteOne({
             _id: postId
        })
        res.json(result)
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        )
    }
}