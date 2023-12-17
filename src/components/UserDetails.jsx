import { useState, useEffect } from 'react';
import './UserDetails.css'
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Alert } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';




const UserDetails = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);




  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://602e7c2c4410730017c50b9d.mockapi.io/users');
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <img src='/loading.gif' />;
  }

  if (error) {
    return <Alert severity="error">{error.message}</Alert>
  }

  if (!data || data.length === 0) {
    return <Alert severity="error">No Data to show</Alert>
  }


  const itemsPerPage = 5;

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);



  return (
    <>
      <div className='twoCard'>
        <div className=' firstcard'>
          <Typography gutterBottom variant="h5" component="div" className='userlist-text h-8 text-center bg-blue-400 '>
            User List
          </Typography>
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(data.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>


          {currentItems.map((user, index) => (

            <div className='flex' key={index} onClick={() => handleUserClick(user)}>

              <Card className='userListcard cursor-pointer'>
                <CardMedia
                  image={user.avatar}
                  className='img2'
                />
                <Box>
                  <CardContent>
                    <Typography style={{ marginTop: '20px' }} variant="h5" className='comp'>
                      {user.profile.firstName}  {user.profile.lastName}
                    </Typography>
                  </CardContent>

                </Box>

              </Card>


            </div>
          ))}



        </div>

        <div>

          {selectedUser ? (
            <div>

              <Card className='card'>
                <Typography gutterBottom variant="h5" component="div" className='text-center bg-blue-400 '>
                  User details
                </Typography>
                <CardMedia
                  image={selectedUser.avatar}
                  title="green iguana"
                  className="round-image"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" className='text-center'>
                    @{selectedUser.profile.username}
                  </Typography>

                  <Typography variant="h5" color="text.secondary" className='comp'>
                    {selectedUser.Bio}
                  </Typography>

                  Fullname
                  <Typography gutterBottom variant="h5" component="div" className='comp'>
                    {selectedUser.profile.firstName}  {selectedUser.profile.lastName}
                  </Typography>

                  Job Title
                  <Typography gutterBottom variant="h5" component="div" className='comp'>
                    {selectedUser.jobTitle}
                  </Typography>

                  Email
                  <Typography gutterBottom variant="h5" component="div" className='comp'>
                    {selectedUser.profile.email}
                  </Typography>
                </CardContent>
              </Card>
            </div>

          ) : (
            <div className='ml-10'>
              <Typography gutterBottom variant="h5" component="div" className=' h-8 text-center bg-blue-400 '>
                Select a User to view Details
              </Typography>
            </div>
          )}

        </div>

      </div>


    </>
  )
}

export default UserDetails