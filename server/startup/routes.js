const express = require('express');


module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(express.static("../../dist"));

    // Handle every other request with the Vue app's index.html
    app.get('*', (req, res) => {
        res.sendFile(`C:\\Users\\Elksass\\Desktop\\p\\no_chat\\dist\\index.html`);
    });
}

