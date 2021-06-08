let url = "";
if (process.env.NODE_ENV === "development") {
  url = "http://localhost:8000/api/";
}

if (process.env.NODE_ENV === "production") {
  url = "https://covid-assistance.herokuapp.com/api/";
}
export default url;
