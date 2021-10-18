type Foo = {
  body: {
    username: string,
    password: string,
  },
};

export const token = async (request: Foo) => {
  const { username, password = '' } = request.body;
  // // eslint-disable-next-line no-console
  console.log(username, password);
  return { foo: 'bar' };
};
