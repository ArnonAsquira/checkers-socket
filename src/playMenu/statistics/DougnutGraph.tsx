import { FC } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Legend, Title, Tooltip, ChartData } from "chart.js";
// import * as chart from "chart.js"
Chart.register(ArcElement);
Chart.register(Legend);
Chart.register(Title);
Chart.register(Tooltip);

interface IDougnutGraphProps {
  data: ChartData<"doughnut", number[], unknown>;
}

const DougnutGraph: FC<IDougnutGraphProps> = ({ data }) => {
  return (
    <div className="stats-graph">
      <Doughnut data={data} options={{ color: "white" }} />
    </div>
  );
};

export default DougnutGraph;
