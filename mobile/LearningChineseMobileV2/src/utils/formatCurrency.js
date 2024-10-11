export function formatToVnd(amount) {
    let formattedAmount = amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    return formattedAmount;
}