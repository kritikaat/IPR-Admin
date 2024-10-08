import prisma from "../DB/db.config.js";

export const fetchRatings = async (req, res) => {
    try {
        const ratings = await prisma.ratings.findMany();
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    fetchRatings
};
