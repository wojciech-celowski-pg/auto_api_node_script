const fetch = require("node-fetch");

const ids = [2532, 2531, 2529, 2522, 2523];
const columns = ["P_ID", "P_IDS", "SEAT_ID", "SELLER_ID", "SITE_ID"];
const body = {
    "agentId":4,
    "resourceId":null, // null !
    "sensorDefinitionId":391,
    "displayName":"unique_elements_amount_change_in_7_days_programmatic dbce-c360-119lake-prod-36f0.r_ssp_openx.bid_event.", // leave dot ! w/ column name
    "sensorResultName":"value",
    "changeTimeWindowDaily":"3",
    "changeTimeWindowAdHoc":"10",
    "enableWeightDistribution":true,
    "enabled":true,
    "enableAlerts":true,
    "scheduleId":2,
    "dqRuleDefinitionId":32,
    "deployedSensorAttr1Name":"qtr_data_feed_name",
    "deployedSensorAttr2Name":"vendor",
    "deployedSensorAttr2Value":"openx",
    "deployedSensorAttr3Name":"date_column",
    "deployedSensorAttr3Value":"file_date",
    "deployedSensorAttr4Name":"param1",
    "deployedSensorAttr5Name":"param2",
    "deployedSensorAttr6Name":"param3",
    "externalSensorKey":"unique_elements_amount_change_in_7_days_programmatic",
    "resourceKey":"dbce-c360-119lake-prod-36f0.r_ssp_openx.bid_event." // leave dot ! w/ column name
};
const url = 'https://aifordq.pg.com/api/deployedSensors';
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJFQzUyMDEiLCJuYW1lIjoiV29qY2llY2ggQ2Vsb3dza2kiLCJlbWFpbCI6ImNlbG93c2tpLndjQHBnLmNvbSIsImlhdCI6MTYxODM5ODgyMCwiZXhwIjoxNjE4NDAyNDIwfQ.NmkxXIlqrXlOncWZJXNIso3e7pQ4_bSAWKiplddHD2U';
const config = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        authorization: token
    },
    body: null
}

const post = async (configuration) => {
    let response = null;
    try {
        response = await fetch(url, configuration);
        if (response.status != 201) {
            console.log(response);
            throw new Error(response);
        }
    } catch (e) {
        console.error(e);
    }
    console.log(response.status);
}

const getParsedBody = (id, column) => {
    const parsedBody = {};
    Object.assign(parsedBody, body);
    parsedBody["resourceId"] = id;
    parsedBody["displayName"] = parsedBody["displayName"] + column;
    parsedBody["resourceKey"] = parsedBody["resourceKey"] + column;
    return parsedBody;
}

const getParsedConfig = (parsedBody) => {
    const parsedConfig = config;
    Object.assign(parsedConfig, config);
    config.body = JSON.stringify(parsedBody);
    return parsedConfig;
}

const init = () => {
    ids.forEach(async (id, index) => {
        const config = getParsedConfig(getParsedBody(id, columns[index]));
        await post(config);
    })
}

const init_test = () => {
    ids.forEach((id, index) => {
        console.log(
            getParsedConfig(
                getParsedBody(id, columns[index])
                )
            );
    })
}


init();