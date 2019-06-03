const File = require('./File');

class ServerController {

    static uploadImage(req, res) {
        const files = req.files;

        if (!files) {
            return res
                .status(400)
                .json({ message: 'no file uploaded' });
        } else {
            const data = files.data;
            const buffer = data.data;

            const file = new File('board.png', __dirname);
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
         const file = new File('board.png', __dirname);

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