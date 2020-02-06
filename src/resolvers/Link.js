function postedBy(parent, args, context) {
    return context.prisma.link({ id: parent.id }).postedBy()
}

function votes(parents, args, context) {
    return context.prisma.link({ id: parent.id }).votes()
}

module.exports = {
    postedBy,
    votes,
}