/*
** @author: Sylvain Garant
** @website: https://github.com/Xobtah
*/

let CollectionController = function () {
    this.collection = null;
};

CollectionController.prototype.Insert = function (object, callback) {
    if (!this.collection)
        throw new Error('Empty collection');
    if (typeof object !== 'object')
        throw new Error('Argument is not a valid entry');
    return (this.collection.insert(object, callback));
};

CollectionController.prototype.Find = function (query) {
    if (!this.collection)
        throw new Error('Empty collection');
    return (this.collection.find(query));
};

CollectionController.prototype.FindOne = function (query, callback) {
    if (!this.collection)
        throw new Error('Empty collection');
    return (this.collection.findOne(query, callback));
};

CollectionController.prototype.Update = function (query, object, callback) {
    if (!this.collection)
        throw new Error('Empty collection');
    return (this.collection.update(query, object, callback));
};

CollectionController.prototype.UpdateOne = function (query, object, callback) {
    if (!this.collection)
        throw new Error('Empty collection');
    return (this.collection.updateOne(query, object, callback));
};

CollectionController.prototype.Remove = function (query) {
    if (!this.collection)
        throw new Error('Empty collection');
    return (this.collection.remove(query));
};

module.exports = CollectionController;