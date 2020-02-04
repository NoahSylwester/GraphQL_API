const { GraphQLServer } = require('graphql-yoga');

let links = [{
    id: `link-0`,
    url: `www.howtographql.com`,
    description: `Fullstack tutorial for GraphQL`
}]

let idCount = links.length;

const resolvers = {
    Query: {
        info: () => `here's your info`,
        feed: () => links,
        link: (parent, args) => {
            let link = links.filter((item) => item.id === args.id);
            return link;
        }
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            links.push(link);
            return link;
        },
        updateLink: (parent, args) => {
            let linkIndex;
            links.forEach((item, i) => item.id === args.id ? linkIndex = i : false);
            links[linkIndex].url = args.url;
            links[linkIndex].description = args.description;
            console.log(links);
            return links[linkIndex];
        },
        deleteLink: (parent, args) => {
            let linkIndex;
            links.forEach((item, i) => item.id === args.id ? linkIndex = i : false);
            let deleted = linkIndex !== undefined ? links.splice(linkIndex, 1) : [null];
            console.log(links);
            console.log(deleted);
            return deleted[0];
        }
    },
    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
      }
};

const server = new GraphQLServer({
    typeDefs: `./src/schema.graphql`,
    resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))