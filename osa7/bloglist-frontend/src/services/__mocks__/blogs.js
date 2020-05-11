const blogs = [
  {
  likes: 3400,
  title: "Clarifying some previous events",
  author: "Destiny",
  url: "https://www.reddit.com/r/Destiny/comments/dmjb18/clarifying_some_previous_events/",
  user: {
  username: "mluukkai",
  name: "Matti Luukkainen",
  id: "5e0ba26dcfa5f02da76730a6"
  },
  id: "5e0dde7eeb416428e30b7c4b"
  },
  {
  likes: 3,
  title: "Nuudi's 3rd blog",
  author: "Nuudi",
  url: "aaaaaaaa",
  user: {
  username: "duudi",
  name: "Nuutti",
  id: "5e1349a73edc510ff5e2479a"
  },
  id: "5e135b1300389f2d47eb3c9b"
  },
  {
  likes: 0,
  title: "Nuudi's 4th blog",
  author: "Nuudi",
  url: "aaa",
  user: {
  username: "duudi",
  name: "Nuutti",
  id: "5e1349a73edc510ff5e2479a"
  },
  id: "5e135b9100389f2d47eb3c9c"
  },
  {
  likes: 0,
  title: "Nuudi's 5th blog",
  author: "Nuudi",
  url: "aaa",
  user: {
  username: "duudi",
  name: "Nuutti",
  id: "5e1349a73edc510ff5e2479a"
  },
  id: "5e135bd900389f2d47eb3c9d"
  },
  {
  likes: 2,
  title: "Mluukkai's 1st blog",
  author: "Mluukkai",
  url: "mmmmmmmm",
  user: {
  username: "mluukkai",
  name: "Matti Luukkainen",
  id: "5e0ba26dcfa5f02da76730a6"
  },
  id: "5e15c25b8844cd0f4c5c9331"
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }