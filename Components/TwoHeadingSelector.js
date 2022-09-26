import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classes from './TwoHeadingSelector.module.css';

const TwoHeadingSelector = ({
  leftName = 'Technical',
  rightName = 'Cultural',
  leftRoute,
  rightRoute,
  technicalImageUrl,
  culturalImageUrl,
}) => {
  const [openTechnical, setOpenTechnical] = useState(false);
  const [openCultural, setOpenCultural] = useState(false);
  const [isHoveredOnTechnical, setHoveredOnTechnical] = useState(false);
  const [isHoveredOnCultural, setHoveredOnCultural] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (openTechnical || openCultural) {
      setTimeout(() => {
        if (openTechnical) {
          router.push(leftRoute);
          return;
        }
        router.push(rightRoute);
      }, 700);
    }
  }, [openTechnical, openCultural]);

  return (
    <div style={{ position: 'fixed' }}>
      <div
        className={classes.sideBySideContainer}
        style={{ height: '100vh', display: 'flex' }}
      >
        <div
          onMouseOver={() => {
            setHoveredOnTechnical(true);
          }}
          onMouseLeave={() => {
            setHoveredOnTechnical(false);
          }}
          onClick={() => {
            setOpenTechnical(true);
          }}
          className={`${classes.image}  ${classes.cultural} ${
            openTechnical && classes.open_page
          }
            ${isHoveredOnCultural && classes.cultural_small}
          }`}
        >
          <h1
            onClick={() => {
              setOpenTechnical(true);
            }}
            className={`${classes.header_large}`}
          >
            {leftName}
          </h1>
          <img src={technicalImageUrl} className={`${classes.culturalImage}`} />
        </div>

        <div
          onClick={() => {
            setOpenCultural(true);
          }}
          onMouseOver={() => {
            setHoveredOnCultural(true);
          }}
          onMouseLeave={() => {
            setHoveredOnCultural(false);
          }}
          className={`${classes.image} ${classes.technical} ${
            openCultural && classes.open_page
          }
          ${openTechnical && classes.close_page}
          ${isHoveredOnTechnical && classes.technical_small}`}
        >
          <h1
            onClick={() => {
              setOpenCultural(true);
            }}
            style={{ right: '0' }}
            className={`${classes.header_large}`}
          >
            {rightName}
          </h1>
          <img src={culturalImageUrl} className={`${classes.technicalImage}`} />
        </div>
      </div>
      <div
        className={classes.parallelContainer}
        style={{ background: '#07202a' }}
      >
        <div
          onClick={() => {
            setOpenTechnical(true);
          }}
          className={classes.imageParallelContainer}
          style={{
            minHeight: openTechnical ? '100vh' : '50vh',
            zIndex: openTechnical ? '1000' : '1',
          }}
        >
          {!openCultural && (
            <h1
              onClick={() => {
                setOpenTechnical(true);
              }}
              style={{
                cursor: 'pointer',
              }}
              className={`${classes.header_large}`}
            >
              {leftName}
            </h1>
          )}

          <img
            src={technicalImageUrl}
            style={{
              height: openTechnical ? '100vh' : '50vh',
            }}
            className={`${classes.culturalImage} ${classes.shade}`}
          />
        </div>

        <div
          onClick={() => {
            setOpenCultural(true);
          }}
          className={classes.imageParallelContainer}
          style={{
            position: 'absolute',
            minHeight: openCultural ? '100%' : '50%',
            bottom: '0',
            zIndex: openCultural ? '1000' : '1',
          }}
        >
          {!openTechnical && (
            <h1
              onClick={() => {
                setOpenCultural(true);
              }}
              className={`${classes.header_large}`}
            >
              {rightName}
            </h1>
          )}
          <img
            src={culturalImageUrl}
            style={{
              height: openCultural ? '100vh' : '50vh',
            }}
            className={`${classes.technicalImage} ${classes.shade}`}
          />
        </div>
      </div>
    </div>
  );
};

export default TwoHeadingSelector;
