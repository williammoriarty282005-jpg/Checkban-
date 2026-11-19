const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/check', (req, res) => {
    const phone = (req.query.phone || '').replace(/\D+/g, '');

    if (!phone) {
        return res.status(400).json({ error: 'Numéro manquant' });
    }

    if (phone.endsWith('99')) {
        return res.json({
            phone,
            status: 'ban',
            reason: 'Not allowed to use WhatsApp',
            violation: '21',
            permanent: 'No',
            modBan: 'No',
            appeal: 'Yes'
        });
    }

    if (phone.endsWith('88')) {
        return res.json({
            phone,
            status: 'spam',
            reason: 'Spam / Temporary restriction',
            violation: '14',
            permanent: 'No',
            modBan: 'No',
            appeal: 'Yes'
        });
    }

    res.json({
        phone,
        status: 'online',
        reason: 'Allowed to use WhatsApp',
        violation: '0',
        permanent: 'No',
        modBan: 'No',
        appeal: 'N/A'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur CDX CHECKAN actif sur le port ${PORT}`);
});
