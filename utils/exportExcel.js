const ExcelJS = require("exceljs");

async function exportAdmissions(data, res) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Admissions");

  // Columns (IMPORTANT)
  sheet.columns = [
    { header: "S.No", key: "sno", width: 6 },
    { header: "Student Name", key: "studentName", width: 20 },
    { header: "Class", key: "classSeeking", width: 10 },
    { header: "DOB", key: "dob", width: 15 },
    { header: "Parent Name", key: "parentName", width: 20 },
    { header: "Phone", key: "phone", width: 15 },
    { header: "Email", key: "email", width: 25 },
    { header: "School", key: "presentSchool", width: 20 },
    { header: "Message", key: "message", width: 30 },
    { header: "Submitted At", key: "submittedAt", width: 25 }
  ];

  // Add rows
  data.forEach((item, index) => {
    sheet.addRow({
      sno: index + 1,
      studentName: item.studentName,
      classSeeking: item.classSeeking,
      dob: item.dob,
      parentName: item.parentName,
      phone: item.phone,
      email: item.email || "-",
      presentSchool: item.presentSchool || "-",
      message: item.message || "-",
      submittedAt: new Date(item.submittedAt).toLocaleString()
    });
  });

  // Style header (optional but good)
  sheet.getRow(1).font = { bold: true };

  // Response headers
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  res.setHeader(
    "Content-Disposition",
    "attachment; filename=admissions.xlsx"
  );

  await workbook.xlsx.write(res);
  res.end();
}

module.exports = exportAdmissions;