import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gameOptionsPath } from "../../login_src/constants/appPaths";
import GenericSelector from "./GenericSelector";
import customizationOptions from "./customizationOptions";
import fetchApi from "../../generalUtils/axios";
import { socketApiBaseUrl } from "../../utils/environmentVars";
import { authAxiosConfig } from "../../constants/axios";

const CustomizeScreen = () => {
  const navigate = useNavigate();
  const [selectedBackground, setSelectedBackground] = useState<string | null>(
    customizationOptions.background[0] || null
  );
  const [selectedLogo, setSelectedLogo] = useState<string | null>(
    customizationOptions.logos[0] || null
  );

  const sendNewCustomizationToServer = async (
    background: string,
    logo: string
  ) => {
    const res = await fetchApi(
      socketApiBaseUrl,
      "customize/set",
      "post",
      authAxiosConfig(),
      { background, logo }
    );
    console.log(res);
  };

  return (
    <div className="customizee-screen">
      <h1>style your environment</h1>
      <div className="selectors-div">
        <GenericSelector
          id="background-selector"
          options={customizationOptions.background.map((background) => ({
            text: background,
            id: background,
          }))}
          label="choose background"
          onChange={setSelectedBackground}
        />
        <GenericSelector
          id="player-logo-selector"
          options={customizationOptions.logos.map((logo) => ({
            text: logo,
            id: logo,
          }))}
          label="choose player logo"
          onChange={setSelectedLogo}
        />
        <div>
          <button
            onClick={() => {
              if (!selectedBackground || !selectedLogo) {
                return;
              }
              sendNewCustomizationToServer(selectedBackground, selectedLogo);
            }}
          >
            set
          </button>
        </div>
      </div>
      <div>
        <button
          className="go-back-button"
          onClick={() => navigate(gameOptionsPath)}
        >
          go back
        </button>
      </div>
    </div>
  );
};

export default CustomizeScreen;
