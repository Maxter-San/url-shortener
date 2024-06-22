const Url = require("./url.model");

const apiURL = async (req, res) => {
    try {
        res.send(`asdf`);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

const addURL = async (req, res) => {
    try {
        const { url, time } = req.body;

        const shortId = Math.random().toString(36).substring(7);
        const expiresAt = time ? new Date(Date.now() + 3600000 * time) : null; // 1 hora (3600000)

        const newUrl = new Url({ originalUrl: url, shortId, expiresAt });
        await newUrl.save();

        //res.send({ shortUrl: newUrl });
        res.send({ message: `¡URL creado correctamente!`,
                   shortURL: `http://${req.get('host')}/api/url/${shortId}`
         });
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

const getURL = async (req, res) => {
    const shortId = req.params.shortId;
    const urlEntry = await Url.findOne({ shortId });

    if (urlEntry) {
        if (urlEntry.expiresAt && urlEntry.expiresAt < new Date()) {
            await Url.deleteOne({ shortId });
            res.status(410).send({ message: `URL ha expirado` });
        } else {
            //res.redirect(urlEntry.originalUrl);
            res.send({ message: `${urlEntry.originalUrl}` });
        }
    } else {
        res.status(404).send({ message: `URL no encontrada` });
    }
}

module.exports = {
    apiURL,
    addURL,
    getURL
};