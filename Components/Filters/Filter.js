import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Chip,
} from '@mui/material';
import { useState } from 'react';
import EventIcon from '@mui/icons-material/Event';
import styles from "./Filters.module.css";
import classes from './Filters.module.css';

const Filters = (props) => {

  const [active, setActive] = useState(false);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
    // disableScrollLock: true,
  };
  return (
    <>
      <Chip
        label={props.filterValue}
        //style={{ marginTop: 10, marginRight: 5, color: "white", fontWeight: "bold" }}
        //color={!active ? props.color : "success"}
        className={active ? styles.activeTagStyle : styles.inactiveTagStyle}
        icon={<EventIcon style={{color: "white"}} />}
        onClick={() => {
          if(!active){
            props.onSelectFilters(props.filterValue);
            setActive(true);
          }
          else{
            props.onDeSelectFilters(props.filterValue);
            setActive(false);
          }
        }}
      />
    </>
  );
};
export default Filters;
