function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

await function getCalendar() {
  let login = getCookie("csrfp_login");
  let token = getCookie("csrfp_token");

  let cal = await fetch(`${URL}/api/wfm/main/v2/calendar-filter`, {
    "credentials": "include",
    "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.5",
        "Content-Type": "application/vnd.api+json",
        "Crnk-Compact": "true",
        "X-CSRF-Login": login,
        "X-CSRF-Header": header,
        "Sec-GPC": "1",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache"
    },
    "referrer": `${URL}/wfo/ui/`,
    "body": json.dumps({
      "data": {
        "attributes": {
          "calendarFilterCriteria": {
            "extendedResourceAttributes": [],
            "limit": 50,
            "offset": 0,
            "resourcePluginIds": [
              "actualScheduleSummary",
              "adherenceSummary",
              "draftSchedule",
              "extendedWorkResourceDetails",
              "publishedSchedule",
              "secondaryTimeRecordSummary",
              "workResourceDetails"
            ],
            "sortCriteria": {
              "ascending": true,
              "focusedViewDateAscending": true,
              "pluginId": "draftSchedule",
              "strategyId": "ShiftStartTime"
            },
            "summaryIntervals": [
              "2024-03-17T13:00:00.000Z",
              "2024-03-18T13:00:00.000Z",
              "2024-03-19T13:00:00.000Z",
              "2024-03-20T13:00:00.000Z",
              "2024-03-21T13:00:00.000Z",
              "2024-03-22T13:00:00.000Z",
              "2024-03-23T13:00:00.000Z",
              "2024-03-24T13:00:00.000Z"
            ],
            "viewEndDate": "2024-03-24T13:00:00.000Z",
            "viewStartDate": "2024-03-17T13:00:00.000Z",
            "workResourceWorkspaceCriteria": {
              "employeeFilterName": "DEFAULT_ALL",
              "endTime": "2024-03-24T13:00:00.000Z",
              "schedulingPeriodId": "4052",
              "startTime": "2024-03-17T13:00:00.000Z",
              "useAllEmployees": true,
              "useAllPhantoms": false,
              "useAllPoolers": false,
              "workResourceIds": []
            }
          }
        },
        "type": "v2/calendar-filter"
      }
    })
    "method": "POST",
    "mode": "cors"
  });

  return await cal.json();
}

(async (url) => {
  console.log(await getCalendar(url))
})()
