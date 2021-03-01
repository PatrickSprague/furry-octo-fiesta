import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import * as messaging from "messaging";
import { HeartRateSensor } from "heart-rate";
import { me as appbit } from "appbit";
import { display } from "display";

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const timeLabel = document.getElementById("timeLabel");
const dateLabel = document.getElementById("dateLabel");
const hrLabel = document.getElementById("hrLabel");

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  let date = util.zeroPad(today.getDate());
  
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOT", "DEC"]
  let monthName = months[today.getMonth()];
  
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let dayName = days[today.getDay()];

  timeLabel.text = `${hours}:${mins}`;
  dateLabel.text = `${dayName}, ${monthName} ${date}`;

  if (HeartRateSensor && appbit.permissions.granted("access_heart_rate")) {
    const hrm = new HeartRateSensor();
    hrm.addEventListener("reading", () => {
      //Update heart rate here.
      hrLabel.text = "\u2665 " + `${hrm.heartRate}`;
    });
    display.addEventListener("change", () => {
      // Automatically stop the sensor when the screen is off to conserve battery
      if (display.on) {
        hrm.start();
        console.log("hrm started");
      }
      else {
        hrm.stop();
        console.log("hrm stopped");
      }
    });

    hrm.start();
    console.log("hrm started");
  }
}

messaging.peerSocket.addEventListener("message", (evt) => {
  if (evt && evt.data && evt.data.key === "timeColor") {
    timeLabel.style.fill = evt.data.value;
  } else if (evt && evt.data && evt.data.key === "dateColor") {
    dateLabel.style.fill = evt.data.value;
  } else if (evt && evt.data && evt.data.key === "hrColor") {
    hrLabel.style.fill = evt.data.value;
  }
});