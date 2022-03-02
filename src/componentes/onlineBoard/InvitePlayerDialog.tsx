import { Fragment, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { authAxiosConfig } from "../../constants/axios";
import fetchApi from "../../generalUtils/axios";
import { MainStore } from "../../redux/mainStore";
import { socketApiBaseUrl } from "../../utils/environmentVars";

const InvitePlayerDialog = () => {
  const [open, setOpen] = useState<boolean>(false);
  const socketSlice = useSelector((state: MainStore) => state.socket);
  const gameToken = socketSlice.gameToken;

  const inviteEmailRef = useRef<HTMLInputElement>(null);

  const sendInvitation = async (userEmail: string) => {
    if (!gameToken) {
      return;
    }
    const invitationRes = await fetchApi(
      socketApiBaseUrl,
      "game/invite",
      "post",
      authAxiosConfig(),
      { gameToken, userEmail }
    );
    console.log(invitationRes.data);
    // Swal.fire(invitationRes.data);
  };

  return (
    <Fragment>
      <button
        style={{ position: "absolute", top: "25%", right: 0 }}
        onClick={() => setOpen(!open)}
      >
        invite player
      </button>
      <dialog open={open} style={{ position: "fixed", zIndex: 100 }}>
        <label htmlFor="invite-user-email"></label>
        <input
          type="text"
          name=""
          id="invite-user-email"
          ref={inviteEmailRef}
        />
        <button
          onClick={() => {
            if (!inviteEmailRef.current) {
              return;
            }
            sendInvitation(inviteEmailRef.current.value);
          }}
        >
          send invitation
        </button>
      </dialog>
    </Fragment>
  );
};

export default InvitePlayerDialog;
