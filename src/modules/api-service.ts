/// <reference types="google.maps" />

import Axios from 'axios';

const API_URL = import.meta.env['VITE_API_URL'] as string;

const axios = Axios.create({
    baseURL: API_URL
});

class Service {

    public async getByCity(name: string): Promise<road.domain.AccidentProjection[]> {
        const { data: markers } = await axios
            .get('/accidents/city', {
                params: { name }
            });

        return markers;
    }

    public async getNearBy(lng: number, lat: number, range: number): Promise<road.domain.AccidentProjection[]> {
        const { data: markers } = await axios
            .get('/accidents/near', {
                params: { lng, lat, range }
            });

        return markers;
    }

}

export default Service;