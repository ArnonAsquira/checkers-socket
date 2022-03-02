import { FC } from "react";

interface IAlertDialogProps {
  title: string;
  content: string;
  type: "err" | "success" | "info";
  close: Function;
}

const AlertDialog: FC<IAlertDialogProps> = ({
  content,
  type,
  close,
  title,
}) => {
  const logoDict = {
    err: (
      <img
        src="https://s2.svgbox.net/materialui.svg?ic=cancel&color=000000"
        width="32"
        height="32"
        alt="err"
      ></img>
    ),
    success: (
      <img
        src="https://s2.svgbox.net/materialui.svg?ic=check_circle&color=000000"
        width="32"
        height="32"
        alt="success"
      ></img>
    ),
    info: (
      <img
        src="https://s2.svgbox.net/octicons.svg?ic=info&color=000"
        width="32"
        height="32"
        alt="info"
      ></img>
    ),
  };
  return (
    <dialog className="custom-alert" open={true}>
      <div>
        <h2>{title}</h2>
        {content}
      </div>
      <span>{logoDict[type]}</span>
      <button onClick={() => close(null)}>cancel</button>
      confirm
    </dialog>
  );
};

export default AlertDialog;
