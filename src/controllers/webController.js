const axios = require('axios');
const http = require('https');
const fetch = require('node-fetch');

const webController = {
    callAllUser: (req, res) => {
        // // Axios
        axios({
            method: 'get',
            url: 'https://gorest.co.in/public/v2/users',
        })
        .then((response) => {
            res.status(200).render("index", {
                data: response.data,
                messages: req.flash('success'),
                failed: req.flash('error')
            });
        })
        .catch((err) => {
            res.status(404).send(err.message);
        })

        // // Http
        // http.get('https://gorest.co.in/public/v2/users', (resp) => {
        //     let data = '';

        //     // Collect chunks of data
        //     resp.on('data', (chunk) => {
        //         data += chunk;
        //     });

        //     // Response has been received
        //     resp.on('end', () => {
        //         const response = JSON.parse(data);
        //         res.status(200).render("index", {
        //             data: response,
        //             messages: req.flash('success'),
        //             failed: req.flash('error')
        //         });
        //     });

        // }).on("error", (err) => {
        //     res.status(404).send(err.message);
        // });

        // // Fetch
        // fetch('https://gorest.co.in/public/v2/users')
        //     .then(res => res.json())
        //     .then((response) => {
        //         console.log(response);
        //         res.status(200).render("index", {
        //             data: response,
        //             messages: req.flash('success'),
        //             failed: req.flash('error')
        //         });
        //     })
        //     .catch((err) => {
        //         res.status(404).send(err.message);
        //     });
    },

    callDetailUser: (req, res) => {
        // // Axios
        axios({
            method: 'get',
            url: 'https://gorest.co.in/public/v2/users/' + req.params.id,
        })
        .then((response) => {
            res.status(200).render("profile", { data: response.data });
        })
        .catch((err) => {
            res.status(404).send("Lỗi Server hoặc người dùng không tồn tại!");
        })

        // // Http
        // http.get('https://gorest.co.in/public/v2/users/' + req.params.id, (response) => {
        //     let data = '';

        //     response.on('data', (chunk) => {
        //         data += chunk;
        //     });

        //     response.on('end', () => {
        //         const userData = JSON.parse(data);
        //         res.status(200).render('profile', { data: userData });
        //     });

        // }).on('error', (err) => {
        //     console.error(err);
        //     res.status(404).send('Lỗi Server hoặc người dùng không tồn tại!');
        // });

        // // Fetch
        // fetch('https://gorest.co.in/public/v2/users/' + req.params.id)
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data);
        //         res.status(200).render("profile", { data: data });
        //     })
        //     .catch(err => {
        //         res.status(404).send("Lỗi Server hoặc người dùng không tồn tại!");
        //     });
    },

    callCreateUser: (req, res) => {
        // // Axios
        axios({
            method: 'post',
            url: 'https://gorest.co.in/public/v2/users',
            data: req.body,
            headers: {
                'Authorization': process.env.AUTH
            }
        })
        .then((response) => {
            // console.log(response.data);
            req.flash('success', 'Đã thêm người dùng thành công!');
            res.status(200).redirect('/');
        })
        .catch((err) => {
            res.status(404).send("Lỗi Server hoặc Email đã tồn tại!");
        })

        // // Http
        // const postData = JSON.stringify(req.body);

        // const options = {
        //     hostname: 'gorest.co.in',
        //     path: '/public/v2/users',
        //     method: 'POST',
        //     headers: {
        //         'Authorization': process.env.AUTH,
        //         'Content-Type': 'application/json',
        //         'Content-Length': postData.length
        //     }
        // };

        // const request = http.request(options, (response) => {
        //     let data = '';

        //     response.on('data', (chunk) => {
        //         data += chunk;
        //     });

        //     response.on('end', () => {
        //         // console.log(JSON.parse(data));
        //         req.flash('success', 'Đã thêm người dùng thành công!');
        //         res.status(200).redirect('/');
        //     });
        // });

        // request.on('error', (error) => {
        //     res.status(404).send("Lỗi Server hoặc Email đã tồn tại!");
        // });

        // request.write(postData);
        // request.end();

        // // Fetch
        // const postData = req.body;

        // fetch('https://gorest.co.in/public/v2/users', {
        //     method: 'POST',
        //     headers: {
        //         'Authorization': process.env.AUTH,
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(postData)
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         req.flash('success', 'Đã thêm người dùng thành công!');
        //         res.status(200).redirect('/');
        //     })
        //     .catch(error => {
        //         res.status(404).send("Lỗi Server hoặc Email đã tồn tại!");
        //     });
    },

    callFixUser: (req, res) => {
        // Axios
        axios({
            method: 'put',
            url: 'https://gorest.co.in/public/v2/users/' + req.params.id,
            data: req.body,
            headers: {
                'Authorization': process.env.AUTH
            }
        })
        .then((response) => {
            // console.log(response.data);
            req.flash('success', 'Đã sửa người dùng thành công!');
            res.status(200).json({ message: 'success' });
        })
        .catch((err) => {
            res.status(404).send("Lỗi Server");
        })

        // // Http
        // const options = {
        //     method: 'PUT',
        //     headers: {
        //         'Authorization': process.env.AUTH,
        //         'Content-Type': 'application/json'
        //     }
        // };

        // const request = http.request(`https://gorest.co.in/public/v2/users/${req.params.id}`, options, (response) => {
        //     let data = '';
        //     response.on('data', (chunk) => {
        //         data += chunk;
        //     });
        //     response.on('end', () => {
        //         console.log(data);
        //         req.flash('success', 'Đã sửa người dùng thành công!');
        //         res.status(200).json({ message: 'success' });
        //     });
        // });

        // request.on('error', (err) => {
        //     res.status(404).send("Lỗi Server");
        // });

        // request.write(JSON.stringify(req.body));
        // request.end();

        // // Fetch
        // fetch(`https://gorest.co.in/public/v2/users/${req.params.id}`, {
        //     method: 'PUT',
        //     headers: {
        //         'Authorization': process.env.AUTH,
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(req.body)
        // })
        //     .then(response => {
        //         // console.log(req.body);
        //         // console.log(req.params.id);
        //         req.flash('success', 'Đã sửa người dùng thành công!');
        //         res.status(200).json({ message: 'success' });
        //     })
        //     .catch(error => {
        //         res.status(404).send("Lỗi Server");
        //     });
    },

    callDelUser: (req, res) => {
        // Axios
        axios({
            method: 'delete',
            url: 'https://gorest.co.in/public/v2/users/' + req.params.id,
            headers: {
                'Authorization': process.env.AUTH
            }
        })
        .then((response) => {
            req.flash('success', 'Đã xoá người dùng thành công!');
            res.status(200).json({ message: 'success' });
        })
        .catch((err) => {
            res.status(404).send("Lỗi Server");
        })

        // // Http
        // const options = {
        //     method: 'DELETE',
        //     headers: {
        //         'Authorization': process.env.AUTH
        //     }
        // };

        // const request = http.request(`https://gorest.co.in/public/v2/users/${req.params.id}`, options, (response) => {
        //     let data = '';
        //     response.on('data', (chunk) => {
        //         data += chunk;
        //     });
        //     response.on('end', () => {
        //         console.log(req.params.id);
        //         req.flash('success', 'Đã xoá người dùng thành công!');
        //         res.status(200).json({ message: 'success' });
        //     });
        // });

        // request.on('error', (err) => {
        //     res.status(404).send("Lỗi Server");
        // });

        // request.end();

        // // Fetch
        // const options = {
        //     method: 'DELETE',
        //     headers: {
        //         'Authorization': process.env.AUTH
        //     }
        // };

        // fetch(`https://gorest.co.in/public/v2/users/${req.params.id}`, options)
        //     .then((response) => {
        //         console.log(req.params.id);
        //         req.flash('success', 'Đã xoá người dùng thành công!');
        //         res.status(200).json({ message: 'success' });
        //     })
        //     .catch((err) => {
        //         res.status(404).send("Lỗi Server");
        //     });
    }
}

module.exports = webController;