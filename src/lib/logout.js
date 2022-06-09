export default function logout(event) {
    localStorage.removeItem('user');
    window.location.href = '/';
}