// Convert start time from assemblyAI into seconds
export const convertToSec = (time, buffer = 0) => {
    const newTime = (time - buffer) / 1000;
    return newTime >= 0 ? newTime : 0;
};
