import { Timestamp } from "mongodb";

type ParaObject = {
  value: string;
  funcs: Function[];
  parentNode: HTMLElement;
  controlNode: HTMLElement[];
};

const isRequired = (value: string) => {
  //nếu là một chuỗi rỗng thì sẽ thông báo
  //còn không thì sẽ return một chuỗi rỗng
  return value == "" ? "That field is required" : "";
};

const min = (num: number) => (value: string) =>
  value.length >= num ? "" : `Min is ${num}`;
const max = (num: number) => (value: string) =>
  value.length <= num ? "" : `Max is ${num}`;

const isSame =
  (paramValue: string, fieldName1: string, fieldName2: string) =>
  (value: string) =>
    paramValue == value ? "" : `${fieldName1} not match ${fieldName2}`;

//!hàm tạo ra thông báo lỗi, hiển thị lên màn hình
const createMsg = (
  parentNode: HTMLElement,
  controlNode: HTMLElement[],
  msg: string
) => {
  const invalidDiv = document.createElement("div");
  invalidDiv.className = "invalid-feedback";
  invalidDiv.innerHTML = msg;
  parentNode.appendChild(invalidDiv);
  controlNode.forEach((inputNode) => {
    inputNode.classList.add("is-invalid");
  });
};

//!viết một hàm nhận vào para object có dạng {value, funcs, parentNode, controlNodes}
const isValid = (paraObject: ParaObject) => {
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

function isValidParentNode(parentNode: HTMLElement | null): boolean {
  return parentNode !== null;
}

const dataFromForm = document.querySelector("form")!;

dataFromForm.addEventListener("submit", (event) => {
  // !chặn sự kiện load trang của form
  event.preventDefault();

  clearMsg();

  const usernameNode = document.querySelector<HTMLInputElement>("#username")!;
  const passwordNode = document.querySelector<HTMLInputElement>("#password")!;
  const confirmedpasswordNode =
    document.querySelector<HTMLInputElement>("#confirmedPassword")!;

  const errorMsg = [
    //!username
    isValid({
      value: usernameNode.value,
      funcs: [isRequired],
      parentNode: usernameNode.parentElement!,
      controlNode: [usernameNode],
    }),
    isValid({
      value: passwordNode.value,
      funcs: [isRequired, min(8), max(30)],
      parentNode: passwordNode.parentElement!,
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
      parentNode: confirmedpasswordNode.parentElement!,
      controlNode: [confirmedpasswordNode],
    }),
  ];

  const isValidForm = errorMsg.every((item) => !item);

  if (isValidForm) {
    clearMsg();
    console.log(
      `Username: ${usernameNode.value}\nPassword: ${passwordNode.value}\nConfirmed Password: ${confirmedpasswordNode.value}`
    );
    alert("Form is valid");
  }
});
