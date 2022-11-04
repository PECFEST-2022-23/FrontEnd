import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classes from './TwoHeadingSelector.module.css';
import Image from 'next/image';

const TwoHeadingSelector = ({
  leftName = 'Technical',
  rightName = 'Cultural',
  leftRoute,
  rightRoute,
  leftImageUrl,
  rightImageUrl,
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
          localStorage.setItem('filters', [leftName.toLowerCase()]);
          router.push({
            pathname: leftRoute,
            query: {
              typeOfEvent: leftName.toUpperCase(),
            }
          });
          return;
        }
        localStorage.setItem('filters', [rightName.toLowerCase()]);
        router.push({
          pathname: rightRoute,
          query: {
            typeOfEvent: rightName.toUpperCase(),
          }
        });
      }, 400);
    }
  }, [
    openTechnical,
    openCultural,
    leftRoute,
    rightRoute,
    router,
    leftName,
    rightName,
  ]);

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
          <Image
            layout="fill"
            alt="Technical Image"
            src={leftImageUrl}
            className={`${classes.culturalImage}`}
          />
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
          <Image
            layout="fill"
            alt="Cultural Image"
            src={rightImageUrl}
            className={`${classes.technicalImage}`}
          />
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

          <Image
            layout="fill"
            alt="Technical Image"
            src={leftImageUrl}
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

          <Image
            layout="fill"
            alt="Cultural Image"
            src={rightImageUrl}
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
