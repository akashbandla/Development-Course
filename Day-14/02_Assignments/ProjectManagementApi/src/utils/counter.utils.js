import Counters from "../models/counter.model.js";

export async function getNextSequence(counterName) {

    const counter = await Counters.findOneAndUpdate(
        { _id: counterName },
        { $inc: { sequence: 1 } },
        {
            new: true,
            upsert: true
        }
    );
    
    return counter.sequence;
}