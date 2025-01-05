export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    const query = getQuery(event)

    const res = await $fetch(`${config.hereHost}/geocode?q=${query.location_query}&apiKey=${config.hereApiKey}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    console.log(res)

    return res;
})