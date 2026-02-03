// Vehicle related types
export interface Vehicle {
  id: string;
  model: string;
  vin: string;
  licensePlate: string;
  status: 'active' | 'maintenance' | 'inactive';
  lastServiceDate: string;
  nextServiceDate: string;
  location: string;
}

// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'technician' | 'viewer';
  department: string;
  lastLogin: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
  timestamp: string;
}

// Pagination types
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form types
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface VehicleFormData {
  model: string;
  vin: string;
  licensePlate: string;
  status: Vehicle['status'];
}
