import axiosInstance from "../config/axios.config";

//const baseUrl = `${process.env.REACT_APP_BASEPATH}`;
const baseUrl = "http://localhost:8080";

export function readAll() {
  const config = {
    method: "GET"
  };

  return axiosInstance(baseUrl, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

const responseSuccessHandler = response => {
  return response.data;
};

const responseErrorHandler = error => {
  console.log(error);
  return Promise.reject(error);
};
