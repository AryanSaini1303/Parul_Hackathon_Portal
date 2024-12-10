const { PrismaClient } = require("@prisma/client"); // Import PrismaClient
const ExcelJS = require("exceljs"); // Import ExcelJS

const prisma = new PrismaClient(); // Instantiate PrismaClient

(async function () {
  try {
    // Fetch all teachers from the database
    const teachers = await prisma.user.findMany();

    // Create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Teachers");

    // Define header row
    worksheet.columns = [
      { header: "id", key: "id", width: 10 },
      { header: "name", key: "name", width: 20 },
      { header: "referralCode", key: "referralCode", width: 20 },
      { header: "email", key: "email", width: 30 },
      { header: "phoneNumber", key: "phoneNumber", width: 15 },
      { header: "githubProfile", key: "githubProfile", width: 20 },
      { header: "linkedinProfile", key: "linkedinProfile", width: 25 },
      { header: "teamId", key: "teamId", width: 20 },
      { header: "purpose", key: "purpose", width: 30 },
      { header: "University", key: "University", width: 50 },
    ];

    // Populate rows with teacher data
    teachers.forEach((teacher) => {
      worksheet.addRow({
        id: teacher.id,
        name: teacher.name,
        referralCode: teacher.referralCode,
        email: teacher.email,
        phoneNumber: teacher.phoneNumber,
        githubProfile: teacher.githubProfile,
        linkedinProfile: teacher.linkedinProfile,
        teamId: teacher.teamId,
        purpose: teacher.purpose,
        University: teacher.University,
      });
    });

    // Save Excel file
    await workbook.xlsx.writeFile("teachers.xlsx");
    console.log("Excel file has been saved as teachers.xlsx!");
  } catch (error) {
    console.error("Error fetching teachers or saving to Excel:", error);
  } finally {
    // Ensure Prisma client is properly closed
    await prisma.$disconnect();
  }
})();
