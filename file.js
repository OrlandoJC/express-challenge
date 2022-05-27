const fs = require("fs")

class Contenedor {
    constructor(filename) {
        this.filename = `${filename}.txt`
    }

    fileExists(filename) {
        return fs.existsSync(filename)
    }

    async saveIntoFile(filename, data) {
        try {
            await fs.promises.writeFile(
                filename,
                JSON.stringify(data, null, 4)
            )
        } catch (err) {
            console.log("Ocurrió un error al guardar el elemento", err)
        }
    }

    async getDataFile(filename) {
        if (!this.fileExists(filename))
            return []
        try {
            const content = await fs.promises.readFile(filename, 'utf8')
            return content ? JSON.parse(content) : []
        } catch (err) {
            console.log("Hubo un error al obtener los datos ", err)
        }
    }

    async save(object) {
        const dataFile = await this.getDataFile(this.filename)
        const idAsigned = dataFile.length + 1;

        try {
            await this.saveIntoFile(this.filename, [...dataFile, { ...object, id: idAsigned }])
            return idAsigned
        } catch (err) {
            console.log("Hubo un erro al guardar los datos ", err)
        }
    }

    async getById(id) {
        try {
            const dataObjects = await this.getDataFile(this.filename)
            return dataObjects.find(object => object.id === id)
        } catch (err) {
            console.log("Hubo un error al obtener el elemento ", err)
        }
    }

    async getAll() {
        try {
            const data = await this.getDataFile(this.filename)
            return data;
        } catch (err) {
            console.log("Hubo un erro al obtener los datos", err)
        }
    }

    async deleteById(id) {
        try {
            const dataObjects = await this.getDataFile(this.filename)
            const newData = dataObjects.filter(object => object.id != id)
            await this.saveIntoFile(this.filename, newData)
        } catch(err) {
            console.log("Hubo un error al borrar el elemento", err)
        }
    }

    async deleteAll() {
        await fs.promises.writeFile(`./${this.filename}`, '')
    }
}

module.exports = Contenedor;

