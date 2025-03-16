import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const button = document.querySelector("[data-start]");
const dayTimer = document.querySelector("[data-days]");
const hoursTimer = document.querySelector("[data-hours]");
const minutesTimer = document.querySelector("[data-minutes]");
const secondsTimer = document.querySelector("[data-seconds]");

let userSelectedDate;
button.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      iziToast.show({
        title: "Error",
        message: "Please choose a date in the future",
        position: "topRight",
        color: "red"
      });
      button.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      button.disabled = false;
    }
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function start() {
  button.disabled = true; 
  const intervalID = setInterval(() => {
    const timeNow = Date.now();
    const timeDifference = userSelectedDate.getTime() - timeNow;

    if (timeDifference <= 0) {
      clearInterval(intervalID);
      timeChange(0, 0, 0, 0);
    } else {
      const timeSet = convertMs(timeDifference);
      timeChange(timeSet.days, timeSet.hours, timeSet.minutes, timeSet.seconds);
    }
  }, 1000);
}

function timeChange(days, hours, minutes, seconds) {
  dayTimer.textContent = addLeadingZero(days);
  hoursTimer.textContent = addLeadingZero(hours);
  minutesTimer.textContent = addLeadingZero(minutes);
  secondsTimer.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

button.addEventListener("click", start);
flatpickr("#datetime-picker", options);
