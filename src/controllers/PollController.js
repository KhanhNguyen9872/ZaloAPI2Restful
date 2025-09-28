// PollController - Clean Architecture controller for poll operations
const PollService = require('../services/PollService');
const ErrorMiddleware = require('../middleware/errorMiddleware');

class PollController {
    constructor() {
        this.pollService = new PollService();
    }

    // Get poll detail
    getPollDetail = async (req, res) => {
        try {
            const { pollId } = req.params;
            const result = await this.pollService.getPollDetail(pollId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Lock poll
    lockPoll = async (req, res) => {
        try {
            const { pollId } = req.params;
            const result = await this.pollService.lockPoll(pollId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };
}

module.exports = PollController;
