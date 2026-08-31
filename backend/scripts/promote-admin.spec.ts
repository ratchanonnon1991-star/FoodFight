import { Role } from '../src/database/generated/prisma/enums';
import {
  parseEmailArg,
  promoteUserToAdmin,
  MinimalPrismaClient,
} from './promote-admin';

describe('promoteUserToAdmin', () => {
  let prisma: MinimalPrismaClient;
  let findUniqueMock: jest.Mock;
  let updateMock: jest.Mock;

  beforeEach(() => {
    findUniqueMock = jest.fn();
    updateMock = jest.fn();

    prisma = {
      user: {
        findUnique: findUniqueMock,
        update: updateMock,
      },
    };
  });

  it('should promote an existing verified USER to ADMIN', async () => {
    findUniqueMock.mockResolvedValueOnce({
      id: 'user-uuid-1',
      email: 'owner@example.com',
      displayName: 'Owner User',
      emailVerified: true,
      role: Role.USER,
    });

    updateMock.mockResolvedValueOnce({
      id: 'user-uuid-1',
      email: 'owner@example.com',
      displayName: 'Owner User',
      role: Role.ADMIN,
    });

    const result = await promoteUserToAdmin(prisma, 'owner@example.com');

    expect(result.status).toBe('PROMOTED');
    expect(result.message).toContain('successfully promoted to ADMIN');
    expect(result.user).toEqual({
      id: 'user-uuid-1',
      email: 'owner@example.com',
      displayName: 'Owner User',
      previousRole: Role.USER,
      newRole: Role.ADMIN,
    });

    expect(findUniqueMock).toHaveBeenCalledWith({
      where: { email: 'owner@example.com' },
      select: {
        id: true,
        email: true,
        displayName: true,
        emailVerified: true,
        role: true,
      },
    });

    expect(updateMock).toHaveBeenCalledWith({
      where: { id: 'user-uuid-1' },
      data: { role: Role.ADMIN },
      select: {
        id: true,
        email: true,
        displayName: true,
        role: true,
      },
    });
  });

  it('should be idempotent and not perform database update if user is already ADMIN', async () => {
    findUniqueMock.mockResolvedValueOnce({
      id: 'user-uuid-2',
      email: 'admin@example.com',
      displayName: 'Admin User',
      emailVerified: true,
      role: Role.ADMIN,
    });

    const result = await promoteUserToAdmin(prisma, 'admin@example.com');

    expect(result.status).toBe('ALREADY_ADMIN');
    expect(result.message).toContain('already an ADMIN');
    expect(result.user).toEqual({
      id: 'user-uuid-2',
      email: 'admin@example.com',
      displayName: 'Admin User',
      previousRole: Role.ADMIN,
      newRole: Role.ADMIN,
    });

    expect(updateMock).not.toHaveBeenCalled();
  });

  it('should return USER_NOT_FOUND when target user does not exist', async () => {
    findUniqueMock.mockResolvedValueOnce(null);

    const result = await promoteUserToAdmin(prisma, 'unknown@example.com');

    expect(result.status).toBe('USER_NOT_FOUND');
    expect(result.message).toContain('was not found');
    expect(result.user).toBeUndefined();
    expect(updateMock).not.toHaveBeenCalled();
  });

  it('should reject unverified user with UNVERIFIED_USER', async () => {
    findUniqueMock.mockResolvedValueOnce({
      id: 'user-uuid-3',
      email: 'unverified@example.com',
      displayName: 'Unverified User',
      emailVerified: false,
      role: Role.USER,
    });

    const result = await promoteUserToAdmin(prisma, 'unverified@example.com');

    expect(result.status).toBe('UNVERIFIED_USER');
    expect(result.message).toContain('has not verified their email');
    expect(result.user).toBeUndefined();
    expect(updateMock).not.toHaveBeenCalled();
  });

  it('should return INVALID_INPUT when email is missing or malformed', async () => {
    const emptyResult = await promoteUserToAdmin(prisma, '');
    expect(emptyResult.status).toBe('INVALID_INPUT');

    const undefinedResult = await promoteUserToAdmin(prisma, undefined);
    expect(undefinedResult.status).toBe('INVALID_INPUT');

    const invalidResult = await promoteUserToAdmin(prisma, 'invalid-email');
    expect(invalidResult.status).toBe('INVALID_INPUT');

    expect(findUniqueMock).not.toHaveBeenCalled();
    expect(updateMock).not.toHaveBeenCalled();
  });

  it('should normalize email to lowercase and trim whitespace', async () => {
    findUniqueMock.mockResolvedValueOnce({
      id: 'user-uuid-4',
      email: 'owner@example.com',
      displayName: 'Owner User',
      emailVerified: true,
      role: Role.USER,
    });

    updateMock.mockResolvedValueOnce({
      id: 'user-uuid-4',
      email: 'owner@example.com',
      displayName: 'Owner User',
      role: Role.ADMIN,
    });

    const result = await promoteUserToAdmin(prisma, '  OWNER@Example.COM  ');

    expect(result.status).toBe('PROMOTED');
    expect(findUniqueMock).toHaveBeenCalledWith({
      where: { email: 'owner@example.com' },
      select: expect.any(Object),
    });
  });
});

describe('parseEmailArg', () => {
  it('should parse --email <value>', () => {
    expect(parseEmailArg(['--email', 'user@example.com'])).toBe('user@example.com');
  });

  it('should parse --email=<value>', () => {
    expect(parseEmailArg(['--email=user@example.com'])).toBe('user@example.com');
  });

  it('should return undefined if --email flag is missing', () => {
    expect(parseEmailArg(['--other', 'value'])).toBeUndefined();
    expect(parseEmailArg([])).toBeUndefined();
  });

  it('should return undefined if --email has no following argument', () => {
    expect(parseEmailArg(['--email'])).toBeUndefined();
    expect(parseEmailArg(['--email', '--other'])).toBeUndefined();
  });
});
