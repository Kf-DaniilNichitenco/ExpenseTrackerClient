import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useSessionStorage from "../../CustomHooks/StorageHooks/useSessionStorage";
import ExpensesLineDiagram from "./Generic/ExpensesLineDiargam";
import ExpensesForYearDefault from '../../Data/Models/Expenses/default/ExpensesForYearDefault';
import ExpenseService from "../../Services/expense.service/ExpenseService";


const randomColor = require('random-color');

interface ExpensesPerMonthLineDiagramProps
  {
    paddingLeft?: number,
    paddingRight?: number,
    paddingBottom?: number,
    paddingTop?: number,
    width?: number,
  }
  

  const ExpensesPerMonthLineDiagram:React.FC<ExpensesPerMonthLineDiagramProps> = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [expensesForYearData, setExpensesForYearData, 
      removeExpensesForYearData] = useSessionStorage("expensesForYearData", ExpensesForYearDefault)

    useEffect(() => {
      if(expensesForYearData == ExpensesForYearDefault)
      {
        ExpenseService.GetExpensesForCurrentYear()
          .then(response => {
            setExpensesForYearData(response);
            setIsLoading(false);
          })
          .catch(error => {
            console.log(error);
          })
      }
      setIsLoading(false);

    }, []);

    const getData = () => {
      let datasets:any[] = [];
      console.log(expensesForYearData);
      for (const expense of expensesForYearData) {
        let color = randomColor(0.99, 0.99);

        let expenses: number[] = [];
        expense.expenses.forEach(exp => {
          expenses.push(exp.money);
        });
        

        datasets.push(
          {
            label: expense.currencyCode.toUpperCase(),
            data: expenses,
            lineTension: 0.1,
            fill: false,
            backgroundColor: color.rgbString(),
            borderColor: color.rgbString(),
            pointBorderColor: color.rgbString(),
            pointBackgroundColor: '#fff',
            pointBorderWidth: 2,
            pointHoverRadius: 9,
            pointHoverBackgroundColor: color.rgbString(),
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
            }
        )
      }

      const data = {
        labels: [
          'January', 'February', 'March',
          'April', 'May', 'June',
          'July', 'August', 'September', 'October',
          'November', 'December'
                ],
        datasets: datasets
      }

      return data;
    }

    if(isLoading)
    {
      return (<CircularProgress color="secondary" />);
    }

    return(
        <ExpensesLineDiagram 
        data={getData()}
        title="Expenses for current year"
        />
    );
  }

  export default ExpensesPerMonthLineDiagram;