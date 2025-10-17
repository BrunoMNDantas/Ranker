// Mock Firebase Auth
jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  signOut: jest.fn(),
  signInWithPopup: jest.fn(),
  GoogleAuthProvider: class GoogleAuthProvider {
    addScope = jest.fn().mockReturnThis();
  },
  getAdditionalUserInfo: jest.fn(),
}));

// Mock Firestore store
jest.mock("../../../services/store/firebase/Firestore.store", () => ({
  AUTH: {},
}));

// Mock User API
jest.mock("../../user/api/User.api", () => ({
  createUser: jest.fn(),
}));

// Mock EntityFactory
jest.mock("../../../services/EntityFactory.service", () => ({
  createUser: jest.fn((data) => data),
}));

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  signInWithPopup,
  getAdditionalUserInfo,
  UserCredential,
} from "firebase/auth";
import { createUser as submitUser } from "../../user/api/User.api";
import { createUser as createUserEntity } from "../../../services/EntityFactory.service";
import {
  register,
  login,
  resetPassword,
  logout,
  loginWithGoogle,
  convertIntoNewUser,
} from "./Auth.api";

describe("Auth API", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("convertIntoNewUser", () => {

    it("should convert Firebase user to app user with display name", () => {
      const firebaseUser: UserCredential = {
        user: {
          uid: "user-123",
          photoURL: "https://example.com/photo.jpg",
          displayName: "John Doe",
        },
      } as UserCredential;

      (createUserEntity as jest.Mock).mockReturnValue({
        id: "user-123",
        imageUrl: "https://example.com/photo.jpg",
        username: "John Doe",
      });

      const result = convertIntoNewUser(firebaseUser);

      expect(createUserEntity).toHaveBeenCalledWith({
        id: "user-123",
        imageUrl: "https://example.com/photo.jpg",
        username: "John Doe",
      });
      expect(result).toEqual({
        id: "user-123",
        imageUrl: "https://example.com/photo.jpg",
        username: "John Doe",
      });
    });

    it("should generate username when display name is null", () => {
      const firebaseUser: UserCredential = {
        user: {
          uid: "user-456",
          photoURL: null,
          displayName: null,
        },
      } as UserCredential;

      (createUserEntity as jest.Mock).mockReturnValue({
        id: "user-456",
        imageUrl: null,
        username: "User-user-456",
      });

      const result = convertIntoNewUser(firebaseUser);

      expect(createUserEntity).toHaveBeenCalledWith({
        id: "user-456",
        imageUrl: null,
        username: "User-user-456",
      });
      expect(result.username).toBe("User-user-456");
    });

    it("should generate username when display name is empty string", () => {
      const firebaseUser: UserCredential = {
        user: {
          uid: "user-789",
          photoURL: "https://example.com/avatar.jpg",
          displayName: "",
        },
      } as UserCredential;

      (createUserEntity as jest.Mock).mockReturnValue({
        id: "user-789",
        imageUrl: "https://example.com/avatar.jpg",
        username: "User-user-789",
      });

      const result = convertIntoNewUser(firebaseUser);

      expect(createUserEntity).toHaveBeenCalledWith({
        id: "user-789",
        imageUrl: "https://example.com/avatar.jpg",
        username: "User-user-789",
      });
      expect(result.username).toBe("User-user-789");
    });

  });

  describe("register", () => {

    it("should register new user with email and password", async () => {
      const mockUserCredential: UserCredential = {
        user: {
          uid: "new-user-123",
          photoURL: null,
          displayName: "New User",
        },
      } as UserCredential;

      (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(mockUserCredential);
      (submitUser as jest.Mock).mockResolvedValue("new-user-123");
      (createUserEntity as jest.Mock).mockReturnValue({
        id: "new-user-123",
        imageUrl: null,
        username: "New User",
      });

      const result = await register("test@example.com", "password123");

      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith({}, "test@example.com", "password123");
      expect(submitUser).toHaveBeenCalledWith({
        id: "new-user-123",
        imageUrl: null,
        username: "New User",
      });
      expect(result).toBe("new-user-123");
    });

    it("should handle registration failure", async () => {
      const error = new Error("Email already in use");
      (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(error);

      await expect(register("existing@example.com", "password123"))
        .rejects.toThrow("Email already in use");

      expect(submitUser).not.toHaveBeenCalled();
    });

  });

  describe("login", () => {

    it("should login user with email and password", async () => {
      const mockUserCredential: UserCredential = {
        user: {
          uid: "user-123",
          photoURL: "https://example.com/photo.jpg",
          displayName: "John Doe",
        },
      } as UserCredential;

      (signInWithEmailAndPassword as jest.Mock).mockResolvedValue(mockUserCredential);

      const result = await login("test@example.com", "password123");

      expect(signInWithEmailAndPassword).toHaveBeenCalledWith({}, "test@example.com", "password123");
      expect(result).toBe("user-123");
    });

    it("should handle login failure with wrong password", async () => {
      const error = new Error("Wrong password");
      (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(error);

      await expect(login("test@example.com", "wrongpassword"))
        .rejects.toThrow("Wrong password");
    });

  });

  describe("resetPassword", () => {

    it("should send password reset email", async () => {
      (sendPasswordResetEmail as jest.Mock).mockResolvedValue(undefined);

      await resetPassword("test@example.com");

      expect(sendPasswordResetEmail).toHaveBeenCalledWith({}, "test@example.com");
    });

    it("should handle reset password for non-existent email", async () => {
      const error = new Error("User not found");
      (sendPasswordResetEmail as jest.Mock).mockRejectedValue(error);

      await expect(resetPassword("nonexistent@example.com"))
        .rejects.toThrow("User not found");
    });

  });

  describe("logout", () => {

    it("should logout current user", async () => {
      (signOut as jest.Mock).mockResolvedValue(undefined);

      await logout();

      expect(signOut).toHaveBeenCalledWith({});
    });

    it("should handle logout failure", async () => {
      const error = new Error("Logout failed");
      (signOut as jest.Mock).mockRejectedValue(error);

      await expect(logout()).rejects.toThrow("Logout failed");
    });

  });

  describe("loginWithGoogle", () => {

    it("should login existing user with Google", async () => {
      const mockUserCredential: UserCredential = {
        user: {
          uid: "google-user-123",
          photoURL: "https://lh3.googleusercontent.com/photo.jpg",
          displayName: "Google User",
        },
      } as UserCredential;

      (signInWithPopup as jest.Mock).mockResolvedValue(mockUserCredential);
      (getAdditionalUserInfo as jest.Mock).mockReturnValue({ isNewUser: false });

      const result = await loginWithGoogle();

      expect(signInWithPopup).toHaveBeenCalledWith({}, expect.any(Object));
      expect(getAdditionalUserInfo).toHaveBeenCalledWith(mockUserCredential);
      expect(submitUser).not.toHaveBeenCalled();
      expect(result).toBe("google-user-123");
    });

    it("should create new user when logging in with Google for first time", async () => {
      const mockUserCredential: UserCredential = {
        user: {
          uid: "new-google-user-456",
          photoURL: "https://lh3.googleusercontent.com/newphoto.jpg",
          displayName: "New Google User",
        },
      } as UserCredential;

      (signInWithPopup as jest.Mock).mockResolvedValue(mockUserCredential);
      (getAdditionalUserInfo as jest.Mock).mockReturnValue({ isNewUser: true });
      (submitUser as jest.Mock).mockResolvedValue("new-google-user-456");
      (createUserEntity as jest.Mock).mockReturnValue({
        id: "new-google-user-456",
        imageUrl: "https://lh3.googleusercontent.com/newphoto.jpg",
        username: "New Google User",
      });

      const result = await loginWithGoogle();

      expect(signInWithPopup).toHaveBeenCalledWith({}, expect.any(Object));
      expect(getAdditionalUserInfo).toHaveBeenCalledWith(mockUserCredential);
      expect(submitUser).toHaveBeenCalledWith({
        id: "new-google-user-456",
        imageUrl: "https://lh3.googleusercontent.com/newphoto.jpg",
        username: "New Google User",
      });
      expect(result).toBe("new-google-user-456");
    });

    it("should handle Google login popup closed by user", async () => {
      const error = new Error("Popup closed");
      (signInWithPopup as jest.Mock).mockRejectedValue(error);

      await expect(loginWithGoogle()).rejects.toThrow("Popup closed");
      expect(submitUser).not.toHaveBeenCalled();
    });

    it("should handle Google login with null additional user info", async () => {
      const mockUserCredential: UserCredential = {
        user: {
          uid: "google-user-789",
          photoURL: null,
          displayName: "Google User 789",
        },
      } as UserCredential;

      (signInWithPopup as jest.Mock).mockResolvedValue(mockUserCredential);
      (getAdditionalUserInfo as jest.Mock).mockReturnValue(null);

      const result = await loginWithGoogle();

      expect(submitUser).not.toHaveBeenCalled();
      expect(result).toBe("google-user-789");
    });

  });

});