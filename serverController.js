const File = require('./File');
const path = require('path');

class ServerController {

    static uploadImage(req, res) {
        const files = req.files;
        const room = req.body.room;

        if (!files) {
            return res
                .status(400)
                .json({ message: 'no file uploaded' });
        } else {
            const data = files.data;
            const buffer = data.data;

            const file = new File('board.png', path.join(__dirname, 'boards', room));
            file.setContent(buffer);

            if (file.write()) {
                return res
                    .status(200)
                    .json({ message: 'ok' });
            } else {
                return res
                    .status(204)
                    .json({ message: 'could not save file' });
            }
        }
    }

    static getSingleImage(req, res) {
        const room = req.params.room;
        const file = new File('board.png', path.join(__dirname, 'boards', room));

        if (file.exists()) {
            return res.sendFile(file.fullPath);
        }

        return res
            .status(404)
            .json({ message: 'not found' });
    }

    static sendIndexHtml(req, res) {
        res.sendFile(__dirname + '/app/index.html');
    }
}

module.exports = ServerController;