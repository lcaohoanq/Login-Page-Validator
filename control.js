// !rules validate(những yêu cầu để công nhận dữ liệu được validate)
//* username         : isRequired
//* passwork         : isRequired, min 8, max 30
//* confirmedPasswork: isRequired, min 8, max 30, isSame(password)

const isRequired = (value) => {
  //nếu là một chuỗi rỗng thì sẽ thông báo
  //còn không thì sẽ return một chuỗi rỗng
  return value == "" ? "That field is required" : "";
};

const min = (num) => (value) => value.length >= num ? "" : `Min is ${num}`;
const max = (num) => (value) => value.length <= num ? "" : `Max is ${num}`;

//! paramValue: giá trị ô password
//! value     : giá trị ô confirmedPassword
// const isSame = (paramValue, fieldName1, fieldName2) => (value) => {
//   return paramValue == value ? "" : `${fieldName1} not match ${fieldName2}`;
// };

//*khi return một dòng thì ta có thể làm như vầy
const isSame = (paramValue, fieldName1, fieldName2) => (value) =>
  paramValue == value ? "" : `${fieldName1} not match ${fieldName2}`;

//!hàm tạo ra thông báo lỗi, hiển thị lên màn hình
const createMsg = (parentNode, controlNode, msg) => {
  const invalidDiv = document.createElement("div");
  invalidDiv.className = "invalid-feedback";
  invalidDiv.innerHTML = msg;
  parentNode.appendChild(invalidDiv);
  controlNode.forEach((inputNode) => {
    inputNode.classList.add("is-invalid");
  });
};

//!viết một hàm nhận vào para object có dạng {value, funcs, parentNode, controlNodes}
const isValid = (paraObject) => {
  let { value, funcs, parentNode, controlNode } = paraObject;

  //duyệt mảng funcs
  for (const funcCheck of funcs) {
    let msg = funcCheck(value);
    if (msg !== "") {
      createMsg(parentNode, controlNode, msg);
      return msg;
    }
  }

  return "";
};

//! hàm xoá hết các thông báo lỗi trên UI
const clearMsg = () => {
  document.querySelectorAll(".is-invalid").forEach((inputItem) => {
    inputItem.classList.remove("is-invalid");
  });

  document.querySelectorAll(".invalid-feedback").forEach((divMsg) => {
    divMsg.remove();
  });
};

document.querySelector("form").addEventListener("submit", (event) => {
  // !chặn sự kiện load trang của form
  event.preventDefault();

  clearMsg();

  let usernameNode = document.querySelector("#username");
  let passwordNode = document.querySelector("#password");
  let confirmedpasswordNode = document.querySelector("#confirmedPassword");

  const errorMsg = [
    //!username
    isValid({
      value: usernameNode.value,
      funcs: [isRequired],
      parentNode: usernameNode.parentElement,
      controlNode: [usernameNode],
    }),
    isValid({
      value: passwordNode.value,
      funcs: [isRequired, min(8), max(30)],
      parentNode: passwordNode.parentElement,
      controlNode: [passwordNode],
    }),
    isValid({
      value: confirmedpasswordNode.value,
      funcs: [
        isRequired,
        min(8),
        max(30),
        isSame(passwordNode.value, "password", "confirmed-password"),
      ],
      parentNode: confirmedpasswordNode.parentElement,
      controlNode: [confirmedpasswordNode],
    }),
  ];

  const isValidForm = errorMsg.every((item) => !item);

  if (isValidForm) {
    clearMsg();
    alert("Form is valid");
  }
});
