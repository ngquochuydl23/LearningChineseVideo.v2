export function readStorageUrl(path) {
    //return "https://hayugo.edu.vn/api" + path;
    if (!path) {
        return null;
    }
    return "http://192.168.1.14:7700/api" + path;
}