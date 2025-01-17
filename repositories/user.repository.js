import fs from 'fs';

export const createUser = (user) => {
    // 1. lấy ra nội dung file users.json
    const userFileContent = fs.readFileSync('data/users.json');

    // 2. chuyển đổi nội dung file -> mảng
    const userData = JSON.parse(userFileContent);

    // 3. thêm user vào mảng userData
    userData.push(user);

    // 4. lưu lại userData
    fs.writeFileSync('data/users.json', JSON.stringify(userData));

    return user;
}

export const getUserByEmailAndPassword = (email, password) => {
    // 1. lấy ra nội dung file users.json
    const userFileContent = fs.readFileSync('data/users.json');

    // 2. chuyển đổi nội dung file -> mảng
    const userData = JSON.parse(userFileContent);

    // 3. tìm user trong userData theo email, password
    const existedUser = userData.find(item => item.email == email && item.password == password);

    return existedUser;
}