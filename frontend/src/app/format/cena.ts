export function getCookie(key: string) {
    const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }
  
  export function wyswietlFormat(amount: number) {
    return (amount/100).toFixed(2) + 'zł' ;
  }