export const landingPage = (req, res) => {
    try {
        res.status(200).json({
            message: 'backend responding...'
        });
    } catch (error) {
        res.status(500).json({
            message: 'backend error'
        });
    }
};