import {
  Button,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  CardHeader,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Tooltip from '@mui/material/Tooltip';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import * as XLSX from 'xlsx';
import styles from './EventCard.module.css';

const EventCard = ({ id, image, event_name, event_id, token, type }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [participants, setParticipants] = useState();

  const openEvent = () => {
    router.push(`/eventList/${event_id}`);
  };

  const openEditEvent = () => {
    router.push(`/adminPanel/${event_id}`);
  };

  const openUserModal = () => {
    fetchParticipants();
    setIsModalOpen(true);
  };

  const closeUserModal = () => {
    setIsModalOpen(false);
  };

  const resFetch = async (req) => {
    const res = await fetch(...req);
    if (!(res.ok || res.created)) {
      throw new Error(res.status);
    }
    return res.json();
  };

  const fetchParticipants = () => {
    resFetch([
      `${process.env.NEXT_PUBLIC_BACKEND_API}club/${event_id}/participants`,
      {
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    ])
      .then((res) => {
        const registeredParticipants = res.data.filter((participant) => {
          if (type == 'INDIVIDUAL')
            return participant.length != 0 ? participant : null;
          else {
            return participant.members.length != 0 ? participant : null;
          }
        });
        setParticipants(registeredParticipants);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const saveAsExcel = () => {
    if (participants && participants.length > 0) {
      if (type == 'INDIVIDUAL') {
        const heading = [['Name', 'Email Id', 'College', 'Contact']];
        const file = participants.map((user) => [
          `${user[0].first_name} ${user[0].last_name}`,
          user[0].email,
          user[0].college ? user[0].college : '',
          user[0].mobile ? user[0].mobile : '',
        ]);
        const worksheet = XLSX.utils.json_to_sheet(file, {
          origin: 'A2',
          skipHeader: true,
        });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.sheet_add_aoa(worksheet, heading, { origin: 'A1' });
        XLSX.utils.book_append_sheet(workbook, worksheet, `${event_name}`);
        XLSX.writeFile(workbook, `${event_name}.xlsx`);
      } else {
        const heading = [
          ['Team Name', 'Name', 'Email Id', 'College', 'Contact'],
        ];
        const file = participants
          .map((user) =>
            user.members.map((member) => [
              user.team_name,
              `${member.first_name} ${member.last_name}`,
              member.email,
              member.college ? member.college : '',
              member.mobile ? member.mobile : '',
            ])
          )
          .flat();
        const worksheet = XLSX.utils.json_to_sheet(file, {
          origin: 'A2',
          skipHeader: true,
        });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.sheet_add_aoa(worksheet, heading, { origin: 'A1' });
        XLSX.utils.book_append_sheet(workbook, worksheet, `${event_name}`);
        XLSX.writeFile(workbook, `${event_name}.xlsx`);
        console.log(file);
      }
    }
  };

  return (
    <div className={styles.dialog}>
      <Dialog open={isModalOpen} onClose={closeUserModal}>
        {type == 'INDIVIDUAL' ? (
          <div>
            <DialogTitle>
              Registered Users - {participants ? participants.length : ''}{' '}
              {participants && participants.length && (
                <FileDownloadIcon
                  sx={{ margin: '0 0 -0.35rem 0', cursor: 'pointer' }}
                  onClick={() => saveAsExcel()}
                />
              )}
            </DialogTitle>
            <DialogContent>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center">Email Id</TableCell>
                      <TableCell align="center">College</TableCell>
                      <TableCell align="center">Contact</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {participants &&
                      participants.length &&
                      participants.map((user, idx) => (
                        <TableRow
                          key={user[0].id}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell align="center">
                            {user[0].first_name} {user[0].last_name}
                          </TableCell>
                          <TableCell align="center">{user[0].email}</TableCell>
                          {user[0].college && (
                            <TableCell align="center">
                              {user[0].college}
                            </TableCell>
                          )}
                          {user[0].mobile && (
                            <TableCell align="center">
                              {user[0].mobile}
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContent>
          </div>
        ) : (
          <div>
            <DialogTitle>
              Registered Teams - {participants ? participants.length : ''}{' '}
              {participants && participants.length && (
                <FileDownloadIcon
                  sx={{ margin: '0 0 -0.35rem 0', cursor: 'pointer' }}
                  onClick={() => saveAsExcel()}
                />
              )}
            </DialogTitle>
            <DialogContent>
              {participants &&
                participants.length &&
                participants.map((user, idx) => (
                  <Accordion key={idx}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="team-content"
                      id="team-header"
                    >
                      <Typography>
                        Team-name: {user.team_name}, Size:{user.members.length}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Email Id</TableCell>
                            <TableCell align="center">College</TableCell>
                            <TableCell align="center">Contact</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {user.members &&
                            user.members.length &&
                            user.members.map((member, id) => (
                              <TableRow
                                key={id}
                                sx={{
                                  '&:last-child td, &:last-child th': {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell align="center">
                                  {member.first_name} {member.last_name}
                                </TableCell>
                                <TableCell align="center">
                                  {member.email}
                                </TableCell>
                                {member.college && (
                                  <TableCell align="center">
                                    {member.college}
                                  </TableCell>
                                )}
                                {member.mobile && (
                                  <TableCell align="center">
                                    {member.mobile}
                                  </TableCell>
                                )}
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </AccordionDetails>
                  </Accordion>
                ))}
            </DialogContent>
          </div>
        )}
      </Dialog>
      <Card variant="outlined">
        <CardContent>
          <CardHeader
            titleTypographyProps={{ fontSize: `1rem`, textAlign: `center` }}
            title={
              event_name.length > 20
                ? `${event_name.slice(0, 20)}...`
                : event_name
            }
          ></CardHeader>
          <CardMedia
            component="img"
            height="194"
            image={`${process.env.NEXT_PUBLIC_BACKEND_API}${image}`}
            alt="Event Photo"
          />
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="small"
            id={id}
            onClick={openEditEvent}
          >
            Edit Event
          </Button>
          <Button
            variant="contained"
            name={`${event_id}`}
            size="small"
            onClick={openEvent}
          >
            View Event
          </Button>
          <Tooltip title="View Participants">
            <PeopleAltIcon
              onClick={openUserModal}
              sx={{
                color: 'black',
                fontSize: '2.4rem',
                padding: 0,
                margin: '5px',
                cursor: 'pointer',
              }}
            />
          </Tooltip>
        </CardActions>
      </Card>
    </div>
  );
};

export default EventCard;
