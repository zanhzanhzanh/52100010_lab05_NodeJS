// Hàm covert request data sang object
const parseModule = (req, res, next) => {
    let body = '';

    // Lắng nghe sự kiện data
    req.on('data', (data) => {
        // Thu nhập các chunk của yêu cầu và gộp lại thành một chuỗi
        body += data;
    });
    // Lắng nghe sự kiện end
    req.on('end', () => {
        // Regex replace undefined to null
        body = body.replace(/([^=&]+)=(&|$)/g, '$1=null$2');

        // Chuyển thành một object
        let data = {};
        const parts = body.split('&');
        parts.forEach(part => {
            const [key, value] = part.split('=');
            data[key] = decodeURIComponent(value) || null;
        });

        // Gắn vào body
        req.body = data;

        // Chuyển sang middleware tiếp theo
        next();
    });
}

// Export
module.exports = parseModule;