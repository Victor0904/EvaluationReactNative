export interface Obstacle {
    id: string;
    title: string;
    description: string;
    latitude?: number;
    longitude?: number;
    createdAt: Date;
}

export interface Contact {
    id: string;
    name: string;
    phone: string;
    role: string;
}

export interface Location {
    latitude: number;
    longitude: number;
}
