import React from "react";
import { FormControl } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
const SelectPlayer = (props) => {
  return (
    <>
      <FormControl style={{width : "100%"}} className={props.className}>
        <InputLabel id="demo-simple-select-label">Select Player</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          name={props.nameAttr}
          onChange={props.onChange}
          id = {props.id}
        >
          <MenuItem value="">
            <em>none</em>
          </MenuItem>
          {props && props.data.map(val => {
            return <MenuItem value={val.id}>{val.fname}</MenuItem>
          })}
        </Select>
      </FormControl>
    </>
  );
};
export default SelectPlayer;
