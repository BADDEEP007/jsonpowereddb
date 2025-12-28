  $("#empId").focus();

  function validateAndGetFormData() {
    var empIdVar = $("#empId").val();
    if (empIdVar === "") {
      alert("Employee ID Required Value");
      $("#empId").focus();
      return "";
    }
    var empNameVar = $("#empName").val();
    if (empNameVar === "") {
      alert("Employee Name is Required Value");
      $("#empName").focus();
      return "";
    }
    var empEmailVar = $("#empEmail").val();
    if (empEmailVar === "") {
      alert("Employee Email is Required Value");
      $("#empEmail").focus();
      return "";
    }
    var jsonStrObj = {
      empId: empIdVar,
      empName: empNameVar,
      empEmail: empEmailVar,
    };
    return JSON.stringify(jsonStrObj);
  }

  // Create PUT request payload
  function createPUTRequest(connToken, jsonObj, dbName, relName) {
    var putRequest = {
      token: connToken,
      dbName: dbName,
      cmd: "PUT",
      rel: relName,
      jsonStr: JSON.parse(jsonObj), // keep as object for Axios
    };
    return putRequest;
  }

  async function executeCommand(reqObj, dbBaseUrl, apiEndPointUrl) {
    var url = dbBaseUrl + apiEndPointUrl;
    try {
      const response = await axios.post(url, reqObj, {
        headers: { "Content-Type": "text/plain" },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return error;
      } else {
        return { error: error };
      }
    }
  }

  function resetForm() {
    $("#empId").val("");
    $("#empName").val("");
    $("#empEmail").val("");
    $("#empId").focus();
  }

  async function saveEmployee() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
      return;
    }
    var putReqObj = createPUTRequest(
      "90934826|-31949264555996741|90957862",
      jsonStr,
      "SAMPLE",
      "EMP-REL"
    );

    console.log(JSON.stringify(putReqObj, null, 2));

    var resultObj = await executeCommand(
      putReqObj,
      "http://api.login2explore.com:5577",
      "/api/iml"
    );

    console.log(resultObj);
    resetForm();
  }
