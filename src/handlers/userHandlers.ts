import express, { Request, Response } from 'express';
import { User, UserStore, UserWithID } from '../models/user';
import jwt from 'jsonwebtoken';
import { verifyAuthToken } from '../middleware/verification';

const store = new UserStore();

/**
 * Shows all users from the store
 *
 * @param {Request} _req - The request object (unused)
 * @param {Response} res - The response object used to send the users information
 */
const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json((err as Error).message);
  }
};

/**
 * Shows a specific user by their ID
 *
 * @param {Request} req - The request object containing the user ID
 * @param {Response} res - The response object used to send the user information
 */
const show = async (req: Request, res: Response) => {
  try {
    //
    const user = await store.show(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json((err as Error).message);
  }
};

/**
 * Creates a new user and generates a JWT token for them
 *
 * @param {Request} req - The request object containing the user information to create
 * @param {Response} res - The response object used to send the token
 */
const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    };
    const newUser = await store.create(user);
    var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json((err as Error).message);
  }
};

/**
 * Authenticates a user by checking their credentials and generating a JWT token
 *
 * @param {Request} req - The request object containing the user information to authenticate
 * @param {Response} res - The response object used to send the token
 */
const authenticate = async (req: Request, res: Response) => {
  try {
    const user: User = {
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    };

    const u = await store.authenticate(user.username, user.password);

    if (!u) {
      return res.status(401).json('Wrong username-password');
    }

    let token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json((err as Error).message);
  }
};

/**
 * Updates a user by their ID
 *
 * @param {Request} req - The request object containing the user information to update
 * @param {Response} res - The response object used to send the updated user information
 */
const update = async (req: Request, res: Response) => {
  try {
    if (Number(req.body.decoded.user.id) !== Number(req.params.id)) {
      return res.status(403).json('You are not allowed to update this user');
    }

    const user: UserWithID = {
      id: Number(req.params.id),
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    };

    const updateUser = await store.update(user);
    res.json(updateUser);
  } catch (err) {
    res.status(400);
    res.json((err as Error).message);
  }
};

/**
 * Deletes a user by their ID
 *
 * @param {Request} req - The request object containing the user ID to delete
 * @param {Response} res - The response object used to send the deleted user information
 */
const del = async (req: Request, res: Response) => {
  try {
    if (Number(req.body.decoded.user.id) !== Number(req.params.id)) {
      return res.status(403).json('You are not allowed to delete this user');
    }

    const deleted = await store.delete(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(400);
    res.json((err as Error).message);
  }
};

/**
 * Routes for user endpoints
 *
 * @param {express.Application} app - The express application object
 */
const userRoutes = (app: express.Application) => {
  // Route to show all users using middleware to verify the token
  app.get('/users', verifyAuthToken, index),
    // Route to show a specific user using middleware to verify the token
    app.get('/users/:id', verifyAuthToken, show),
    // Route to create a new user
    app.post('/users', create),
    // Route to authenticate a user
    app.post('/users/authenticate', authenticate),
    // Route to update a user using middleware to verify the token
    app.put('/users/:id', verifyAuthToken, update),
    // Route to delete a user using middleware to verify the token
    app.delete('/users/:id', verifyAuthToken, del);
};

export default userRoutes;
