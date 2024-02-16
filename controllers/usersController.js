exports.createAccountForm = (req,res) => {
    res.render('create-account', {
        namePage: 'Create account'
    });
};