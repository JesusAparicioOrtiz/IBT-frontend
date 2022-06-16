export default function dateFormatter (d) {
    console.log(typeof d)
    return ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear();
}