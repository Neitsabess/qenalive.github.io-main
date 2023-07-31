import { Chart as ChartJS} from "chart.js/auto"
import { Pie } from "react-chartjs-2"
import { Center, border } from "@chakra-ui/react";

export function GradeChart() {
    
    const Data = {
        datasets: [
            {
               label: "Percentages",
               data: [20,80],
               backgroundColor: ["white", 'green'],
               
            }
        ],
        borderColor: "black",
        borderWidth: 4,
    }

    const Options = {
        responsive:true,
        plugins: {
            legend: {
                display: false,
            },
            
            
          },
    }


    return (
        <div>
            <Pie data={Data} options={Options}/>
            <Center>
                <h2>90% Attendence</h2>
            </Center>
        </div>
    )
}