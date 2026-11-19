const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/check', async (req, res) => {
    const phone = (req.query.phone || '').replace(/\D+/g, '');

    if (!phone) {
        return res.status(400).json({ error: 'Numéro manquant' });
    }

    const result = {
        phone,
        status: 'online',
        reason: 'Allowed to use WhatsApp',
        violation: '0',
        permanent: 'No',
        modBan: 'No',
        appeal: 'N/A'
    };

    res.json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur CDX CHECKAN actif sur le port ${PORT}`);
});
          
