const Product = require('../models/Products');

module.exports.addProduct = (req, res) => {
    let newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        isActive: req.body.isActive,
    });
    return newProduct.save().then((product, error) => {
        if (error) {
            return res.send(false);
        }
        else {
            return res.send(true);
        }
    }).catch(error => res.send(error))
}

module.exports.getAllProducts = (req, res) => {
    return Product.find({}).then(result => {
        return res.send(result)
    });
}

module.exports.activeProducts = (req, res) => {
    return Product.find({ isActive: true }).then(result => {
        return res.send(result)
    })
}

module.exports.getSingleProduct = (req, res) => {
    return Product.findById(req.params.productId).then(result => {
        return res.send(result)
    })
}

module.exports.updateProduct = (req, res) => {
    let updatedProduct = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    };

    return Product.findByIdAndUpdate(req.params.productId, updatedProduct).then((product, error) => {
        if (error) {
            return res.send(false)
        }
        else {
            return res.send(true)
        }
    }).catch(error => res.send(error))

}

module.exports.archiveProduct = (req, res) => {
    let productStatus = {
        isActive: false
    }
    return Product.findByIdAndUpdate(req.params.productId, productStatus).then((product, error) => {
        if (error) {
            return res.send(false)
        }
        else {
            return res.send(true)
        }
    })
}

module.exports.activateProduct = (req, res) => {
    let archivedProduct = {
        isActive: true
    }
    return Product.findByIdAndUpdate(req.params.productId, archivedProduct).then((product, error) => {
        if (error) {
            return res.send(false)
        }
        else {
            return res.send(true)
        }
    })
}