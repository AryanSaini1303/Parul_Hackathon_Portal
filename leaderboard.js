// Import packages
const xlsx = require("xlsx");
const { PrismaClient } = require("@prisma/client");

// Initialize Prisma Client
const prisma = new PrismaClient();

// Function to read Excel and push data to the database
async function pushDataFromExcel(filePath) {
  try {
    // Read the Excel file
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    // Iterate over the data and push it to the database
    let i=0;
    for (const item of jsonData) {
      i++;
      console.log(i);
      const { name, quiz, tasks, score } = item;
      
      // Make sure score is a number and exists
      if (!name || !score || isNaN(score)) {
        console.log("Invalid data:", item);
        continue;
      }

      // Create a new record in the Leaderboard table
      await prisma.leaderboard.create({
        data: {
          rank:1,
          game:JSON.stringify(1),
          name: name,
          quiz: JSON.stringify(quiz) || null, // Optional field
          tasks: JSON.stringify(tasks) || null, // Optional field
          score: parseInt(score, 10),
        },
      });
    }

    console.log("Data successfully pushed to the database!");
  } catch (error) {
    console.error("Error pushing data to the database:", error);
  } finally {
    // Disconnect Prisma client
    await prisma.$disconnect();
  }
}

// Run the function with the file path
pushDataFromExcel("data.csv");
