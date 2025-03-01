import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  // will call service func to send this data

  const result = await authServices.loginUsertIntoDB(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
    sameSite: 'none',
  });

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'user logged in successful',
    data: {
      accessToken,
    },
  });
});
const registrationUser = catchAsync(async (req, res) => {
  // will call service func to send this data
  const result = await authServices.createUser(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'user registration in successful',
    data: {
      accessToken,
    },
  });
});
const getMe = catchAsync(async (req, res) => {
  const { userId } = req.user as JwtPayload;
  const result = await authServices.getMeFromDB(userId);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'get me succesfully',
    data: result,
  });
});
// All Order get controller
const getAllUsers = catchAsync(async (req, res) => {
  const result = await authServices.getAllUsers();

  sendResponse(res, {
    statusCode: 200,
    message: 'Users get successfully',
    success: true,
    data: result,
  });
});
const deleteByAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await authServices.deleteUserFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User is deleted succesfully',
    data: result,
  });
});
const roleUpdateByAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  const result = await authServices.userRoleUpdate(id, role);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Role updated succesfully',
    data: result,
  });
});
const statusUpdateByAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const result = await authServices.userStatusUpdate(id, status);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Status updated succesfully',
    data: result,
  });
});
const profileUpdate = catchAsync(async (req, res) => {
  const { userId } = req.user as JwtPayload;

  const result = await authServices.profileUpdate(userId, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Profile updated succesfully',
    data: result,
  });
});
const changePassword = catchAsync(async (req, res) => {
  // will call service func to send this data
  const { ...passwordData } = req.body;
  const userData = req?.user;
  const result = await authServices.passwordChnageIntoDB(
    userData as JwtPayload,
    passwordData,
  );

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Password updated successful',
    data: result,
  });
});
export const authController = {
  getMe,
  loginUser,
  getAllUsers,
  changePassword,
  profileUpdate,
  deleteByAdmin,
  registrationUser,
  roleUpdateByAdmin,
  statusUpdateByAdmin,
};
