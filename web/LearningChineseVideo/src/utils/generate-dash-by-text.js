export default function generateDashByText(title) {
    var res = title.toLowerCase();
    res = res.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    res = res.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    res = res.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    res = res.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    res = res.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    res = res.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    res = res.replace(/đ/g, "d");
    res = res.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
    res = res.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    res = res.replace("[^A-Za-z0-9_\.~]+", "-");
    return "/" + res.replace(/\s+/g, '-');
}