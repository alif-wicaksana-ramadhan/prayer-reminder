import { ref, onMounted } from 'vue';

export function useGeolocation() {
    const coords = ref({ latitude: 0, longitude: 0 });
    const isSupported = ref(false);

    onMounted(() => {
        isSupported.value = 'navigator' in window && 'geolocation' in navigator

        if (isSupported.value) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    coords.value = position.coords;
                },
                (error) => {
                    console.error('Error getting geolocation:', error)
                    isSupported.value = false;
                }
            )
        }
    })

    return { coords, isSupported }
}