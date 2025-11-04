export default function formatSeconds(seconds) {
    // Handle angka negatif
    if (seconds < 0) return "0s";

    // Jika kurang dari 60 detik
    if (seconds < 60) {
        const secs = seconds % 1 === 0 ? Math.floor(seconds) : seconds.toFixed(1);
        return `${secs}s`;
    }

    // Jika kurang dari 1 jam (3600 detik)
    if (seconds < 3600) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds - (mins * 60);

        if (secs === 0) {
            return `${mins}m`;
        }

        // Format detik dengan 1 desimal jika ada
        const secsStr = secs % 1 === 0 ? Math.floor(secs) : secs.toFixed(1);
        return `${mins}m ${secsStr}s`;
    }

    // Jika kurang dari 1 hari (86400 detik)
    if (seconds < 86400) {
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds - (hours * 3600)) / 60);
        const secs = seconds - (hours * 3600) - (mins * 60);

        let result = `${hours}h`;

        if (mins > 0) {
            result += ` ${mins}m`;
        }

        if (secs > 0) {
            const secsStr = secs % 1 === 0 ? Math.floor(secs) : secs.toFixed(1);
            result += ` ${secsStr}s`;
        }

        return result;
    }

    // Jika lebih dari 1 hari
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds - (days * 86400)) / 3600);
    const mins = Math.floor((seconds - (days * 86400) - (hours * 3600)) / 60);
    const secs = seconds - (days * 86400) - (hours * 3600) - (mins * 60);

    let result = `${days}d`;

    if (hours > 0) {
        result += ` ${hours}h`;
    }

    if (mins > 0) {
        result += ` ${mins}m`;
    }

    if (secs > 0) {
        const secsStr = secs % 1 === 0 ? Math.floor(secs) : secs.toFixed(1);
        result += ` ${secsStr}s`;
    }

    return result;
}