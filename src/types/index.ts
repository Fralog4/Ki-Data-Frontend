export interface Character {
  id: number;
  name: string;
  race: string;
  gender: string;
  birthDate: string;
  skillSet: string[];
  image?: string;
}

export interface CreateCharacterRequest {
  name: string;
  race: string;
  gender: string;
  birthDate: string;
  skillSet: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'dende';
  timestamp: Date;
}