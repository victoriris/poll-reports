const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
// A `main` function so that you can use async/await

async function main() {

	await prisma.vote.deleteMany();
	await prisma.candidate.deleteMany();

	const candidateData = [
		{ name: "John Doe" },
		{ name: "Steve Jobs" },
		{ name: "Alan Turing" },
	];

	for (const candidate of candidateData) {
		const maxVotes = 10000;
		const minVotes = 1;
		const votesCount = Math.floor(Math.random() * maxVotes + minVotes);
		const votes = [...Array(votesCount).keys()].map( i => ({}));
		const item = await prisma.candidate.create({
			data: {
                name: candidate.name,
            }
		});
		await prisma.candidate.update({
			where: {
				id: item.id,
			},
			data: {
				votes: {
					create: votes,
				},
			},
		});
	}
}

main()
	.catch((e) => {
		throw e;
	})

	.finally(async () => {
		await prisma.$disconnect();
	});
