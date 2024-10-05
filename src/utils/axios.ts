import ax from "axios";

const axiosGlobal = ax.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosGlobal;
