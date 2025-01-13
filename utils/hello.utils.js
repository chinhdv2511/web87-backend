export const SLOGAN_1 = "Thể thao là không ngừng bỏ cuộc";
export const SLOGAN_2 = "Mãi mãi 1 tình yêu vĩnh cửa";

export function sayHelloByVietnamese() {
    console.log("Xin chào");
}

export function sayHelloByEnglish() {
    console.log("Hello world");
}

export function sayHelloByRussian() {
    console.log("привет");
}

export function home(req, res) {
    console.log("Home page");

    return res.status(200).json({
        message: "This is homepage",
        author: "Chinh Do",
        contact: {
            email: "chinhdv2511@gmail.com",
            phoneNumber: "0987654321",
            address: "Ha Noi"
        }
    });
}

export function login(req, res) {
    console.log("Client requested login function");

    return res.status(200).json({
        message: "Login successfully",
        accessToken: "blalblablabla",
        refreshToken: "blalblalbla"
    });
}

export function register(req, res) {
    console.log("Client requested login function");

    return res.status(200).json({
        message: "Register successfully",
    });
}

export function forgotPassword(req, res) {
    console.log("Client requested login function");

    return res.status(200).json({
        message: "An email was sent to your email. Please check"
    });
}
