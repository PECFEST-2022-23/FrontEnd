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
    <>
      <div style={{ height: '100vh' }}>
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
      {/* <div
        className="d-flex bg-dark d-md-none vh-100 zi-top flex-column"
        style={{ background: '#07202a' }}
      >
        <div
          onClick={() => {
            setOpenTechnical(true);
          }}
          className={`cursor-pointer vh-50 mb-1 bg-white position-relative transition-smooth d-flex flex-row justify-content-center ${
            openTechnical && 'vh-100 zi-1'
          }`}
        >
          {!openCultural && (
            <h1
              onClick={() => {
                setOpenTechnical(true);
              }}
              className={`animate__animated zi-1 cursor-pointer text-white position-absolute top-50 mx-autor translate-middle-y ${classes.header_large}`}
            >
              {leftName}
            </h1>
          )}

          <img
            src={technicalImageUrl}
            className={`${classes.culturalImage} ${classes.shade} h-100 vw-100`}
          />
        </div>

        <div
          onClick={() => {
            setOpenCultural(true);
          }}
          className={`cursor-pointer bg-image vh-50 pt-1  position-absolute bottom-0 transition-smooth ${
            openCultural && 'vh-100'
          }`}
        >
          {!openTechnical && (
            <h1
              onClick={() => {
                setOpenCultural(true);
              }}
              className={`zi-1 animate__animated animate__faster cursor-pointer text-white position-absolute top-50 end-0 mx-5 px-5 translate-middle-y ${classes.header_large}`}
            >
              {rightName}
            </h1>
          )}
          <img
            src={culturalImageUrl}
            className={`${classes.technicalImage}  ${classes.shade} vw-100 h-100`}
          />
        </div>
      </div> */}
    </>
  );
};

export default TechCulturalSelector;
