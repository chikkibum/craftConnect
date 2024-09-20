import { Schema, model } from 'mongoose';

const PortfolioSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    projects: [{
        type: Schema.Types.ObjectId,
        ref: 'Project',
    }],
    created_at: {
        type: Date,
        default: Date.now,
    }
});

const Portfolio = model('Portfolio', PortfolioSchema);
export default Portfolio;