import { useEffect, useState } from 'react';
import { MuiPickersUtilsProvider,TimePicker } from '@material-ui/pickers';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Table from './Table'
import Grid from '@material-ui/core/Grid';
import fr from 'dayjs/locale/fr';
import Radio from '@material-ui/core/Radio';


import DayjsUtils from '@date-io/dayjs';

import './App.css';
import { formatAMPM,dateDiff} from './utils'

function App() {
  const [nbSa, setNbSa] = useState();
  const [nbRoutes, setNbRoutes] = useState(null);
  const [dateBegin, setDateBegin] = useState();
  const [dateEnd, setDateEnd] = useState();
  const [nbMinute, setNbMinute] = useState(null);

  const [selectedValue, setSelectedValue] = useState('time');
  const handleChange = (event) => {
    if (event.target.value === "sa") {
      console.log("on change la dateeeeeee")
      setDateEnd(null)
    }
    if (event.target.value === "time") {
      setDateEnd(new Date())
    }
    setNbRoutes(null)
    setSelectedValue(event.target.value);
  };
  
  useEffect(() => {
    console.log("ln change la date",dateBegin,dateEnd)
    if (!dateBegin || !dateEnd) {
      return null
    }
      const diff = dateDiff(dateBegin, dateEnd);
      const min = diff.min + diff.hour * 60
    setNbMinute(min)
    console.log("ln change la date", min)
    
  },[dateBegin,dateEnd])
  const getBySa = () => {
    if ( !nbSa  || !nbRoutes) {
      return <p>veuillez renseigner tout les champs</p>
    }

    
    const minDonePerRoute = nbSa * 15;
    const routesMin = nbRoutes * 15/minDonePerRoute*15;

    const date = new Date(dateBegin);
    date.setMinutes(date.getMinutes() + routesMin);
    
    //setDateEnd(date)
    const formatted_date = formatAMPM(date);
    const nbPerSa = Math.round(nbSa / 4);
    let nbPicker = 0;
    let nbStager = 0;
    let rest = nbSa;

    for (let i = 0; i < nbPerSa; i++) {

      nbPicker = nbPicker + 3;
      nbStager = nbStager + 1;
      rest = rest - 4;
      console.log("rest", rest, nbPicker,nbStager )

    }
    
    nbPicker= nbPicker + rest;
    return <div><h3>Avec <span style={{color:'red'}}>{nbSa} SA</span> soit {nbPicker} pickers et {nbStager} stagers  pour faire {nbRoutes} routes</h3>
    <p>Vous finirez le boulot à {formatted_date} </p>
    </div>


  }
  const getByTime = () => {
    if (!dateBegin ||!dateEnd || !nbRoutes) {
      return <p>veuillez renseigner tout les champs</p>
    }
    
    const pers = Math.ceil(15 * nbRoutes / nbMinute)
    const numberPicker = pers === Infinity ? 1 : pers
    const numberStager = Math.ceil(numberPicker / 3);
    const numberSa = numberPicker + numberStager; 
    return <div> 
       <h3>Il vous faut {numberPicker} pickers et {numberStager} stagers soit <span style={{color:'red'}}>{numberSa} SA </span> pour faire les tâches dans le temps impartis  </h3>
      <h4>vous avez {nbMinute} min pour faire {nbRoutes} routes</h4>
    </div>


  }

  console.log("on re render", nbRoutes)
  return (
    <MuiPickersUtilsProvider utils={DayjsUtils} locale={fr}>

    <div className="App">
      <div className="App-header">
          <Grid container direction='row'   justify="center"
 spacing={2} >
            <Grid xs={12}>
            <img src="https://www.jedecore.com/gif/internet/amazon.gif" alt="oklm"  className="App-logo" width="250" height="150" frameBorder="0" class="giphy-embed" allowFullScreen></img><p><a href="https://giphy.com/gifs/search-ad-spam-OMq5l7Qlrc0QU"></a></p>      
            </Grid>
            <Grid item  xs={3} >

            <FormControlLabel
          value="top"
              control={
                <Radio color="primary"
                  checked={selectedValue === 'time'}
                   onChange={handleChange}
                   value="time" />}
          label="Période de temps"
          labelPlacement="top"
              />
                    </Grid>
                    <Grid item xs={3} >

            <FormControlLabel
          value="top"
              control={
                <Radio color="primary"
                  checked={selectedValue === 'sa'}
                   onChange={handleChange}
                   value="sa" />}
          label="Nombre de sa"
          labelPlacement="top"
              />
              </Grid>
              <Grid item xs={12} />

            <Grid item xs={3} >
            <h4>heure de début</h4>
        <TimePicker value={dateBegin} onChange={setDateBegin} />
              </Grid>

            {selectedValue==="time" && <Grid item xs={3}>
              <h4>heure de fin</h4>
              <TimePicker value={dateEnd} onChange={setDateEnd} />
            </Grid>
            }
                          <Grid item xs={12} />

            {selectedValue === "sa" &&
              <Grid item xs={3}>
                <FormControl variant="outlined">
          
                  <InputLabel htmlFor="component-outlined">SA</InputLabel>
                  <OutlinedInput type="number" label="SA" id="outlined-name" variant="outlined" placeholder="nombre de SA" value={nbSa} onChange={(event) => setNbSa(event.target.value)} />
                </FormControl>
              </Grid>
            }
              <Grid item xs={3}>
            <FormControl variant="outlined">
          <InputLabel htmlFor="component-outlined">routes</InputLabel>
        <OutlinedInput type="number"   label="routes" variant="outlined" placeholder="nombre de routes" value={nbRoutes} onChange={(event) => setNbRoutes( event.target.value )} />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={12}>
              { selectedValue === "sa" ?getBySa():getByTime()}
            </Grid>
  
            
              </Grid>
      </div>
      </div>
      </MuiPickersUtilsProvider>
  );
}

export default App;
