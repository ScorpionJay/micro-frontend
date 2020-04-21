/**
 * @author Jay
 * @date 2020-01-01
 * @description
 */
import Request from "Utils/request";
import API from "Utils/api";
import { Session as Storage } from "Utils/storage";
export const MENUS = "MENUS";
export const menuAction = () => async (dispatch) => {
  let response = await Request({
    url: API.menu
  });

  if (response.state) {
    dispatch({ type: MENUS, data: response.data });
    Storage.set("menus", response.data);
  }
};
