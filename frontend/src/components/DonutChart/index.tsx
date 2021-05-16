import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { SaleSum } from 'types/sale';
import { BASE_URL } from 'Utils/requests';

type chartData = {

    labels: string[];
    series: number[];

}

const DonutChart = () => {

    const [chartData, setchartData] = useState<chartData>({ labels: [], series: [] });

    useEffect(() => {

        axios.get(`${BASE_URL}/sales/amount-by-saller`)
            .then(response => {


                const data = response.data as SaleSum[];
                const myLabels = data.map(x => x.sellerName);
                const mySeries = data.map(x => x.sum);

                setchartData({ labels: myLabels, series: mySeries })
            });

    }, []);




    const options = {
        legend: {
            show: true
        }
    }


    return (
        <Chart
            options={{ ...options, labels: chartData.labels }}
            series={chartData.series}
            type="donut"
            height="240"
        />
    );
}

export default DonutChart;