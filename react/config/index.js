/**
 * @author Jay
 * @date 2019-4-1
 * @description  config
 */

const config = {};

let BASE_API = "";

if (BUILD_ENV === "sit") {
  BASE_API = "https://api.shanghaim.net/mock/31/api/";
} else if (BUILD_ENV === "uat") {
  BASE_API = "https://api.shanghaim.net/mock/31/api/";
} else if (BUILD_ENV === "pr") {
  BASE_API = "https://api.shanghaim.net/mock/31/api/";
} else if (BUILD_ENV === "prod") {
  BASE_API = "https://api.shanghaim.net/mock/31/api/";
} else {
  BASE_API = "http://api.shanghaim.net/mock/31/api/";
}

export { BASE_API };

export default config;
