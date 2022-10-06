import React from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Datepicker, setOptions } from "@mobiscroll/react";

function test() {
  setOptions({
    theme: "ios",
    themeVariant: "light",
  });
  return (
    <div className="w-1/2">
      <Datepicker
        controls={["calendar", "time"]}
        display="inline"
        timeFormat="HH:ii:ss"
        selectMultiple={false}
        valid={[
          {
            // Time range with recurrence
            start: "16:00",
            end: "23:00",
            recurring: { repeat: "weekly", weekDays: "MO,TU,WE,TH,FR" },
          },
        ]}
        invalid={[
          {
            // Disable weekends
            recurring: {
              repeat: "weekly",
              weekDays: "SA,SU",
            },
          },
        ]}
      />
    </div>
  );
}

export default test;
