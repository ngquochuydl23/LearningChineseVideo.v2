export function getInitCharOfFullName(text) {
    
  let full_name = text.split(" ");
  let initials = full_name[0][0];
  if (text) {
    if (full_name.length >= 2 && full_name[1]) {
      initials += full_name[1][0];
    }
  } else {
    initials = '';
  }
  return initials;
}