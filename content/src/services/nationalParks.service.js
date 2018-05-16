import axiosInstance from "../config/axios.config";

const baseUrl = "http://localhost:8080/api/national-parks/";

export function readAll() {
  const config = {
    method: "GET"
  };

  return axiosInstance(baseUrl, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

export function create(newNationalPark) {
  const config = {
    method: "POST",
    data: newNationalPark
  };

  return axiosInstance(baseUrl, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

export function update(updatedNationalPark) {
  const config = {
    method: "PUT",
    data: updatedNationalPark
  };

  return axiosInstance(baseUrl + updatedNationalPark._id, config)
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
