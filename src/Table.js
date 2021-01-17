import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { formatAMPM} from './utils'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData('10', 159, 6.0),
  createData('20', 237, 9.0),
  createData('30', 262, 16.0),
  createData('40', 305, 3.7),
  createData('50', 356, 16.0),
];


export default function BasicTable({dateBegin, dateEnd, nbRoutes,nbMinute}) {
  const classes = useStyles();
    const [data, setData]= useState([])
    const formatCell = (add) => {
        const date = new Date(dateBegin);
        date.setMinutes(date.getMinutes() + add);
        
        const formatted_date = formatAMPM(date)
        return formatted_date;
    }
    console.log("on re riri")

    useEffect(() => {
        console.log("on re renderaaaa")
        if (!dateBegin || !dateEnd ||!nbRoutes ||!nbMinute  ) {
            return null
        }
        let isDone = false;
        let date1 = new Date(dateBegin);
        let date2 = new Date(dateEnd);
        let tmp = date2 - date1;
        if (tmp < 0) {
      
          date2.setDate(date2.getDate() + 1);
      
        }
        const data = [];
        const routePerInterval = nbRoutes / (nbMinute / 30);
        let i = 1;
        while (!isDone) {
            let tmp = date1 - date2;

            if (tmp >= 0) {
                data.push({ time: formatAMPM(date2), routesToDo:nbRoutes })

                isDone=true
            } else {
                console.log("coucou", formatAMPM(date1))
                const routesToDo = Math.ceil(routePerInterval * i)

                if (routesToDo >= nbRoutes) {
                    data.push({ time: formatAMPM(date2), routesToDo:nbRoutes })
                    isDone = true
                } else {
                    data.push({ time: formatAMPM(date1), routesToDo })
                    date1.setMinutes(date1.getMinutes() + 30);
                }
                i++;
                

            }
        }
        console.log(data)
        setData(data)
    },[dateBegin,dateEnd,nbMinute,nbRoutes])
 
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
                  <TableRow>
        {data.map(({time})=>   <TableCell >{time}</TableCell>
 )}
          </TableRow>
        </TableHead>
        <TableBody>
                  <TableRow key="base">
                  {data.map(({ routesToDo }) => <TableCell >{routesToDo}</TableCell>)}

            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
