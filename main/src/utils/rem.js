/**
 * @author Jay
 * @date 2020-01-01
 * @description  rem
 * @param {*} window
 * @param {*} document
 */
const flexible = function(window, document) {
  var docEl = document.documentElement;
  var dpr = window.devicePixelRatio || 1;
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = 12 * dpr + "px";
    } else {
      document.addEventListener("DOMContentLoaded", setBodyFontSize);
    }
  }
  setBodyFontSize();
  function setRemUnit() {
    var rem = (docEl.clientWidth / 1440) * 100; // 1024设计稿
    docEl.style.fontSize = rem + "px";
  }
  setRemUnit();
  window.addEventListener("resize", setRemUnit);
  window.addEventListener("pageshow", function(e) {
    if (e.persisted) {
      setRemUnit();
    }
  });
  if (dpr >= 2) {
    var fakeBody = document.createElement("body");
    var testElement = document.createElement("div");
    testElement.style.border = ".5px solid transparent";
    fakeBody.appendChild(testElement);
    docEl.appendChild(fakeBody);
    if (testElement.offsetHeight === 1) {
      docEl.classList.add("hairlines");
    }
    docEl.removeChild(fakeBody);
  }
};
export default flexible;
