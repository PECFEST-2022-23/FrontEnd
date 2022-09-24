import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classes from './TechCulturalSelector.module.css';

const TechCulturalSelector = ({
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
    // document.body.style.position = 'absolute';
  });
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
    <div>
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
        >
          {!openCultural && (
            <>
              <h1
                onClick={() => {
                  setOpenTechnical(true);
                }}
                style={{ top: '40%' }}
                className={`${classes.header_large}`}
              >
                {leftName}
              </h1>

              <img
                src={technicalImageUrl}
                style={{
                  position: 'relative',
                  width: '100vw',
                  height: openTechnical ? '100vh' : '50vh',
                }}
                className={` ${classes.shade}`}
              />
            </>
          )}
        </div>

        <div
          onClick={() => {
            setOpenCultural(true);
          }}
        >
          {!openTechnical && (
            <>
              <h1
                onClick={() => {
                  setOpenCultural(true);
                }}
                style={{ top: '90%' }}
                className={`${classes.header_large}`}
              >
                {rightName}
              </h1>

              <img
                src={culturalImageUrl}
                style={{
                  position: 'absolute',
                  bottom: '0',
                  width: '100vw',
                  height: openCultural ? '100vh' : '50vh',
                }}
                className={` ${classes.shade}`}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechCulturalSelector;
