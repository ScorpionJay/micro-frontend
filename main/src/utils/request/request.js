/**
 * @author Jay
 * @date 2020-01-01
 * @description http
 */
/*eslint-disable */
import { BASE_API } from "@config";
import { Toast } from "Components";
import { Session as Storage } from "Utils/storage";
export default async function({
  url,
  method = "get",
  data = {},
  headers = { "Content-Type": "application/json" },
  loading = false,
  timeout = 30000
}) {
  // fetch promise
  const fetchPromise = new Promise((resolve) => {
    let requestConfig = {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };

    if (!url) return;
    // url
    url = url.includes("://") || url.includes("json") ? "json/" + url : BASE_API + url;

    //token
    if (Storage.get("token")) {
      requestConfig.headers.token = Storage.get("token");
    }

    // header
    if (Object.keys(headers).length !== 0) {
      Object.assign(requestConfig.headers, headers);
    }

    // header
    requestConfig.headers = {
      ...requestConfig.headers,
      version: 1,
      source: "pc",
      requestNo: new Date().getTime() // or use uuid
    };

    // method & data
    if (method.toLowerCase() === "post" || method.toLowerCase() === "put") {
      // form or json
      const contentType = requestConfig.headers["Content-Type"];
      if (contentType === "application/json") {
        Object.defineProperty(requestConfig, "body", {
          value: JSON.stringify(data)
        });
      } else if (contentType === "multipart/form-data") {
        // from upload
        const form = new FormData();
        Object.keys(data).forEach((key) => {
          form.append(key, data[key]);
        });
        Object.defineProperty(requestConfig, "body", {
          value: form
        });
        delete requestConfig.headers["Content-Type"];
      }
    } else if (method.toLowerCase() === "get") {
      const str = Object.entries(data)
        .reduce((acc, cur) => acc.concat(cur.join("=")), [])
        .join("&");
      url += "?" + str;
    }

    fetch(url, requestConfig)
      .then((response) => {
        //  check data
        return response;
      })
      .then((response) => {
        let responseData;
        switch (requestConfig.headers.Accept) {
          // json
          case "application/json":
            responseData = response.json();
            break;
          // text
          case "text/html":
            responseData = response.text();
            break;
          // download
          case "application/octet-stream":
            const blob = response.blob();
            const a = document.createElement("a");
            const fileurl = window.URL.createObjectURL(blob);
            const filename = response.headers.get("Content-Disposition");
            a.href = fileurl;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(fileurl);
            break;
        }
        return responseData;
      })
      .then((data) => {
        resolve(data);
      });
  });

  // timeout promise
  const timeoutPromise = new Promise(function(resolve, reject) {
    const time = setTimeout(() => {
      clearTimeout(time);
      reject(new Error("请求超时"));
    }, timeout);
  });

  // loading
  loading && Toast.loading("loading");

  // check network
  if (!window.navigator.onLine) {
    console.log("no network");
    Toast.fail("no network");
    return;
  }

  try {
    const result = await Promise.race([fetchPromise, timeoutPromise]);
    // Toast.hide();

    if (+result.code !== 200) {
      Toast.fail(result.msg || result.error);
      // 错误信息收集 发送到服务器
    } else {
      result.state = true;
    }
    return result;
  } catch (error) {
    console.log("catch", error);
    Toast.fail(error.message);
    // 错误信息收集 发送到服务器
  }
}
