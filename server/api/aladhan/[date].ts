export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    const query = getQuery(event);
    const date = getRouterParam(event, 'date');

    const res = await $fetch(`${config.aladhanHost}/timings/${date}?latitude=${query.latitude}&longitude=${query.longitude}&method=20`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    console.log(res)

    return res;
})