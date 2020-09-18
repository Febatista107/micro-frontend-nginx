import React, { useEffect, useState } from "react";
import useInterval from "./useInterval";
import "./App.css";
import "@material/mwc-top-app-bar-fixed";
import "@material/mwc-list/mwc-list";
import "@material/mwc-list/mwc-list-item";
import "@material/mwc-textfield";
import "@material/mwc-fab";
import "@material/mwc-button";
import "@material/mwc-icon";

function App() {
  const [timer, setTimer] = useState(0);
  const [sessionTime, setSessionTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [isSessionTime, setIsSessionTime] = useState(true);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const maxTime = (isSessionTime ? sessionTime : breakTime) * 60;
    const message = isSessionTime ? "Session" : "Break";

    if (timer >= maxTime) {
      stop();
      alert(`${message} finished!`);
    }
  }, [timer]);

  useInterval(
    () => {
      setTimer(timer + 1);
    },
    1000,
    started
  );

  function display(timer) {
    const minutes = parseInt(timer / 60);
    const seconds = timer - minutes * 60;
    return `${zeroOnLeft(minutes)}:${zeroOnLeft(seconds)}`;

    function zeroOnLeft(n) {
      return n.toString().padStart(2, "0");
    }
  }

  function startSession() {
    setIsSessionTime(true);
    start();
  }

  function startBreak() {
    setIsSessionTime(false);
    start();
  }

  function start() {
    setTimer(0);
    setStarted(true);
  }

  function stop() {
    setStarted(false);
  }

  function handleSessionTimeChange(event) {
    setSessionTime(event.target.value);
  }

  function handleBreakTimeChange(event) {
    setBreakTime(event.target.value);
  }

  return (
    <mwc-top-app-bar-fixed>
      <div slot="title">Pomodoro timer</div>
      <div id="content">
        <section>
          <mwc-textfield label="Timer" value={display(timer)} outlined />
          <mwc-button label="Stop" raised onClick={stop} />
        </section>
        <section>
          <mwc-textfield
            label="Session time"
            value={sessionTime}
            onInput={handleSessionTimeChange}
            outlined
          />
          <mwc-button label="Start session" raised onClick={startSession} />
        </section>
        <section>
          <mwc-textfield
            label="Break time"
            value={breakTime}
            onChange={handleBreakTimeChange}
            outlined
          />
          <mwc-button label="Start break" raised onClick={startBreak} />
        </section>
      </div>
    </mwc-top-app-bar-fixed>
  );
}

export default App;
