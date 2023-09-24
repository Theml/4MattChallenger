import { Chart } from "react-google-charts";

const options = {
    title: "Teste",
    hAxis: {title: "Month"},
    vAxis: {},
    chartArea: {}
}

export function MainChart() {
    return(
        <Chart
            chartType="ScatterChart"
            data={[["Age", "Weight"], [4, 5.5], [8, 12]]}
            width="100%"
            height="400px"
            legendToggle
            options={options}
        />
    )
}