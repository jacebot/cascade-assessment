// users hardcoded for simplicity, obviously store in a db, hashed/salted, etc...
const users = [{ id: 1, email: 'tester@cascadefintech.com', password: 'VegansRule', phone: '3332221111' }];

module.exports = {
    login,
    getUser
};

async function login({ email, password, phone }) {
    const user = users.find(u => u.email === email && u.password === password && u.phone === phone);
    if (user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}

async function getUser() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}
