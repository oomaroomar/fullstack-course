const {
  ApolloServer,
  UserInputError,
  gql,
  AuthenticationError,
  PubSub,
} = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const JWT_SECRET = 'SECRET_KEY'
const pubsub = new PubSub()

console.log('connecting to ', process.env.MONGODB_URI)

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected to MongoDB'))
  .catch(err => console.log(err.message))

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Subscription {
    bookAdded: Book!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    bookCount: Int!
    born: Int
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      genres: [String]!
      author: String!
    ): Book

    editAuthor(name: String!, born: Int!): Author

    login(username: String!, password: String!): Token

    createUser(username: String!, favoriteGenre: String!): User
  }
`

const resolvers = {
  Author: {
    name: root => root.name,
    bookCount: async root => root.books.length,
  },

  Mutation: {
    addBook: async (root, args, context) => {
      console.log('args: ', args)
      console.log('context.currentUser: ', context.currentUser)
      if (!context.currentUser)
        throw new AuthenticationError('not authenticated')
      let newAuth = await Author.findOne({
        name: args.author,
      })

      const author = newAuth
        ? newAuth
        : new Author({
            name: args.author,
          })

      const book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author,
      })

      try {
        const savedBook = await book.save()
        author.books.push(savedBook.id)
        await author.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        })
      }

      console.log('created book: ', book)

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },

    editAuthor: async (root, args, context) => {
      console.log(context.currentUser)
      if (!context.currentUser)
        throw new AuthenticationError('not authenticated')
      const author = await Author.findOne({ name: args.name })
      if (!author) return null

      author.born = args.born
      try {
        author.save()
      } catch (err) {
        throw UserInputError(err.message, {
          invalidArgs: args,
        })
      }
      return author
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new UserInputError('Wrong credentials')
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },

    createUser: (root, args) => {
      const user = new User({ ...args })
      console.log('created user', user)
      return user.save().catch(err => {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        })
      })
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },

  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let returnable = await Book.find({}).populate('author')
      if (args.author) {
        returnable = returnable.filter(book => args.author === book.author.name)
      }

      if (args.genre) {
        returnable = returnable.filter(book =>
          book.genres.some(genre => genre === args.genre)
        )
      }

      return returnable
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      console.log(context)
      return context.currentUser
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const token = auth.substring(7)
      const decodedToken = jwt.verify(token, JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
