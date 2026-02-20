interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

class AuthService {
  private static readonly STORAGE_KEY = 'globalhelper_users';
  private static readonly CURRENT_USER_KEY = 'globalhelper_current_user';

  // Get all users from localStorage
  private static getUsers(): User[] {
    const users = localStorage.getItem(this.STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  }

  // Save users to localStorage
  private static saveUsers(users: User[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }

  // Register a new user
  static async register(credentials: RegisterCredentials): Promise<{ success: boolean; message: string }> {
    try {
      // Validate input
      if (!credentials.name || !credentials.email || !credentials.password) {
        return { success: false, message: 'All fields are required' };
      }

      if (credentials.password !== credentials.confirmPassword) {
        return { success: false, message: 'Passwords do not match' };
      }

      if (credentials.password.length < 6) {
        return { success: false, message: 'Password must be at least 6 characters' };
      }

      // Check if user already exists
      const users = this.getUsers();
      const existingUser = users.find(user => user.email === credentials.email);
      
      if (existingUser) {
        return { success: false, message: 'User with this email already exists' };
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        name: credentials.name,
        email: credentials.email,
        createdAt: new Date().toISOString()
      };

      // Store user (in real app, you'd hash the password)
      users.push(newUser);
      this.saveUsers(users);

      // Store current user
      this.setCurrentUser(newUser);

      return { success: true, message: 'Account created successfully!' };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Registration failed. Please try again.' };
    }
  }

  // Login user
  static async login(credentials: LoginCredentials): Promise<{ success: boolean; message: string }> {
    try {
      if (!credentials.email || !credentials.password) {
        return { success: false, message: 'Email and password are required' };
      }

      // For demo purposes, we'll accept any password for existing users
      // In real app, you'd verify the hashed password
      const users = this.getUsers();
      const user = users.find(u => u.email === credentials.email);

      if (!user) {
        return { success: false, message: 'No account found with this email' };
      }

      // Store current user
      this.setCurrentUser(user);

      return { success: true, message: 'Login successful!' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Login failed. Please try again.' };
    }
  }

  // Logout current user
  static logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  // Get current user
  static getCurrentUser(): User | null {
    const user = localStorage.getItem(this.CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  // Set current user
  private static setCurrentUser(user: User): void {
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
  }

  // Check if user is logged in
  static isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  // Social login (mock implementation)
  static async socialLogin(provider: 'google' | 'facebook'): Promise<{ success: boolean; message: string }> {
    try {
      // Simulate social login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: `social_${Date.now()}`,
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        email: `user@${provider}.com`,
        createdAt: new Date().toISOString()
      };

      this.setCurrentUser(mockUser);

      return { success: true, message: `Successfully logged in with ${provider}!` };
    } catch (error) {
      console.error('Social login error:', error);
      return { success: false, message: `${provider} login failed. Please try again.` };
    }
  }
}

export default AuthService;
