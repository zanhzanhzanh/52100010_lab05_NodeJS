const validationMoudle = (req, res, next) => {
    // Check Null
    if(req.body.name === "null" || req.body.email === "null") {
        req.flash('error', 'Vui lòng nhập đủ thông tin!');

        // Check if PUT
        if(req.method === 'PUT') res.end();
        // else Method
        else res.redirect('/public-api/users/add');
    }

    // Regex email
    else if(!(req.body.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))) {
        req.flash('error', 'Email không đúng định dạng!');

        // Check if PUT
        if(req.method === 'PUT') res.end();
        // else Method
        else res.redirect('/public-api/users/add');
    }

    // Send to next Middleware
    else {
        // if status null then status is inactive
        if(req.body.status === undefined) req.body.status = "inactive";
        next();
    }
}

module.exports = validationMoudle;