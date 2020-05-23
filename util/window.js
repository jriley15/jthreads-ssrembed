export const openWindowCentered = (url) => {
  let w = 400;
  let h = 500;
  const y =
    (outerHeight === -1 ? window.top.outerHeight : outerHeight) / 2 +
    (screenY === -1 ? window.top.screenY : screenY) -
    h / 2;
  const x =
    (outerWidth === -1 ? window.top.outerWidth : outerWidth) / 2 +
    (screenX === -1 ? window.top.screenX : screenX) -
    w / 2;
  window.open(
    url,
    "Login",
    "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=" +
      w +
      ", height=" +
      h +
      ", top=" +
      y +
      ", left=" +
      x
  );
};
