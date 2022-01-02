const index = (req, res) => {
    res.render('public/index',{layout: './layout/auth.ejs'});
}

module.exports = {
    index,
}