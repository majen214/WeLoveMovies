const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function list() {
  return knex("movies").select("*");
}

function showingList() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .distinct("m.*")
    .where({ "mt.is_showing": true });
}

function read(movie_id){
  return knex("movies")
    .select("*")
    .where({movie_id})
    .first()
}
function movieByTheaters(movieId) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("t.*", "mt.is_showing", "mt.movie_id")
    .where({ "mt.movie_id": movieId });
}

function listCritics () {
    return knex("critics")
    .select("*")
}

// const addCritic = mapProperties({
//   critic_id: "critic.critic_id", 
//   preferred_name: "preferred_name", 
//   surname: "surname", 
//   organization_name: "organization_namee", 
//   created_at: "created_at",
//   updated_at: "updated_at"
// })

function movieByReview(movieId) {
    return knex("reviews as r")
      .join("movies as m", "r.movie_id", "m.movie_id")
      .select("r.*")
      .where({ "r.movie_id": movieId });
  }

module.exports = {
  list,
  showingList,
  read,
  movieByTheaters,
  movieByReview,
  listCritics
};
