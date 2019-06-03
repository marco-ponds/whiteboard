const path = require('path');
const fs = require('fs');

class File {

    static getExtension(name) {
        return '.'.concat(name.split('.').slice(1).join('.'));
    }

    constructor(name, path) {
        this.name = name;
        this.extension = File.getExtension(this.name);

        this.setPath(path);
    }

    toJSON() {
        // potwntially add more informations about the file
        return {
            name: this.name,
            extension: this.extension,

            folder: this.folder,
            fullPath: this.fullPath
        };
    }

    setPath(folder) {
        this.folder = folder;
        this.fullPath = path.join(this.folder, this.name);

        this.content = undefined;
        this.isBuffer = false;
    }

    exists() {
        return fs.existsSync(this.fullPath);
    }

    folderExists() {
        return fs.existsSync(this.folder);
    }

    setContent(content) {
        if (content instanceof Buffer) {
            this.isBuffer = true;
        }

        this.content = content;
    }

    hasContent() {
        return !!this.content;
    }

    read() {
        if (this.exists()) {
            const content = fs.readFileSync(this.fullPath);

            this.setContent(content);
            return content;
        }

        return false;
    }

    write() {
        if (this.hasContent()) {
            if (this.isBuffer) {
                return this.writeBuffer();
            }
            return this.writeText();
        }

        return false;
    }

    writeBuffer() {
        try {
            const write = () => {
                const descriptor = fs.openSync(this.fullPath, 'w');
                fs.writeSync(descriptor, this.content, 0, this.content.length, null);
                fs.closeSync(descriptor);
            };

            if (!this.folderExists()) {
                fs.mkdir(this.folder, { recursive: true }, write);
            } else {
                write();
            }

            return true;
        } catch (e) {
            return false;
        }
    }

    writeText() {
        try {
            const write = () => {

            };

            if (!this.folderExists()) {
                fs.mkdir(this.folder, { recursive: true }, write);
            } else {
                write();
            }

            return true;
        } catch (e) {
            return false;
        }
    }

    move(destination) {

    }
}

module.exports = File;
