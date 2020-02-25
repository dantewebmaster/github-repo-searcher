import axios from 'axios'

const githubApi = axios.create({
  baseURL: 'https://api.github.com/'
});

export const searchRepos = async (topic, page = 1) => {
  try {
    const response = await githubApi
      .get(`/search/repositories?q=topic:${topic}&order=desc&page=${page}&per_page=20`)

    return response
  } catch (error) {
    return error
  }
}
