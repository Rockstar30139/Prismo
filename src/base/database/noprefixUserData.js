const mongoData = require("../../models/noprefixUserData");
module.exports = class noprefixUserData {
    /**
     *
     * @param {import('../database')} database
     */
    constructor(database) {
        this.database = database;
    }
    async get(id) {
        let data = await mongoData.findOne({ id: id });
        if (!data) {
            data = new mongoData({ id: id });
            await data.save();
        }
        if (data) return data;
    }

    async put(id, data) {
        let newData = await this.get(id);
        newData.userids = data.userids;
        await newData.save();
        return newData;
    }
};
// Path: src\base\database\prefix.js
