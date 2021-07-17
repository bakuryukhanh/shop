const FormData = require("form-data");
const fs = require("fs");
const fetch = require("node-fetch");
console.log(process.env.IMAGE_SERVER_URL);
const uploadImg = async (path) => {
  var formdata = new FormData();
  formdata.append("image", fs.createReadStream(path));
  formdata.append("key", "b9531146d5edb5db74a3e26f881c47e8");
  let response = await fetch(process.env.IMAGE_SERVER_URL, {
    method: "POST",
    body: formdata,
  });
  response = await response.json();
  const url = response.data.display_url;
  return url;
};
module.exports = { uploadImg };
