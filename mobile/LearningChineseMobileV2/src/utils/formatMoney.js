export function formatMoney(num) {
    if (num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  }