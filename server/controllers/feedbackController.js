import prisma  from "../DB/db.config.js";

export const fetchFeedback = async (req, res) => {
    try {
        const feedback = await prisma.feedbackForm.findMany({
            include: {
                ratings: true, 
            },
        });
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export default {
    fetchFeedback
};