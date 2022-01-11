import type { FastifyPluginAsync, FastifySchema } from 'fastify';
import fp from 'fastify-plugin';
import status from '../project/httpStatusCodes';

export const schema: FastifyPluginAsync = fp(async (fastify) => {
  fastify.addSchema({
    $id: 'users',
    properties: {
      password: { type: 'string', minLength: 6 },
      passwordConfirm: {
        type: 'string',
        const: { $data: '1/password' },
      },
      role: { type: 'string' },
      userId: { type: 'string' },
      username: { type: 'string', minLength: 3, maxLength: 50 },
    },
  });
});

export const registerSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['password', 'passwordConfirm', 'username'],
    properties: {
      password: { $ref: 'users#/properties/password' },
      passwordConfirm: { $ref: 'users#/properties/passwordConfirm' },
      username: { $ref: 'users#/properties/username' },
    },
  },
  response: {
    [status.HTTP_200_OK]: {
      $ref: 'auth/response#/login',
    },
  },
};

export const userDetailSchema: FastifySchema = {
  params: {
    type: 'object',
    required: ['username'],
    properties: {
      username: { type: 'string' },
    },
  },
  response: {
    [status.HTTP_200_OK]: {
      createdAt: { type: 'string' },
      email: { type: 'string' },
      emailHash: { type: 'string' },
      firstName: { type: 'string' },
      id: { $ref: 'users#/properties/userId' },
      lastLogin: { type: 'string' },
      lastName: { type: 'string' },
      role: { $ref: 'users#/properties/role' },
      username: { type: 'string' },
    },
  },
};

export const editUserSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['username'],
    properties: {
      currentPassword: { type: 'string' },
      email: { type: 'string', format: 'email' },
      firstName: { type: 'string', maxLength: 50 },
      lastName: { type: 'string', maxLength: 50 },
      password: { $ref: 'users#/properties/password' },
      passwordConfirm: { $ref: 'users#/properties/passwordConfirm' },
      username: { $ref: 'users#/properties/username' },
    },
    // TODO
    // dependentRequired: {
    //   currentPassword: ['password', 'passwordConfirm'],
    //   password: ['currentPassword', 'passwordConfirm'],
    //   passwordConfirm: ['currentPassword', 'password'],
    // },
  },
};
