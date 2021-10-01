/* Global Variables */
const APIKey = "&appid=f910910c263be5380725745548c22586&units=metric";
const ServerURL = "http://localhost:5000";
const APIURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

document.getElementById("generate").addEventListener("click", generate);

function generate() {
  // add currnet date and feelings to the Most Recent Entry
  let day = new Date();
  let mostRecentEntry = {};
  mostRecentEntry.date =
    day.getMonth() + 1 + "/" + day.getDate() + "/" + day.getFullYear();
  mostRecentEntry.feelings = document.getElementById("feelings").value;

  //call fetch on the Open Weather Map api to find the temp of a city by zip code
  findByCityZipCode(document.getElementById("zip").value)
    .then((data) => {
      // check if Data is found and correct
      if (data.cod != 200) return alert("Error :", data.message);
      else mostRecentEntry.temp = data.main.temp;
      // post data to server
      postData(mostRecentEntry);

      // update the html view
      updateUI();
    })
    .catch((error) => console.log(error));
}

// post data to server
const postData = async function (data) {
  let response = await fetch(`${ServerURL}/postData`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

const findByCityZipCode = async function (cityZipCode) {
  return await (await fetch(APIURL + cityZipCode + APIKey)).json();
};

const updateUI = async function () {
  // fetch data from server
  await (
    await fetch(`${ServerURL}/getdata`)
  )
    .json()
    // update the html view
    .then((data) => {
      document.getElementById("date").innerHTML = `Date is: ${data.date}`;
      document.getElementById(
        "temp"
      ).innerHTML = `Temperature is: ${data.temp}°C`;
      document.getElementById(
        "feeling"
      ).innerHTML = `feeling: ${data.feelings}`;
    })
    .catch((error) => console.log(error));
};
