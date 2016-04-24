var express.Router().

route('/test')
    //create
    .post(function(req, res) {
        res.json({message: 'Posted'});
    })
    //retrieve
    .get(function(req, res) {
        res.json({message: 'Geted'});
    })
    //update
    .put(function(req, res) {
        res.json({message: 'Puted'});
    })
    //delete
    .delete(function(req, res) {
        res.json({message: 'Deleted'});
    });


