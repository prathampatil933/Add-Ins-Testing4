import('node-fetch').then(fetch => {
    const express = require('express');
    const path = require('path');

    const app = express();
    const PORT = process.env.PORT || 3000;

    app.use(express.json());

    app.post('/send-message', async (req, res) => {
        try {
            const message = req.body.message;
            const webhookUrl = 'https://steepgraphspl.webhook.office.com/webhookb2/d9bd266e-fe11-410e-94ca-74104a1fce94@d2318691-da8f-45b7-bac5-a8d20f5c1385/IncomingWebhook/583689afa6ae42c8a5f9331ead8012f5/5d174718-ec3b-48d4-a79b-9e08d942a590';

            const response = await fetch.default(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: message })
            });

            if (response.ok) {
                res.send('Message sent successfully');
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            res.status(500).send('An error occurred');
        }
    });

    // Serve static files (index.html, CSS, JavaScript, etc.)
    app.use(express.static(__dirname));

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
