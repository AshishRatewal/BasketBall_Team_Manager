import { React, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SelectPlayer from "./SelectPlayer";
import { FormControl } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { ContactSupportOutlined } from "@material-ui/icons";
import SelectP from 'react-select';
let primaryKey = 1;
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  // const data of first player
  let defaultObj = {
    id: "",
    fname: "",
    lname: "",
    height: "",
    position: "",
  }; 
  let defaultPlayer = {
    player1: "",
    player2: "",
    player3: "",
    player4: "",
    player5: "",
  };

  let getFieldObj = {
    position1 : "",
    position2 : "",
    position3 : "",
    position4 : "",
    position5 : "",
  }

  let regExpStr = /^[a-zA-Z]*$/;
  let regExpNum = /^[0-9]*$/;
  const [player, setPlayer] = useState(defaultObj);
  const [playerArr, setPlayerArr] = useState([]);
  const [status,setStatus] = useState();
  const [checkPlayer,setCheckPlayer] = useState(defaultPlayer);
  const [error,setError] = useState({});
  // second tab checking validation
  // select players the playes in first round
  const [isSame,setIsSame] = useState(defaultPlayer);
  // select that player field that he/ she wants to play
  const [isField,setIsField] = useState(getFieldObj);
//   show err
  const [err,setErr] = useState("");
  const [dis,setDis] = useState(true);

  const options = [
    { value: 'Point_Guard_(PG)', label: 'Point_Guard_(PG)' },
    { value: 'Shooting_Guard_(SG)', label: 'Shooting_Guard_(SG)' },
    { value: 'Small_Forward_(SF)', label: 'Small_Forward_(SF)' },
    { value: 'Power_Forward_(PF)', label: 'Power_Forward_(PF)' },
    { value: 'Center_(C)', label: 'Center_(C)' },
  ];

  let getPlayerField = (e) => {
    player.position = e;
  }

  // the first function to get value in object
  // onchange fun of all fields  
  const getData = (event) => {
    let {name,value} = event.target;
    
    if(name == "fname"){
      if(regExpStr.test(value)){
        setPlayer((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    }else if(name == "lname"){
      if(regExpStr.test(value)){
        setPlayer((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    }else if(name == "height"){
      if(regExpNum.test(value)){
        if(value>=0){ 
          setPlayer((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        }
      }
    }
  };


  // showErr Function
  let showErr = () => {
    let emptyObj = {};
    if(player.fname == ""){      
      emptyObj.fnameErr = "*Please Enter FirstName";
    }else{
      emptyObj.fnameErr = "";
    } 
    if(player.lname == ""){      
      emptyObj.lnameErr = "*Please Enter LastName";
    }else{
      emptyObj.lnameErr = "";
    }
    if(player.height == "" || player.height < 150 || player.height > 300){      
      emptyObj.heightErr = "*Please Enter Height and it must be in range(150-300)";
    }else{
      emptyObj.heightErr = "";
    }
    if(player.position == ""){            
      emptyObj.positionErr = "*Please Enter Position";
    }else{
      emptyObj.positionErr = "";
    }
    setError(emptyObj);
  }


  // showing data into document
  const getEntry = () => {
    if(playerArr.length <= 5){
      if(player.fname == "" || player.lname == "" || player.height == "" || player.position == "" || player.height > 300 || player.height < 150){
        showErr();
      }else{
        player.id = primaryKey;
        setPlayerArr((oldArray) => [...oldArray, player]);
        setPlayer(defaultObj);
        let playerLength = `${playerArr.length + 1} Player data has been saved`;
        setStatus(playerLength);
        showErr();
        primaryKey++;
        playerArr.length >= 4 ? setDis(false) : setDis(true);
      }
    }else{
      setStatus("You can add only 11 players");
      setPlayer(defaultObj);
    }
  };



  // check player name in first quarter
  let checkFun = (event) => {
    let {name, value} = event.target;
    setCheckPlayer({...checkPlayer, [name]:value});
    // changed 
    setIsSame({...isSame, [name]:value});
  }


  //   get input field data that i want ***********************************
  let getPositionField = (event) => {
    const {value,name} = event.target;
    setIsField({...isField, [name]:value});
  }



  // final save button
  let finalSave = () => {
    let makeArr = [],makeFieldArr = [];
    for(let key in isSame){
      if(isSame[key] == ""){
        makeArr.push(null);
      }else{
        makeArr.push(isSame[key]);
      }
    }   
    var filtered = makeArr.filter(function (el) {
      return el != null;
    });
    let mainArr = [];
    for(let i=0;i<makeArr.length;i++){
      for(let j=0;j<makeArr.length;j++){
        if(i!=j && (makeArr[i]!=null && makeArr[j]!=null)){
          if(makeArr[i] == makeArr[j]){
            mainArr.push(i);
          }
        }
      }
    }

    let unique = [...new Set(mainArr)];

    // next
    for(let key in isField){
      if(isField[key] == ""){
        makeFieldArr.push(null);
      }else{
        makeFieldArr.push(isField[key]);
      }
    }   
    let mainFiledArr = [];
    for(let i=0;i<makeFieldArr.length;i++){
      for(let j=0;j<makeFieldArr.length;j++){
        if(i!=j && (makeFieldArr[i]!=null && makeFieldArr[j]!=null)){
          if(makeFieldArr[i] == makeFieldArr[j]){
              mainFiledArr.push(i);
          }
        }
      }
    }
    let uniqueField = [...new Set(mainFiledArr)];
    // conditions;

    if(unique.length != 0 || err != "" || uniqueField.length != 0){

      let sBox = document.getElementsByClassName("selectPlay");
      for(let i=0;i<sBox.length;i++){
        sBox[i].style.borderBottom = "none";
      }
      for(let i=0;i<unique.length;i++){
        let num = unique[i];
        sBox[num].style.borderBottom = "1px solid red";
      }

      // check is field
      let sBoxField = document.getElementsByClassName("selectField");
      for(let i=0;i<sBoxField.length;i++){
        sBoxField[i].style.borderBottom = "none";
        setErr("");
      }
      for(let i=0;i<uniqueField.length;i++){
        let num1 = uniqueField[i];
        sBoxField[num1].style.borderBottom = "1px solid red";
        setErr("**Player can be selected only once & Filed Should be unique");
      }
    }else if(err == "" && unique.length == 0 && uniqueField.length == 0 && filtered.length == 5){
      alert("Enjoy Your Game");
    }else{
      setErr("Please Select all the field");
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Compose Team" {...a11yProps(0)} />
          <Tab 
            label="First Quarter" 
            {...a11yProps(1)} 
            disabled={dis}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {/* first tab */}
        <form className={classes.root} noValidate autoComplete="off">
          <div className="row">
            <div className="col-md-6">
              <TextField
                value={player.fname}
                id="standard-basic"
                name="fname"
                label="First Name"
                className="w-100"
                onChange={getData}
              />
              <small className="pb-2 text-danger">{error.fnameErr}</small>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <TextField
                value={player.lname}
                id="standard-basic"
                label="Last Name"
                name="lname"
                className="w-100"
                onChange={getData}
              />
              <small className="pb-2 text-danger">{error.lnameErr}</small>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <TextField
                value={player.height}
                id="standard-basic"
                label="height"
                name="height"
                className="w-100"
                onChange={getData}
              />
              <small className="pb-2 text-danger">{error.heightErr}</small>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
            {/* first page select position */}
              {/* <FormControl className="w-100">
                <InputLabel id="demo-simple-select-label">Select Position</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="position"
                  onChange={getData}
                  value={player.position}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Point_Guard_(PG)">Point Guard (PG)</MenuItem>
                  <MenuItem value="Shooting_Guard_(SG)">Shooting Guard (SG)</MenuItem>
                  <MenuItem value="Small_Forward_(SF)">Small Forward (SF)</MenuItem>
                  <MenuItem value="Power_Forward_(PF)">Power Forward (PF)</MenuItem>
                  <MenuItem value="Center_(C)">Center (C)</MenuItem>
                </Select>
              </FormControl> */}
              <SelectP className="w-100 mt-3"
                isMulti
                options={options}
                name="position"
                onChange={getPlayerField}
              />
              <small className="pb-2 text-danger">{error.positionErr}</small>
            </div>
          </div>
          <div className="row w-50 my-3 m-0">
             <div className="col-md-6 pl-0">
               <small className="text-success font-weight-bold h6">{status}</small>
             </div>
            <div className="col-md-6">
              <Button
                variant="contained"
                className="ml-auto d-block"
                color="primary"
                onClick={getEntry}
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* first quarter components *********************************************************/}
        <form>
          <div className="row">
            <div className="col-md-6">
              <SelectPlayer 
                className = "selectPlay"
                data = {playerArr}
                onChange={checkFun}
                nameAttr="player1"
              />
            </div>
            <div className="col-md-6">
              {/* select filed */}
              <FormControl style={{width : "100%"}} className="selectField">
                <InputLabel id="demo-simple-select-label">Select Position</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="position1"
                  onChange={getPositionField}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {playerArr.map(val => {
                    if(checkPlayer.player1 == val.id){
                      let tem = val.position;
                      return tem.map((i)=>{
                        return <MenuItem value={i.value}>{i.value}</MenuItem>
                      })
                    }
                  })}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <SelectPlayer
                className = "selectPlay"
                data = {playerArr}
                onChange={checkFun}
                nameAttr="player2"                
              />
            </div>
            <div className="col-md-6">
              {/* select filed */}
              <FormControl style={{width : "100%"}} className="selectField">
                <InputLabel id="demo-simple-select-label">Select Position</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="position2"                
                  onChange={getPositionField}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {playerArr.map(val => {
                    if(checkPlayer.player2 == val.id){
                      let tem = val.position;
                      return tem.map((i)=>{
                        return <MenuItem value={i.value}>{i.value}</MenuItem>
                      })
                    }
                  })}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <SelectPlayer 
                className = "selectPlay"
                data = {playerArr}
                onChange={checkFun}
                nameAttr="player3"                
              />
            </div>
            <div className="col-md-6">
              {/* select filed */}
              <FormControl style={{width : "100%"}} className="selectField">
                <InputLabel id="demo-simple-select-label">Select Position</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="position3"                
                  onChange={getPositionField}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {playerArr.map(val => {
                    if(checkPlayer.player3 == val.id){
                      let tem = val.position;
                      return tem.map((i)=>{
                        return <MenuItem value={i.value}>{i.value}</MenuItem>
                      })
                    }
                  })}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <SelectPlayer 
                className = "selectPlay"
                data = {playerArr}
                onChange={checkFun}
                nameAttr="player4"                
              />
            </div>
            <div className="col-md-6">
              {/* select field */}
              <FormControl style={{width : "100%"}} className="selectField">
                <InputLabel id="demo-simple-select-label">Select Position</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="position4"                
                  onChange={getPositionField}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {playerArr.map(val => {
                    if(checkPlayer.player4 == val.id){
                      let tem = val.position;
                      return tem.map((i)=>{
                        return <MenuItem value={i.value}>{i.value}</MenuItem>
                      })
                    }
                  })}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <SelectPlayer 
                className = "selectPlay"
                data = {playerArr}
                onChange={checkFun}
                nameAttr="player5"                
              />
            </div>
            <div className="col-md-6">
              {/* select field */}
              <FormControl style={{width : "100%"}} className="selectField">
                <InputLabel id="demo-simple-select-label">Select Position</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="position5"                 
                  onChange={getPositionField}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {playerArr.map(val => {
                    if(checkPlayer.player5 == val.id){
                      let tem = val.position;
                      return tem.map((i)=>{
                        return <MenuItem value={i.value}>{i.value}</MenuItem>
                      })
                    }
                  })}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <small className="text-danger">  
                {err}
              </small>
            </div>
            <div className="col-md-6">
              <Button
                variant="contained"
                className="ml-auto d-block my-3 btn-lg"
                color="primary"
                onClick={finalSave}
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </TabPanel>
    </div>
  );
}
