export const load = async (loadEvent) => {
	const { fetch, params, url, route } = loadEvent;

	console.log({ params, url, route });

	const response = await fetch('https://jsonplaceholder.typicode.com/posts');
	const data = await response.json();
	console.log(data);
};
