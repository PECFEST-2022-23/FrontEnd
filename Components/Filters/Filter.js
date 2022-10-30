import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import classes from './Filters.module.css';

const Filters = (props) => {
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
    <FormControl sx={{ margin: '20px auto', minWidth: '25%', maxWidth: '85%' }}>
      <InputLabel style={{ color: 'white' }} id="demo-multiple-checkbox-label">
        Filters
      </InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        variant="outlined"
        multiple
        style={{ color: 'white', background: '#404040' }}
        value={props.filters}
        onChange={props.filterChangeHandler}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) =>
          selected?.map((filter, id) => (
            <span key={id} className={classes.filter}>
              {filter.toUpperCase()}
            </span>
          ))
        }
        MenuProps={MenuProps}
        sx={{
          color: 'white',
          '.MuiSvgIcon-root ': {
            fill: 'white !important',
          },
        }}
      >
        {props.availableFilters.current.map((filter) => (
          <MenuItem key={filter} value={filter}>
            <Checkbox checked={props.filters.indexOf(filter) > -1} />
            <ListItemText primary={filter.toUpperCase()} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default Filters;
