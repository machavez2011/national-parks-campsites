import axiosInstance from "../config/axios.config";

const baseUrl = "http://localhost:8080/api/campsites/";

export function readAll() {
  const config = {
    method: "GET"
  };

  return axiosInstance(baseUrl, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

export function create(newCampsite) {
  const config = {
    method: "POST",
    data: newCampsite
  };

  return axiosInstance(baseUrl, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

export function update(updatedCampsite) {
  const config = {
    method: "PUT",
    data: updatedCampsite
  };

  return axiosInstance(baseUrl + updatedCampsite._id, config)
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
