import type { FastifyPluginAsync, FastifySchema } from 'fastify';
import fp from 'fastify-plugin';
import status from '../project/httpStatusCodes';

export const schema: FastifyPluginAsync = fp(async (fastify) => {
  fastify.addSchema({
    $id: 'users',
    type: 'object',
    properties: {
      password: { type: 'string', minLength: 6 },
      passwordConfirm: {
        type: 'string',
        const: { $data: '1/password' },
      },
      username: { type: 'string', minLength: 3, maxLength: 50 },
    },
  });
});

// TODO: share response schema with auth/schema/loginSchema
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
      type: 'object',
      properties: {
        role: { type: 'string' },
        token: { type: 'string' },
        username: { type: 'string' },
      },
    },
  },
};

export const userValidateSchema: FastifySchema = {
  params: {
    type: 'object',
    required: ['username'],
    properties: {
      username: {
        type: 'string',
      },
    },
  },
  response: {
    [status.HTTP_200_OK]: {
      type: 'boolean',
    },
  },
};

export const userDetailSchema: FastifySchema = {};

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
