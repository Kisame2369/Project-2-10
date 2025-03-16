import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault(); 

    const delay = parseInt(event.target.delay.value);
    const state = event.target.state.value;

    const makePromise = ({ state, delay }) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (state === "fulfilled") {
                    resolve(state);
                } else {
                    reject(state);
                }
            }, delay);
        });
    };

    makePromise({ state, delay })
        .then(() => iziToast.success({
                title: '✅',
                message: `Fulfilled promise in ${delay}ms`,
                position: "topRight",
            }))  
        .catch(() => iziToast.error({
                title: '❌',
                message: `Rejected promise in ${delay}ms`,
                position: "topRight",
            })); 
});
