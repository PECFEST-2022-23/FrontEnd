import { useState, useEffect } from 'react';
import EventIcon from '@mui/icons-material/Event';
import Button from '@mui/material/Button';
import styles from './Filters.module.css';

const Filters = (props) => {
  const [active, setActive] = useState(false);
  const [buttonType, setButtonType] = useState('text');

  useEffect(() => {
    setButtonTypeFromListing();
  }, []);

  const setButtonTypeFromListing = () => {
    if (props.filterValue === props.eventType) setButtonType('contained');
  };

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
      <Button
        variant={buttonType}
        style={{ marginRight: 15, marginTop: 4, color: 'white' }}
        className={styles.activeTagStyle}
        startIcon={<EventIcon style={{ color: 'white' }} />}
        onClick={() => {
          if (!active) {
            props.onSelectFilters(props.filterValue);
            setActive(true);
            setButtonType('contained');
          } else {
            props.onDeSelectFilters(props.filterValue);
            setActive(false);
            setButtonType('text');
          }
        }}
      >
        {props.filterValue}
      </Button>
    </>
  );
};
export default Filters;
