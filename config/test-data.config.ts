export const testData = {
  validCredentials: {
    username: 'test_user',
    password: 'Test@123',
  },
  invalidCredentials: {
    username: 'invalid_user',
    password: 'wrong_password',
  },
  sampleUser: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
  },
  products: {
    product1: {
      name: 'Sample Product',
      price: 29.99,
      quantity: 1,
    },
    product2: {
      name: 'Another Product',
      price: 49.99,
      quantity: 2,
    },
  },
};

export function generateRandomEmail(): string {
  const timestamp = Date.now();
  return `test_${timestamp}@example.com`;
}

export function generateRandomUsername(): string {
  const timestamp = Date.now();
  return `user_${timestamp}`;
}
