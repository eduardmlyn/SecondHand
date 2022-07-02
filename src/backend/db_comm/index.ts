import express from 'express';
import cors from 'cors';
import {
  changeAdvertisement, deleteAdvertisementById,
  listAdvertisement,
  listAdvertisements,
  listUserAdvertisementById,
  listUserAdvertisements, storeAdvertisement
} from "./advertisement/advertisementRequest";
import {storeReview, updateUserReview} from "./review/reviewRequest";
import {listStarred, storeStarred, unStar} from "./starred/starredRequest";
import {deleteUserById, loginUser, showUser, storeUser, updateProfile} from "./user/userRequest";
import {loginAdmin} from "./admin/adminRequest";

const api = express();

api.use(cors());

api.use(express.json());
api.use(express.urlencoded({extended: true}));

api.get('/', (req, res) => res.send({
  status: 'success',
  data: {},
  message: 'Welcome to Second Hand API'
}));

api.get('/user/:userId/advertisement/:id', listUserAdvertisementById) // show advertisement made by user
api.get('/user/:id/advertisement', listUserAdvertisements) // list all advertisements made by user
api.get('/advertisement', listAdvertisements) // list all advertisements
api.get('/advertisement/:id', listAdvertisement) // list advertisement
api.get('/user/:userId/starred', listStarred) // get user starred advertisements
api.get('/admin') // may be implemented later
api.get('/user/:id', showUser) // display user account
api.post('/user', storeUser) // add user(account creation, crucial)
api.post('/user/login', loginUser) // user login
api.post('/user/:id/advertisement', storeAdvertisement) // advertisement creation
api.post('/user/:userId/advertisement/:id/review', storeReview) // review creation
api.post('/user/:userId/advertisement/:id/star', storeStarred) // star an advertisement
api.post('/admin', loginAdmin) // admin login
// implement updates
api.put('/user/:id', updateProfile) // update user
api.put('/user/:userId/advertisement/:advertisementId/review', updateUserReview) // update review
api.put('/advertisement/:id', changeAdvertisement) // update advertisement
api.put('/user/:userId/advertisement/:advertisementId/star', unStar) // unstar advertisement
// implement deletion
api.delete('/user/:userId/advertisement/:id', deleteAdvertisementById) // delete advertisement
api.delete('/user/:id', deleteUserById)
api.listen(4000, () => console.log(`App listening on port 4000`));
