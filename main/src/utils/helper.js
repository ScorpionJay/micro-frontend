/**
 * @author Jay
 * @date 2020-01-01
 * @description
 */
export const generateUuid = () =>
  new Date().getTime().toString() + Math.ceil(Math.random() * Math.pow(10, 8));
export function getQueryString(search, name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
export const dataURLtoFile = (dataurl, filename) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {
    type: mime
  });
};
