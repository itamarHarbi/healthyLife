import axios from "axios";


export const ApiUrl = "http://localhost:3001";
export const KEY_TOKEN = "Healthy-Token"

export const apiGet = async (_url,_header) => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://localhost:3001/" + _url,
      headers: {
        "x-api-key": localStorage[KEY_TOKEN],
        "username":_header
      }
    })
    return res.data;
  }
  catch (err) {
    // reject -> רטרן של טעות
    throw err;
  }
}

export const apiMethod = async (_url, _method, _body = {}) => {
  try {
    const res = await axios({
      method: _method,
      url: _url,
      data: _body,
      headers: {
        "x-api-key": localStorage[KEY_TOKEN]
      }
    })
    return res;
  }
  catch (err) {
    throw(err)
  }
}

export const apiMenus = async (q) => {
  try {
    const url = ApiUrl + "/menus/create/searchItem?q=" + q;
    const result = await axios({
      method: "GET",
      url: url,
      headers: {
        "x-api-key": localStorage[KEY_TOKEN],
      }
    })



    return result.data.result
  }
  catch (err) {
    throw err;
  }
}

export const apiGetMida = async (c) => {
  try {
    const url = `${ApiUrl}/menus/create/measurements?q=${c}`
    const apiRes = await axios.get(url)
    return apiRes.data
  } catch (error) {
    console.log(error);
  }
}

export const MenuTableDataApi = async (_q) => {
  const url = `${ApiUrl}/menus/create/searchByCode?q=${_q}`;
  try {
    const apiData = await axios.get(url);
    return apiData.data
  } catch (error) {
    console.log(error);
  }
}