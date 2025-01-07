const { join } = require("node:path");
const { writeFile } = require("node:fs/promises");

const TOTAL_ROUTES_BY_ID = 10;
const API_BASE_URL = "https://pokeapi.co/api/v2/pokemon";

const getPokemonRoutesByName = async (offset) => {
  const params = new URLSearchParams({
    limit: 20,
    offset: 20 * offset,
  });

  const resp = await fetch(`${API_BASE_URL}?${params}`);
  if (!resp.ok) console.log(`Failed to load page ${offset}`);

  const pokemon = await resp.json();
  return pokemon.results.map(({ name }) => `/pokemon/by/${name}`);
};

const generateRoutes = async () => {
  const path = join(".", "routes.txt");
  const pageRoutes = Array.from(
    { length: TOTAL_ROUTES_BY_ID },
    (_, index) => `/pokemon/${index + 1}`
  ).join("\n");

  const pokemonRoutes = (
    await Promise.all(
      Array.from({ length: 5 }, async (_, index) => {
        return await getPokemonRoutesByName(index);
      })
    )
  )
    .flat()
    .join("\n");

  await writeFile(path, pageRoutes.concat("\n", pokemonRoutes));
  console.log("Routes generated successfully");
};

generateRoutes();
