import prisma from "../DB/db.config.js";

export const fetchVisitors = async (req, res) => {
    try {
        const ratings = await prisma.Visitor.findMany();
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    fetchVisitors
};
