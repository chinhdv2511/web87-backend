import tutorialRepository from "../repositories/tutorial.repository.js";

const tutorialController = {

    mongoTutorial: async (req, res) => {
        const result = await tutorialRepository.c12();
        return res.status(200).json(result);
    }

};

export default tutorialController;