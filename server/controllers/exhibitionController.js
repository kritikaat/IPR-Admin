import prisma from "../DB/db.config.js";

export const fetchExhibitiondata = async (req, res) => {
    try {
        const fetchExhibitiondata = await prisma.IPRExhibitionForm.findMany();
        res.status(200).json(fetchExhibitiondata);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    fetchExhibitiondata
};