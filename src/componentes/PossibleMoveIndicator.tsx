import { Location } from "../types/boardTypes";

interface PMIProps {
  location: Location;
  handleClick: any;
  // playerColor: "red" | "blue";
}

const PossibleMoveIndicator = ({
  location,
  handleClick,
}: // playerColor,
PMIProps) => {
  return (
    <div className="indicator" onClick={() => handleClick(location)}></div>
  );
};

export default PossibleMoveIndicator;
