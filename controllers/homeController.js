exports.home = (req,res) => {
    res.render('home', {
        namePage: 'Homepage'
    });
};