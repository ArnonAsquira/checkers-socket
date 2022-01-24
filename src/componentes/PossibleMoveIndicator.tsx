import { Location } from "../types/boardTypes";

interface PMIProps {
  location: Location;
  handleClick: any;
}

const PossibleMoveIndicator = ({ location, handleClick }: PMIProps) => {
  return (
    <div
      id={`${location[0]}-${location[1]}`}
      className="indicator"
      onClick={() => handleClick(location)}
    ></div>
  );
};

export default PossibleMoveIndicator;
