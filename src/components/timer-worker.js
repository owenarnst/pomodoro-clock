let intervalID;
self.addEventListener("message", (e) => {
    let { isRunning, seconds, breakMins, sessionMins, isSession } = e.data;
    if (isRunning) {
        intervalID = setInterval(() => {
            self.postMessage({seconds: seconds, isSession: isSession});
            if (seconds === 0) {
                if(isSession) {
                    isSession = false;
                    seconds = breakMins * 60;
                }
                else {
                    isSession = true;
                    seconds = sessionMins * 60;
                }
            }
            else {
                seconds = seconds - 1;
            }
        }, 1000);
    }
    else {
        clearInterval(intervalID);
    }
});
