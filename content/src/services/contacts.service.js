import axiosInstance from "../config/axios.config";

//const baseUrl = `${process.env.REACT_APP_BASEPATH}`;
const baseUrl = "http://localhost:8080/";

export function readAll() {
  const config = {
    method: "GET"
  };

  return axiosInstance(baseUrl, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

export function create(newContact) {
  const config = {
    method: "POST",
    data: newContact
  };

  return axiosInstance(baseUrl, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

export function update(updatedContact) {
  const config = {
    method: "PUT",
    data: updatedContact
  };

  return axiosInstance(baseUrl + updatedContact._id, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

export function del(id) {
  const config = {
    method: "DELETE"
  };

  return axiosInstance(baseUrl + id, config)
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
