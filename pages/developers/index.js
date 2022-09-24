import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './Developers.module.css';
// import StarsBg from "../../Components/StarsBg/index";
// import { getList } from "services";
// import TeamMemberCard from "Components/TeamTiles/TeamMemberCard";

function Developers() {
  const [membersData, setMembersData] = useState([]);

  return (
    <div className={`vw-100 vh-100 d-flex`}>
      {/* <StarsBg /> */}
      <Container
        fluid
        className={`d-flex flex-column overflow-hidden ${styles.main_container}`}
      >
        <div className={`d-flex flex-column flex-grow-1`}>
          <Row className={`d-flex justify-content-center ${styles.pageheader}`}>
            DEVELOPERS
          </Row>
          <Row className="d-flex flex-row justify-content-center">
            {/* {membersData.map((item, index) => {
              return (
                <TeamMemberCard key={item.name} member={item} index={index} />
              );
            })} */}
            <div className={styles.container}>
              <div className={`${styles.center} ${styles.developers}`}>
                <div className={styles.front_face}>
                  <div className={`${styles.contents} ${styles.front}`}>
                    <p>Puneet Bansal</p>
                    <span>Frontend Developer</span>
                  </div>
                </div>
                <div className={styles.back_face}>
                  <div className={`${styles.contents} ${styles.back}`}>
                    <h2></h2>
                    <span>Follow Me</span>
                    <div className={styles.icons}>
                      <i className="fa fa-facebook-f"></i>
                      <i className="fab fa fa-twitter"></i>
                      <i className="fab fa fa-instagram"></i>
                      <i className="fab fa fa-linkedin-in"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.container}>
              <div className={`${styles.center} ${styles.developers}`}>
                <div className={styles.front_face}>
                  <div className={`${styles.contents} ${styles.front}`}>
                    <p>Puneet Bansal</p>
                    <span>Frontend Developer</span>
                  </div>
                </div>
                <div className={styles.back_face}>
                  <div className={`${styles.contents} ${styles.back}`}>
                    <h2></h2>
                    <span>Follow Me</span>
                    <div className={styles.icons}>
                      <i className="fa fa-facebook-f"></i>
                      <i className="fab fa fa-twitter"></i>
                      <i className="fab fa fa-instagram"></i>
                      <i className="fab fa fa-linkedin-in"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default Developers;
