import axios from 'axios'
import { useQuery } from '@tanstack/vue-query'
import { ref } from 'vue'

const api = axios.create({
  baseURL: 'https://api.open-meteo.com/v1',
})

// API methods
export const currentTemperature = (lat,lng,timezone) => {
    console.log('Fetching current temperature for:', lat, lng, timezone);
    return api.get('/forecast', {
        params: {
            latitude: lat,
            longitude: lng,
            timezone: timezone,
            current: 'temperature_2m'
        }
    }).then(res => res.data)
}
export const hourlyForecast = (lat, lng, timezone) => {
    return api.get('/forecast', {
        params: {
            latitude: lat,
            longitude: lng,
            timezone: timezone,
            hourly: 'temperature_2m'
        }
    }).then(res => res.data)
}
export const dailyForecast = (lat, lng, timezone) => {
    return api.get('/forecast', {
        params: {
            latitude: lat,
            longitude: lng,
            timezone: timezone,
            daily: 'temperature_2m_max,temperature_2m_min'
        }
    }).then(res => res.data)
}

export const queryRequest = ref({
  latitude: 49.282,
  longitude: -123.1207,
  timezone: 'America/Los_Angeles',
})

export const temperatureQuery = (queryRequest) => {
    const result = ref('')
    const query = useQuery({
        queryKey: ['temperature', queryRequest.value.latitude, queryRequest.value.longitude, queryRequest.value.timezone],
        queryFn: (context) => currentTemperature(queryRequest.value.latitude, queryRequest.value.longitude, queryRequest.value.timezone),
        select: (data) => {
            console.log('Temperature data:', data)
            result.value = data.current.temperature_2m + '°C'
            return data
        },
        enabled: true, // automatically fetch on queryKey change
        refetchOnWindowFocus: true, // automatically refetch when the window is focused
        retry: 1, // retry once on failure
    })
    return result
}
